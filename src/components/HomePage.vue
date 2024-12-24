<template>
<TopNavBar :curId="1"/>
  <el-container>
    <el-header style="margin-top:5vh; height: 20vh; background-image: url('/pic/image.png'); background-size: cover; background-position: center;">
      <h1 style="color:white">The Database of CircRNA and MiRNA</h1>
      <p style="color:white">欢迎来到 CircRNA 和 MiRNA 数据库，这是一个专门收集和展示 CircRNA 和 MiRNA 数据的平台。</p>
    </el-header>
    <el-row>
        <el-col :span="12">

           <!-- show a image  -->
           <h2> Here have lots of  data which have experiment valited  </h2>
            <p> 1. circRNA: 2767 </p>
            <p> 2. miRNA: 2011 </p>
        </el-col>
        <el-col :span="12">
            <div ref="chart" style=" height: 400px; "></div>
        </el-col>    
    </el-row>
    
    <el-row>
       
      <el-col :span="12">
        <el-table :data="[
          { category: 'Total', count: 2767 },
          { category: 'circRNA', count: 1582 },
          { category: 'miRNA', count: 1058 },
          { category: 'Organism', count: 13 },
          { category: 'Disease', count: 183 },
          { category: 'mRNA', count: 11 },
          { category: 'Gene', count: 330 },
          { category: 'Virus Name', count: 3 },
          { category: 'Tissue/Cells', count: 937 },
          { category: 'Experiment', count: 885 },
          { category: 'Num Count', count: 2767 }
        ]">
          <el-table-column prop="category" label="Category" align="center"></el-table-column>
          <el-table-column prop="count" label="Count" align="center"></el-table-column>
        </el-table>
        </el-col>
        <el-col :span="12">
        <div ref="chart_pie" style="height: 500px;"> </div>
      </el-col>
</el-row>

    
    <el-footer>
      <span>© 2023 CircRNA 和 MiRNA 数据库. 保留所有权利.</span>
    </el-footer>
  </el-container>
</template>

<script>
import axios from 'axios';
import TopNavBar from './TopNavBar.vue';

export default {
  
  components: { TopNavBar },
  data() {
    return {
      linkingnum: [
        { circRNA: 10, miRNA: 20, disease: 5, experiment: 15 },
        { circRNA: 15, miRNA: 25, disease: 10, experiment: 20 },
      ],
      count_detail:[] ,
      organism: [],
      count_detail_organism: [],

    }
  },
  mounted() {
    this.initChart();
    // this.getData();
    this.updateChart();
    this.init_data() ;
  },
  methods:{
    async init_data(){
      // axios.get("/data/organism.json")
      // .then(response => {
      //   this.organism = response.data;
      //   console.log('organism:', this.organism);
      // })

      const response = await axios.get("/data/organism.json");
      this.organism = response.data;
      console.log('organism:', this.organism);
      for (let i = 0; i < this.organism.length; i++) {
        console.log(this.organism[i]);
        var res = await axios.get(`/api/get_tongji.php?organism=${this.organism[i]}`);
        console.log("count in " + res.data);
        this.count_detail_organism[this.organism[i]] = res.data;
      }
      console.log('count_detail_organism:', this.count_detail_organism);
    },
    initChart(){
      this.chart_first = this.$echarts.init(this.$refs.chart);
      this.chart_pie = this.$echarts.init(this.$refs.chart_pie);
    },
    updateChart(){
      const opF= {
        title: {
          text: '数据概况'
        },
        tooltip: {},
        legend: {
          data: ['circRNA', 'miRNA', 'disease', 'experiment']
        },
        xAxis: {
          data: ['human', 'mouse']
        },
        yAxis: {},
        series: [
          {
            name: 'circRNA',
            type: 'bar',
            data: [1537, 66]
          },
          {
            name: 'miRNA',
            type: 'bar',
            data: [1033, 65]
          },
          {
            name: 'disease',
            type: 'bar',
            data: [174, 33]
          },
          {
            name: 'experiment',
            type: 'bar',
            data: [854, 55]
          }
        ],
        toolbox: {
          feature: {
              "saveAsImage": {}
          }
        }
      };
      const op2 = {
    "title": {
        "text": "miRNA numbers"
    },
    "tooltip": {
        "trigger": "item",
        "formatter": "{a} <br/>{b} : {c} ({d}%)"
    },
    "series": [
    {
        "name": "miRNA",
        "type": "pie",
        "radius": "50%",
        "data": [
            { "value": 2231223, "name": "human" },
            { "value": 33212, "name": "mouse" },
            { "value": 213214, "name": "rat" },
            { "value": 131245, "name": "zebrafish" },
            { "value": 154448, "name": "other" }
        ]
    }],
    "toolbox": {
        "feature": {
            "saveAsImage": {}
        }
    }
}

      // op2.title.text = '数据概况饼图';
      this.chart_first.setOption(opF);
      this.chart_pie.setOption(op2);
    },
    getData(){
      axios.get('/api/dict/small_count.json')
        .then(response => {
          this.count_detail = response.data;
          console.log('count_detail:', this.count_detail);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

  }
}
</script>

<style scoped>
.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  text-align: center;
  padding: 20px;
}


.el-row {
    margin: 5%;
  padding: 20px;
}

.el-footer {
  /* background-color: #B3C0D1; */
  text-align: center;
  padding: 10px;
}
</style>