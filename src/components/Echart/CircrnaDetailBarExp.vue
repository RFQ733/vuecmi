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
    name: 'CircrnaDetailChart',
    props: {
        data: {
            type: Array,
            required: true,
        },
        bigName: {
            type: String,
            default: 'Experiment Type Distribution',
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
            
            // 统计实验类型
            const experimentCounts = {};
            this.data.forEach(item => {
                const experiments = item.experiment
                    ? item.experiment.split(/,\s*(?:and\s*)?/).map(e => e.trim())
                    : [];
                experiments.forEach(exp => {
                    experimentCounts[exp] = (experimentCounts[exp] || 0) + 1;
                });
            });

            const chartData = Object.entries(experimentCounts)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value);

            const option = {
                title: {
                    text: this.bigName,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                xAxis: {
                    type: 'category',
                    data: chartData.map(item => item.name),
                    axisLabel: {
                        rotate: 45,
                        interval: 0
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    type: 'bar',
                    data: chartData,
                    itemStyle: {
                        color: '#5470c6'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    }
                }],
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    bottom: 100
                }
            };

            chart.setOption(option);
        },
    },
};
</script>

<style scoped></style>