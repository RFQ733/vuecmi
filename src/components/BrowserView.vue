<template>
    <div class="browser-view">
        <top-nav-bar :cur-id="5"/>
        <el-container>
            <el-aside width="200px">

                <el-tree
                    :data="treeData"
                    :props="{ label: 'label', children: 'children' }"
                    @node-click="handleNodeClick"
                />
                
            </el-aside>
            <el-main v-if=" !tableData ">
                    <el-row>
                        <el-col :span="12">
                            <!-- 写一些文字 -->
                            <h2>数据概况</h2>
                            <p>本数据库目前共收录了 10 个 circRNA，20 个 miRNA，5 种疾病，15 个实验。</p>
                            <p>其中，人类数据有 15 个 circRNA，25 个 miRNA，10 种疾病，20 个实验。</p>
                            <p>小鼠有多少多少多少</p>
                        </el-col>
                        <el-col :span="12">
                            <div ref="chart" style="width: 100%; height: 400px;"></div>
                        </el-col>    
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <!-- 写一些文字 -->
                            <h3>second data</h3>
                        </el-col>
                        <el-col :span="12">
                            <div ref="chart2" style="width: 100%; height: 400px;"></div>
                        </el-col>    
                    </el-row>

            </el-main>
            <el-main v-if="tableData">
                <table-view-com :data-show-table="tableData" />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import TopNavBar from './TopNavBar.vue';
import TableViewCom from './Echart/TableViewCom.vue';
import {  ElContainer, ElAside, ElMain } from 'element-plus';
import axios from 'axios';

export default {
    components: {
        TopNavBar,
        TableViewCom,
        ElContainer,
        ElAside,
        ElMain
    },
    data() {
        return {
            treeData: [],
            tableData: null
        };
    },
    methods: {
        async handleNodeClick(node) {
            // const response = await fetch(`/api/data/${node.id}`);
            // const response = await fetch(`/api/get_table.php?mirna_key=${node.label}`);
            
            console.log("node.label is",node.label)
            
            const response = await axios.get("/api/get_table.php", {
                        params: {
                            mirna_key: node.id
                        }
                        })
                
            this.tableData = response.data;
        },
        async fetchEchartsData() {
                try {
                    const response = await axios.get('/data/home_bar_table.json')
                    const echartsData = response.data
                    const myChart = this.$echarts.init(this.$refs.chart)
                    myChart.setOption(echartsData)
                    const myChart2 = this.$echarts.init(this.$refs.chart2)
                    const res2 = await axios.get('/data/pie_table_miRNA.json')
                    const echartsData2 = res2.data
                    myChart2.setOption(echartsData2)
                } catch (error) {
                    console.error('Error fetching echarts data:', error)
                }
        },
    },
    mounted() {
        this.fetchEchartsData();
        // Fetch initial tree data
        fetch('/data/treeview2.json')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched tree data:', data);
                this.treeData = data;
                // 检查 treeData 的结构
                if (Array.isArray(this.treeData)) {
                    this.treeData.forEach(node => {
                        if (!Array.isArray(node.children)) {
                            node.children = [];
                        }
                    });
                }
            });
    }
};
</script>

<style scoped>
.browser-view {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>