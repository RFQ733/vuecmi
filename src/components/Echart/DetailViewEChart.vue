<template>
    <el-row class="chart-container">
        <el-col :span="24">
            <div ref="chart" style="width: 100%; height: 600px;"></div>
        </el-col>
    </el-row>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'DetailViewEChart',
    props: {
        nodeData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initChart();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        if (this.chart) {
            echarts.dispose(this.chart);
        }
    },
    watch: {
        nodeData: {
            handler() {
                this.$nextTick(() => this.initChart());
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        initChart() {
            try {
                if (this.chart && !this.chart.isDisposed()) {
                    this.chart.dispose();
                }

                if (!this.$refs.chart) return;

                this.chart = echarts.init(this.$refs.chart);
                
                // 生成节点数据
                const baseNodes = [
                    { name: this.nodeData.circrna_id, category: 'CircRNA' },
                    { name: this.nodeData.mirna_id, category: 'MiRNA' },
                    { name: this.nodeData.gene, category: 'Gene' },
                    { name: this.nodeData.disease, category: 'Disease' }
                ].filter(node => node.name && node.name.trim() !== '');

                // 获取实际存在的分类
                const categories = [...new Set(baseNodes.map(n => n.category))];
                
                // 生成连接数据
                const links = [
                    { source: this.nodeData.circrna_id, target: this.nodeData.mirna_id },
                    { source: this.nodeData.mirna_id, target: this.nodeData.gene },
                    { source: this.nodeData.gene, target: this.nodeData.disease }
                ].filter(link => link.source && link.target);

                const option = {
                    title: {
                        text: this.nodeData.num || 'Network Topology',
                        left: 'center'
                    },
                    tooltip: {},
                    legend: {
                        data: categories,
                        orient: 'vertical',
                        right: 10,
                        top: 20
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        categories: categories.map(name => ({ name })),
                        data: baseNodes.map(node => ({
                            ...node,
                            symbolSize: 28,
                            itemStyle: {
                                color: this.getNodeColor(node.category)
                            },
                            label: {
                                show: false,
                                position: 'right',
                                formatter: name => name.length > 15 ? `${name.substring(0, 12)}...` : name
                            }
                        })),
                        links: links,
                        lineStyle: {
                            color: '#aaa',
                            curveness: 0.2
                        },
                        force: {
                            repulsion: 150,
                            edgeLength: 100,
                            gravity: 0.3
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    }],
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                pixelRatio: 2
                            }
                        }
                    }
                };

                this.chart.setOption(option);
                this.chart.on('click', this.handleNodeClick);

            } catch (error) {
                console.error('Chart Error:', error);
            }
        },

        getNodeColor(category) {
            const colors = {
                'CircRNA': '#5470c6',
                'MiRNA': '#91cc75',
                'Gene': '#fac858',
                'Disease': '#ee6666'
            };
            return colors[category] || '#73c0de';
        },

        handleNodeClick(params) {
            if (params.dataType === 'node') {
                this.$emit('node-click', params.data);
            }
        },

        handleResize() {
            this.chart?.resize();
        }
    }
};
</script>

<style scoped>
.chart-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    min-height: 600px;
}

:deep(.echarts) {
    cursor: pointer;
}
</style>