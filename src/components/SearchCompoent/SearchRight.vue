<template>
<div class="srchright">
    <div class="header">
        Prediction
    </div>
  <div>

    <el-row>

        <el-select
         v-model="FormData.selectedRNA" 
         placeholder="CircRNA/miRNA">
          <el-option v-if="this.data.mirna" :label="this.data.mirna" :value="this.data.mirna"></el-option>
          <el-option v-if="this.data.circrna" :label="this.data.circrna" :value="this.data.circrna"></el-option>
        </el-select>
        
        <el-select v-model="FormData.selectedModel" label="model" placeholder="选择预测模型">
          <el-option label="TransFusion" value="TransFusion"></el-option>
          <el-option label="NMFCD" value="NMFCD"></el-option>
          <el-option label="KNNVG" value="KNNVG"></el-option>
        </el-select>
        <!-- butsubmit  -->
        <el-button type="primary"
        style="margin-left: 50px;"
         @click="handleSubmit"
        >Submit</el-button>
      
      </el-row>


    <el-row class="model">

        <PredictionTable
          v-if="CMDarr.length > 0"
            :data="CMDarr"
        />
      </el-row>
      

        <VisCMD   
          v-if="CMDarr.length > 0"
            :data="CMDarr"
            bigName="predction NetWork"
        />
      <el-row>
        
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
            v-if="miRNAPairs.length"
            :circRNAName="circRNA.circrna_id"
            :pairs="miRNAPairs"
          />
        </el-card>
      </el-col>


      </el-row>
  </div>
</div>
</template>


<script>
import axios from 'axios';
import VisCMD  from '../Echart/VisCMD.vue';
import DetailCircRNARight from '../DetailCom/DetailCircRNARight.vue';
import PredictionTable from "../Echart/PredictionTable.vue";

export default {
    name: 'SearchRight',
    components: {
        VisCMD,PredictionTable,
        DetailCircRNARight
    },
    props: {
        data: {
        type: Object,
        required: true
        }
    },
  data() {
    return {
      input: '',
      tableData:[],
      FormData: {
            selectedType: '',
            selectedModel: ''
     },
     miRNAPairs: [],
      circRNA: {
        circrna_id: 'hsa_circ_0000001',
        pairs: []
      },
     CMDarr: []



    }; 
  },

  methods: {
    querySearch(queryString, cb) {
      const results = this.tableData.filter(item => item.name.toLowerCase().includes(queryString.toLowerCase()));
      cb(results);
    },
    handleSubmit() {
      console.log('submit');
      var selectedRNAType = this.FormData.selectedRNA;
      if (this.FormData.selectedRNA == this.data.mirna){
        selectedRNAType = 'mirna';
      } else {
        selectedRNAType = 'circrna';
      }
      axios.get('/api/get_predict.php', {
        selectedType: selectedRNAType,
        selectedRNA: this.FormData.selectedRNA,
        selectedModel: this.FormData.selectedModel
      }).then(response => {
        console.log(response,"retrun CMDarr");
        this.CMDarr = response.data;
        this.miRNAPairs = response.data;
        this.circRNA = "hsa_circ_0000001";


      });
    },
  },
  
  
    
  
};
</script>

<style scoped>

.model{
    margin-top: 50px;
    margin-bottom:50px ;
}
#echart {
  width: 100%;
  height: 400px;
}
.header{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left:-2px ;
    text-align: left;
}
.srchright{
    /* margin-left: 50px; */
    margin-top: 20px;
    padding-left: 15% ;

    border-left: 3px solid #c3c6ca;
}
</style>