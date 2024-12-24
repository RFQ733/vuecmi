<template>
    <el-row>
        <el-col :span="24">
            <div ref="chart" style="width: 100%; height: 500px;"></div>
        </el-col>
    </el-row>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'VisCMD',
    props: {
        data: {
            type: Array,
            required: true,
        },
        bigName: {
            type: String,
            default: 'CircRNA-MiRNA-Disease Network',
        },
    },
    mounted() {
        this.initChart();
    },
    updated() {
        this.initChart();
    },
    methods: {
        initChart() {
            const chart = echarts.init(this.$refs.chart);
            var nodes = [];
            for (let i = 0; i < this.data.length; i++) {
                if (!nodes.find(node => node.name == this.data[i].mirna_id)) {
                    nodes.push({ name: this.data[i].mirna_id, category: 'MiRNA' });
                }
                if (this.data[i].disease != null && !nodes.find(node => node.name == this.data[i].disease)) {
                    nodes.push({ name: this.data[i].disease, category: 'Disease' });
                }
                if (!nodes.find(node => node.name == this.data[i].circrna_id)) {
                    nodes.push({ name: this.data[i].circrna_id, category: 'CircRNA' });
                }
            }

            var links = [];
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].mirna_id && this.data[i].circrna_id) {
                    links.push({ source: this.data[i].mirna_id, target: this.data[i].circrna_id });
                }
                if (this.data[i].mirna_id && this.data[i].disease) {
                    links.push({ source: this.data[i].mirna_id, target: this.data[i].disease });
                }
            }

            const option = {
                title: {
                    text: this.bigName,
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: nodes,
                    links: links.filter(link => link.target),
                    categories: [{ name: 'MiRNA' }, { name: 'CircRNA' }, { name: 'Disease' }],
                    roam: true, // 允许缩放和平移
                    label: {
                        show: true,
                        position: 'right'
                    },
                    force: {
                        repulsion: 1000
                    }
                }],
                toolbox: {
                    feature: {
                        "saveAsImage": {}
                    }
                }
            };
            chart.setOption(option);
        },
    },
};
</script>

<style scoped></style>