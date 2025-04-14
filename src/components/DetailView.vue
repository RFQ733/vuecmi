<template>
    <el-header>
        <TopNavBar :curId="-1" />
    </el-header>
    <el-container class="layout-container">
        <el-row class="main-row" :gutter="20">
            <!-- 左侧内容区域 (18列) -->
            <el-col :span="18">
                <el-card class="box-card enhanced-card">
                <template #header>
                    <div class="card-header">
                        <h2 class="detail-title">
                            <i class="el-icon-document"></i>
                            Detail Information
                        </h2>
                    </div>
                </template>
                <div class="grid-container">
                    <div class="grid-item">
                        <label>Num</label>
                        <div class="value">{{ data.num }}</div>
                    </div>
                    <!-- /detail/MiRNA?mirna_id=miR-214 -->

                    <div class="grid-item clickable" @click="getGoCircBase">
                        <label>Circrna ID</label>
                        <div class="value">{{ data.circrna_id }}</div>
                    </div>
                    <div class="grid-item clickable" @click="getGoMirBase">
                        <label>Mirna ID</label>
                        <div class="value">{{ data.mirna_id }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Organism</label>
                        <div class="value">{{ data.organism }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Disease</label>
                        <div class="value">{{ data.disease }}</div>
                    </div>
                    <div class="grid-item">
                        <label>mRNA</label>
                        <div class="value">{{ data.mrna }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Gene</label>
                        <div class="value">{{ data.gene }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Virus Name</label>
                        <div class="value">{{ data.virus_name }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Tissue Cells</label>
                        <div class="value">{{ data.tissue_cells }}</div>
                    </div>
                    <div class="grid-item">
                        <label>Experiment</label>
                        <div class="value">{{ data.experiment }}</div>
                    </div>
                    <div class="grid-item">
                        <label>PMID</label>
                        <div class="pmid-container">
                            <div class="value">{{ data.pmid }}</div>
                            <el-button type="primary" size="small" @click="getclipboard(data.pmid)">Copy</el-button>
                        </div>
                    </div>
                    <div class="grid-item full-width">
                        <label>Description</label>
                        <div class="value description">{{ data.description }}</div>
                    </div>
                </div>

                <el-divider class="custom-divider"></el-divider>
                
            </el-card>
            </el-col>

            <!-- 右侧ECharts区域 (6列) -->
            <el-col :span="6">
                
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
// import VChart from 'vue-echarts';
import TopNavBar from './TopNavBar.vue';
import axios from 'axios';

use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);

export default {
    components: {
        TopNavBar,
    },
    data() {
        return {
            data: {},
            chartOption: null,
            hasChartData: false
        };
    },
    
    methods: {
        fetchData(num) {
            console.log('Fetching data for num:', num);
            axios.get(`/api/get_by_num.php?num=${num}`)
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        // 初始化图表
        initChart() {
            // 示例数据，需要根据实际数据结构调整
            const nodes = [
                { name: this.data.circrna_id, category: 0 },
                { name: this.data.mirna_id, category: 1 },
                { name: this.data.gene, category: 2 },
                { name: this.data.mrna, category: 3 }
            ];
            
            const links = [
                { source: this.data.circrna_id, target: this.data.mirna_id },
                { source: this.data.mirna_id, target: this.data.gene },
                { source: this.data.gene, target: this.data.mrna }
            ];

            this.chartOption = {
                title: {
                    text: '分子关系网络',
                    left: 'center'
                },
                tooltip: {},
                legend: {
                    data: ['CircRNA', 'MiRNA', 'Gene', 'mRNA'],
                    bottom: 0
                },
                series: [{
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: nodes.map(node => ({
                        ...node,
                        symbolSize: 20,
                        itemStyle: {
                            color: this.getNodeColor(node.category)
                        }
                    })),
                    links: links.map(link => ({
                        ...link,
                        lineStyle: {
                            color: '#aaa',
                            curveness: 0.2
                        }
                    })),
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 2
                        }
                    }
                }]
            };
            this.hasChartData = nodes.length > 0;
        },
        getNodeColor(category) {
            const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];
            return colors[category] || '#73c0de';
        }
    },
    watch: {
        data: {
            handler() {
                this.initChart();
            },
            deep: true
        }
    }
};
</script>

<style scoped>
/* 新增样式 */
.main-row {
    width: 100%;
    margin: 0 !important;
}

.echart-card {
    height: 700px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.chart-container {
    height: 600px;
    position: relative;
}

.chart-title {
    margin: 0;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 突出可点击元素 */
.clickable {
    position: relative;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.clickable:hover {
    border-left-color: #409eff;
    transform: translateX(5px);
    background: linear-gradient(to right, #f5f7fa 50%, #fff);
}

.clickable::after {
    content: "➤";
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #409eff;
    opacity: 0;
    transition: opacity 0.3s;
}

.clickable:hover::after {
    opacity: 1;
}

/* 调整网格布局 */
.grid-container {
    grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 1600px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>