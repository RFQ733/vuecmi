<template>
    <el-header>
        <top-nav-bar :curid="-1">
        </top-nav-bar>
    </el-header>

    <el-container class="layout-container">
  <el-row :gutter="24" class="enhanced-row">
    <!-- 左侧图表区块 -->
    <el-col :xs="24" :sm="24" :md="10" :lg="9" :xl="9" class="chart-column">
      <div class="chart-card">
        <CircrnaDetailChart 
          :data="circRNAdetails"
          v-if="circRNAdetails.length"
          big-name="Experiment Type Distribution"
        />
      </div>
    </el-col>

    <!-- 中间详细信息区块 -->
    <el-col :xs="24" :sm="24" :md="14" :lg="10" :xl="10" class="detail-column">
      <el-card class="info-card">
        <template #header>
          <div class="card-header">
            <h2 class="circrna-title">
              <i class="el-icon-document"></i>
              circRNA ID: {{ circRNA.circrna_id }}
            </h2>
          </div>
        </template>
        
        <div v-for="(detail, index) in circRNAdetails" :key="index" class="detail-item">
          <el-collapse v-model="activeNames">
            <el-collapse-item :name="index">
              <template #title>
                <span class="experiment-title">Experiment {{ index + 1 }}</span>
                <el-tag type="info" size="small">{{ detail.experiment?.split(',')[0] }}</el-tag>
              </template>
              <div class="experiment-content">
                <p class="section-title">Experimental Methods</p>
                <p class="experiment-desc">{{ detail.experiment }}</p>
                
                <p class="section-title">Research Findings</p>
                <p class="description-text">{{ detail.description }}</p>
                <p>
                PMID:  {{ detail.pmid }}
                </p>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-divider class="custom-divider" v-if="index < circRNAdetails.length -1" />
        </div>
      </el-card>
    </el-col>

    <!-- 右侧预测信息区块 -->
    <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="9" class="prediction-column">
      <el-card class="prediction-card">
        <template #header>
          <div class="prediction-header">
            <h3 class="prediction-title">
              <i class="el-icon-data-analysis"></i>
              Prediction Network
            </h3>
          </div>
        </template>
        <DetailCircRNARight
          :circRNA-name="circRNA.circrna_id"
          :pairs="miRNAPairs"
        />
        <!-- <search-right :data="rightdata" class="prediction-content"/> -->
      </el-card>
    </el-col>
  </el-row>
</el-container>

</template>

<script>
// import SearchRight from '../SearchCompoent/SearchRight.vue';
import TopNavBar from '../TopNavBar.vue';
import axios from 'axios';
// import DetailCircRNATable from './DetailCircRNATable.vue';
import CircrnaDetailChart from '../Echart/CircrnaDetailBarExp.vue';
import DetailCircRNARight from './DetailCircRNARight.vue';
export default {
  name: 'DetailCircRNA',
  components: {
    // SearchRight,
    TopNavBar,
    CircrnaDetailChart,
   DetailCircRNARight
  },
  created() {

    console.log("created");
    this.circRNA.circrna_id = this.$route.query.circrna_id;
    console.log(this.$route.query.circrna_id, " is the circRNA id now");

    axios.get(`/api/detail_page/circrna_detail.php?circrna_id=${this.circRNA.circrna_id}`)
      .then(response => {
        this.circRNAdetails = response.data;
        console.log(this.circRNAdetails);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  data() {
    return {
      miRNAPairs : [
        { miRNA: 'miR-185-5p', score: 0.95 },
        { miRNA: 'miR-1275', score: 0.82 },
        { miRNA: 'miR-145-5p', score: 0.78 },
        { miRNA: 'let-7c', score: 0.68 },
        { miRNA: 'MiR-92b-3p', score: 0.92 }
  ] , 
      activeNames: [0],
      circRNA:{
        circrna_id:"nan"
      },
      rightdata:{
        mirna: "hsa-miR-21-5p",
        circRNA: "hsa_circ_0000001"
      },
      FormData: {
        selectedRNA: "this.circRNA.circRNA_id",
        selectedModel: "TransFusion",
      },
      circRNAdetails: [

      ]
    };
  }
};
</script>

<style scoped>
.detail-circ-rna {
  display: flex;
}

.main-content {
  flex: 1;
  margin: 10%;
}

.search-right {
  width: 300px;
}
</style>
<style>
/* 容器布局 */
.layout-container {
  padding: 20px;
  background-color: #f8f9fa;
}

.enhanced-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* 通用卡片样式 */
.el-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.el-card__header {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: none;
  padding: 16px 24px;
}

/* 图表区块 */
.chart-card {
  height: 680px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
}

/* 详细信息区块 */
.circrna-title {
  color: #2c3e50;
  font-size: 1.4rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-item .experiment-title {
  font-weight: 500;
  color: #34495e;
}

.experiment-content {
  padding: 12px 18px;
  background: #f8f9fa;
  border-radius: 8px;
}

.section-title {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 8px 0;
}

/* 响应式处理 */
@media (max-width: 1200px) {
  .chart-column,
  .detail-column,
  .prediction-column {
    margin-bottom: 24px;
  }
  
  .el-card {
    min-height: auto !important;
  }
}
</style>