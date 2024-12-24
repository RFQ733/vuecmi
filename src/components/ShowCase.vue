<template>
  <el-header>
    <TopNavBar :curId="3"/>
  </el-header>
  <el-container>
  <!-- sidebar -->
   <el-aside>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
       <el-sub-menu v-for="item in navData" :key="item.id" :index="item.id">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group  v-for="group in item.groups" :key="group.id" :title="group.title">
              <el-menu-item 
              v-for="subItem in group.items" 
              :key="subItem.id"
               :index="subItem.id"
               @click="handleSelect(item.id,subItem.id)"
               >
               {{ subItem.title }}</el-menu-item>
            </el-menu-item-group>

          </el-sub-menu>
    </el-menu>
  </el-aside>

  <!-- content -->
   <el-main v-if="!associatedData">
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
   <el-main v-if="associatedData">      
      <TableViewCom :data-show-table="associatedData" />


      </el-main>
   
    </el-container>

</template>

<script>
import axios from 'axios'

import 'element-plus/dist/index.css'
import TopNavBar from './TopNavBar.vue'
import TableViewCom from './Echart/TableViewCom.vue';
export default {
  components: { TopNavBar,TableViewCom  },
  name: 'ShowCase',
  data() {
    return {
      navData: [],
      activeIndex: '1',
      selectedItem: null,
      associatedData: null
    }
  },
  mounted() {
    this.fetchNavData()
    this.fetchEchartsData()
  },
  methods: {
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

    async fetchNavData() {
      try {
        const response = await axios.get('/navdata.json')
        this.navData = response.data
      } catch (error) {
        console.error('Error fetching nav data:', error)
      }
    },
    async fetchAssociatedData(itemKey,key) {
      try {
        console.log("itemKey is", itemKey,key)
        const response = await axios.get("/api/get_table.php", {
          params: {
            mirna_key: key
          }
        })
        this.associatedData = response.data
      } catch (error) {
        console.error('Error fetching associated data:', error)
      }
    },
    handleSelect(itemKey, key) {

      console.log("itemKey is", itemKey)
      console.log("key is", key)
      try {

        console.log("selectedItem is", this.selectedItem)
        this.fetchAssociatedData(itemKey,key)
      } catch (error) {
        this.associatedData = this.selectedItem.id
        console.error('Error fetching associated data:', error)
      }
      console.log(key)
    },
    handleClose(key, keyPath){
        console.log(key, keyPath)
    },
    handleOpen(key, keyPath){
      console.log(key, keyPath)
    }
  },
watch: {
$route() {
this.activeIndex = this.$route.path
}


}
}
</script>

<style scoped>
/* .showcase {
    display: flex;
}

.sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 10px;
}

.content {
    flex: 1;
    padding: 10px;
} */
</style>