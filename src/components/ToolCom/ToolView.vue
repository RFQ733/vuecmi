<template>
  <top-nav-bar curId="5" />
  
    <div class="tool-view-wrapper">
      <div class="tool-view-header">Prediction</div>
  
      <el-row class="form-row">
        <el-select
          v-model="FormData.selectedRNA" 
          placeholder="请选择RNA类型">
          <el-option :label="mirnaLabel" :value="mirnaLabel"></el-option>
          <el-option :label="circrnaLabel" :value="circrnaLabel"></el-option>
        </el-select>
  
        <el-select v-model="FormData.selectedModel" placeholder="选择预测模型">
          <el-option label="TransFusion" value="TransFusion"></el-option>
          <el-option label="NMFCD" value="NMFCD"></el-option>
          <el-option label="KNNVG" value="KNNVG"></el-option>
        </el-select>
  
        <el-button type="primary" @click="handleSubmit" class="submit-btn">
          Submit
        </el-button>
      </el-row>
  
      <el-row class="model-result" v-if="CMDarr.length > 0">
        <PredictionTable :data="CMDarr" />
      </el-row>
  
      <VisCMD
        v-if="CMDarr.length > 0"
        :data="CMDarr"
        bigName="prediction NetWork"
      />
      <el-row>
        <el-col 
       
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
            v-if="miRNAPairs.length"
            :circRNAName="circRNA.circrna_id"
            :pairs="miRNAPairs"
          />
        </el-card>
      </el-col>


      </el-row>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import PredictionTable from '../Echart/PredictionTable.vue';
  import VisCMD from '../Echart/VisCMD.vue';
  import DetailCircRNARight from '../DetailCom/DetailCircRNARight.vue';
  import TopNavBar from '../TopNavBar.vue';
  export default {
    name: 'ToolView',
    components: {
      PredictionTable,
      VisCMD,
       DetailCircRNARight,
      TopNavBar
    },
    data() {
      return {
        // 可自行修改，这里仅作示例
        mirnaLabel: 'mirna',
        circrnaLabel: 'circrna',
        
        FormData: {
          selectedRNA: '',
          selectedModel: ''
        },
        CMDarr: [],
        circRNA: {
          circrna_id: 'hsa_circ_0000001'
        },
        miRNAPairs: [
          {
            mirna_id: 'hsa-miR-0001',
            score: 0.8
          },
          {
            mirna_id: 'hsa-miR-0002',
            score: 0.6
          },
          {
            mirna_id: 'hsa-miR-0003',
            score: 0.4
          }
        ]
      };
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
          this.CMDarr = response.data;
        }).catch(error => {
          console.error("请求失败: ", error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .tool-view-wrapper {
    padding: 20px 30px;
    border-left: 3px solid #c3c6ca;
  }
  
  .tool-view-header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .form-row {
    margin-bottom: 20px;
  }
  
  .submit-btn {
    margin-left: 30px;
  }
  
  .model-result {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  </style>