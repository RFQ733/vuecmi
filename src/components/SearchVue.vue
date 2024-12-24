<template>
  <el-container>
    <el-header>
      <TopNavBar :curId="2" />
    </el-header>
    <el-main>
              <h1 style="text-align: center;">Serach CircRNA-MiRNA</h1>
              <el-form :model="form" label-width="100px" style="max-width: 600px; margin: 0 auto;">
               
                <el-form-item label="CircRNA">
                    <el-autocomplete
                      v-model="form.circrna"
                      :fetch-suggestions="queryCircRNASearch"
                      placeholder=" CircRNA"
                      @select="handleCircRNASelect"
                    ></el-autocomplete>
                  </el-form-item>

                <el-form-item label="miRNA">
                  
                    <el-autocomplete
                      v-model="form.mirna"
                      :fetch-suggestions="queryMiRNASearch"
                      placeholder="miRNA"
                      @select="handleSelect"
                    ></el-autocomplete>
                  
                </el-form-item>


                <el-form-item style="text-align: center;">
                  <el-button type="primary" @click="handleSubmit">Submit</el-button>
                  <el-button @click="handleExample1">ExampleMiRNA</el-button>
                  <el-button @click="handleExample" > ExampleCircRNA </el-button>
                </el-form-item>
              </el-form>

<!-- if here have the dataShowTable  -->

              <el-row>
                <el-col :span="16"> 
                  <div v-if="dataShowTable.length > 0" >
                    <VisCMD
                    v-if="dataShowTable.length > 0"
                      :data="dataShowTable" 
                    />

                    <TableViewCom 
                    v-show = "dataShowTable.length > 0"
                    :dataShowTable="dataShowTable" 
                    />

                  <SearchShowVisualChart 
                      v-if="dataShowTable.length > 0"
                      :data="dataShowTable" 
                    />

                </div>
              </el-col>
            <el-col :span="6">
              <SearchRight 
                v-if="dataShowTable.length > 0"
                :data="form"
              />

            </el-col>
          </el-row>
    </el-main>
    <el-footer>
      <p style="text-align: center;">© 2024 CUMT Wang Lab CMI Database</p>
    </el-footer>
  </el-container>
</template>

<script>
import TopNavBar from './TopNavBar.vue'
import axios from 'axios'
import SearchShowVisualChart from './SearchCompoent/SearchShowVisualChart.vue';
import TableViewCom from './Echart/TableViewCom.vue'
import VisCMD from './Echart/VisCMD.vue'
import SearchRight from './SearchCompoent/SearchRight.vue';
export default {
  components: { TopNavBar , SearchShowVisualChart,TableViewCom,VisCMD , SearchRight},
  name: 'SearchVue',
  data() {
    return {
      form: {
        disease: '',
        circrna: '',
        mirna: '',
        options: []
      },
      dataShowTable:[],
      circRNAlist:[],
      miRNAlist:[]
    }
  },
  watch:{
    dataShowTable(){
      console.log('dataShowTable:',this.dataShowTable)
      // 重新挂载组件              <SearchShowVisualChart 
      // v-if="dataShowTable.length > 0"
      //             :data="dataShowTable" 
      //            />
      this.$nextTick(() => {
        this.$refs.visualChart && this.$refs.visualChart.$forceUpdate();
      });

    }
  },

  methods: {
    queryCircRNASearch(queryString, cb) {
      this.fetchCircRNAList(queryString).then(data => {
        cb(data);
      });
    },
    queryMiRNASearch(queryString , cb ){
      this.fetchMiRNAList(queryString).then(data => {
        cb(data);
      });
    },
    async fetchMiRNAList(query){
      return axios.get('/data/miRNAlist.json', {
        params: {
          query
        }
      }).then(res => {
        return res.data;
      });
    },
    async fetchCircRNAList(query) {
      // 这里你需要根据实际的后端接口来获取数据
      return axios.get('/data/circRNAlist.json', {
        params: {
          query
        }
      }).then(res => {
        return res.data;
      });
    },


    handleSubmit() {
    // this.dataShowTable = [];
      // 提交表单数据到后端
      axios.post('/api/search.php', this.form)
        .then(response => {
          console.log('提交成功:', response.data)
          this.dataShowTable = response.data
        })
        .catch(error => {
          console.error('提交失败:', error)
        })
    },
    handleExample1() {
      this.form.disease='';
      this.form.circrna='';
      this.form.mirna='miR-214';
    },
    handleExample() {
      this.form.disease = ''
      this.form.circrna = 'circNfix'
      this.form.mirna = ''
    },
    handleSelect(item) {
      console.log('Selected:', item);
    }
  }
}
</script>

<style scoped>
/* 表单居中布局 */
.el-form {
  margin-top: 50px;
}

</style>