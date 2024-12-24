<template>
    <el-row>
        <el-col :span="12">
        <div ref="chart1" style="width: 100%; height: 500px;"></div>
    </el-col>
    <el-col :span="12">
        <div ref="chart2" style="width: 100%; height: 500px;"></div>
    </el-col>
    </el-row>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: 'SearchShowVisualChart',
    props: {
        data: {
            type: Array,
            required: true,
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
            this.initChart1();
            this.initChart2();
            console.log('data Search V SHOW :', this.data);
        },
        initChart1() {
            const chart = echarts.init(this.$refs.chart1);
            // from data add nodes
            var nodes = [] ;
            for ( let i = 0 ; i < this.data.length ; i++ ){
                if( !nodes.find(node => node.name == this.data[i].mirna_id) ){
                    nodes.push({ name: this.data[i].mirna_id, category: 'MiRNA' });
                }
                if( !nodes.find(node => node.name == this.data[i].circrna_id) ){
                    nodes.push({ name: this.data[i].circrna_id, category: 'CircRNA' });
                }
            }
            var links = [];
            // for each nodes add a link 
            for ( let i = 0 ; i < nodes.length ; i++ ){
                for ( let j = 0 ; j < nodes.length ; j++ ){
                    if ( i != j ){
                        if (nodes[i].category !== nodes[j].category)
                        links.push({ source: nodes[i].name, target: nodes[j].name });
                    }
                }
            }
            const option = {
                title: {
                    text: 'CircRNA-MiRNA Network',
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: nodes,
                    links: links.filter(link => link.target),
                    categories: [{ name: 'MiRNA' }, { name: 'CircRNA' }],
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
        initChart2() {
            const chart = echarts.init(this.$refs.chart2);
            var nodes = [] ;
            for ( let i =0 ; i < this.data.length; i ++ ){
                
                if( !nodes.find(node => node.name == this.data[i].mirna_id) ){
                    nodes.push({ name: this.data[i].mirna_id, category: 'MiRNA' });
                }
                if(this.data[i].disease!=null && !nodes.find(node => node.name == this.data[i].disease) ){
                    nodes.push({ name: this.data[i].disease, category: 'Disease' });
                }
            }
            //
            
            const links = this.data
                .filter(item => item.disease != null)
                .map(item => ({ source: item.mirna_id, target: item.disease }));

            const option = {
                title: {
                    text: 'miRNA-Disease'
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    data: nodes,
                    links: links.filter(link => link.target),
                    categories: [{ name: 'MiRNA' }, { name: 'Disease' }],
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