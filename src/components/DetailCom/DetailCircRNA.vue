<template>
    <el-header>
        <top-nav-bar :curid="-1">
        </top-nav-bar>
    </el-header>


    <el-container class="layout-container">
  <el-main class="vertical-layout">
    <!-- 顶部图表区块 -->

    <!-- 中间主内容区块 -->
    <el-row :gutter="24" class="enhanced-row middle-section">
      <!-- 详细信息区块 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="info-card">
          <!-- 原有详细信息内容保持不变 -->
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

      <!-- 右侧预测区块 -->
      <el-col 
       v-if="miRNAPairs.length"
      :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
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
        </el-card>
      </el-col>
      <el-col
      v-else
      :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

        <el-card class="prediction-card">
          <template #header>
            <div class="prediction-header">
              <h3 class="prediction-title">
                <i class="el-icon-data-analysis"></i>
                Prediction Option 
              </h3>
            </div>
          </template>

          <el-row class="form-row">

            <el-select
              v-if="this.circRNA.circrna_id"
              v-model="FormData.selectedRNA" 
              placeholder="this.circRNA.circrna_id">
              <el-option v-if="this.circRNA.circrna_id" 
              :label="this.circRNA.circrna_id" 
              :value="this.circRNA.circrna_id">

            </el-option>
              
            </el-select>
        
            <el-select v-model="FormData.selectedModel" placeholder="选择预测模型">
            <el-option label="TransFusion" value="TransFusion"></el-option>
            <el-option label="NMFCD" value="NMFCD"></el-option>
            <el-option label="KNNVG" value="KNNVG"></el-option>
          </el-select>
          </el-row>
          <el-button type="primary" @click="handleSubmit" class="submit-btn">
            Submit
          </el-button>
          </el-card>

        </el-col>


    </el-row>

    <el-row :gutter="24" class="enhanced-row top-section">
      <el-col :xs="12" :sm="12" :md="12" :lg="12">
        <div class="chart-card">
          <CircrnaDetailChart 
            :data="circRNAdetails"
            v-if="circRNAdetails.length"
            big-name="Experiment Type Distribution"
          />
        </div>
      </el-col>
    </el-row>

  </el-main>
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
  methods: {
    handleSubmit() {
      // 简单示例
      let selectedRNAType = (this.FormData.selectedRNA === this.mirnaLabel)
        ? 'mirna'
        : 'circrna';

      axios.get('/api/get_predict.php', {
        params: {
          selectedType: selectedRNAType,
          selectedRNA: this.FormData.selectedRNA,
          selectedModel: this.FormData.selectedModel
        }
      }).then(response => {
        console.log("返回数据: ", response.data);
        this.miRNAPairs = response.data;
      }).catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  },
  data() {
    return {
      miRNAPairs : [
        // { miRNA: 'miR-185-5p', score: 0.95 },
        // { miRNA: 'miR-1275', score: 0.82 },
        // { miRNA: 'miR-145-5p', score: 0.78 },
        // { miRNA: 'let-7c', score: 0.68 },
        // { miRNA: 'MiR-92b-3p', score: 0.92 }
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
        selectedRNA: "",
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
<style scoped>
.vertical-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-section {
  margin-bottom: 24px;
}

.info-card, .prediction-card {
  height: 100%;
  box-sizing: border-box;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .middle-section .el-col-md-16,
  .middle-section .el-col-md-8 {
    width: 100%;
    max-width: 100%;
  }
  
  .prediction-card {
    margin-top: 24px;
  }
}

@media (max-width: 768px) {
  .vertical-layout {
    gap: 16px;
  }
  
  .el-card {
    border-radius: 8px;
  }
  
  .circrna-title {
    font-size: 1.2rem;
  }
}

.custom-divider {
  margin: 18px 0;
}

.experiment-title {
  font-weight: 500;
  margin-right: 12px;
}

.prediction-title {
  margin: 0;
  font-size: 1.1rem;
}
</style>