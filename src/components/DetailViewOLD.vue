<template>
    <el-header>
        <TopNavBar :curId="-1" />
    </el-header>
    <el-container class="layout-container">
        
        <el-row class="vertical-layout">
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
                        <!-- style add the font with underline and blue  -->
                        <div class="value"
                            style="font-weight: bold; color: blue; text-decoration: underline;">{{ data.circrna_id }}</div>
                        
                    </div>
                    <div class="grid-item clickable" @click="getGoMirBase">
                        <label>Mirna ID</label>
                        <div class="value"
                            style="font-weight: bold; color: blue; text-decoration: underline;">
                                {{ data.mirna_id }}</div>
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
            <el-col :span="6">
                <el-card class="box-card enhanced-card">
                    <template #header>
                        <div class="card-header">
                            <h2 class="detail-title">
                                <i class="el-icon-s-data"></i>
                                Data Visualization
                            </h2>
                        </div>
                    </template>
                
                <DetailViewEChart 
                :v-if="data.circrna_id"
                :nodeData="data" />
            </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import TopNavBar from './TopNavBar.vue';
import axios from 'axios';
import DetailViewEChart from './Echart/DetailViewEChart.vue';
export default {
    components: {
        TopNavBar,
        DetailViewEChart
    },
    data() {
        return {
            data: {}
        };
    },
    created() {
        const num = this.$route.query.num;
        this.fetchData(num);
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
        getGoPM() {
            console.log('Go to PubMed:', this.data.pmid);
        },
        getGoCircBase() {
            // window.open("https://www.ncbi.nlm.nih.gov/geo/");
            console.log('Go to CircBank:', this.data.circrna_id);
            // /detail/MiRNA?mirna_id=miR-214
            // /detail/circRNA?circrna_id=circ-ITCH
            window.open(`/detail/circRNA?circrna_id=${this.data.circrna_id}`);
        },
        getclipboard(text) {
            navigator.clipboard.writeText(text);
        },
        getGoMirBase() {
            // window.open('https://www.mirbase.org');
            console.log('Go to MirBase:', this.data.mirna_id);
            window.open(`/detail/MiRNA?mirna_id=${this.data.mirna_id}`); 

        }
    }
};
</script>

<style scoped>
/* 容器布局 */
.layout-container {
    padding: 20px;
    background-color: #f8f9fa;
}

.vertical-layout {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* 卡片样式 */
.enhanced-card {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
}

.card-header {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.el-card__header {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-bottom: none;
    padding: 16px 24px;
}

.detail-title {
    color: #2c3e50;
    font-size: 1.4rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* 网格布局 */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 16px;
}

.grid-item {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
}

.grid-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    background: #f5f7fa;
}

.full-width {
    grid-column: 1 / -1;
}

label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 8px;
    display: block;
}

.value {
    font-size: 1rem;
    color: #333;
    word-break: break-word;
}

.description {
    line-height: 1.6;
    white-space: pre-wrap;
}

/* PMID 样式 */
.pmid-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

/* 分隔线 */
.custom-divider {
    margin: 18px 0;
}

/* 按钮样式 */
.action-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 16px;
}

.action-button {
    width: 100%;
    border-radius: 8px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .action-buttons {
        grid-template-columns: 1fr;
    }
    
    .enhanced-card {
        border-radius: 8px;
    }
    
    .detail-title {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
</style>
