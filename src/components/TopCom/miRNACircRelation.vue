<template>
    <div class="mirna-container">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="selection-panel">
            <el-select 
              v-model="selectedMiRNA"
              filterable
              placeholder="请选择 miRNA"
              @change="handleMiRNAChange"
              class="full-width-select"
            >
              <el-option
                v-for="item in miRNAList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="18">
          <div v-loading="loading" class="chart-container">
            <div ref="chart" style="width: 100%; height: 500px;"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  import axios from 'axios'
  
  export default {
    name: 'mIRNACircRelation',
    data() {
      return {
        selectedMiRNA: '',
        miRNAList: [],
        chartData: [],
        chartInstance: null,
        loading: false
      }
    },
    mounted() {
      this.initChart()
      this.fetchMiRNAList()
    },
    methods: {
      initChart() {
        this.chartInstance = echarts.init(this.$refs.chart)
        window.addEventListener('resize', this.handleResize)
      },
      async fetchMiRNAList() {
        try {
          const response = await axios.get('/data/mirnaList.json')
          this.miRNAList = response.data.map(item => ({
            id: item.value_a,
            name: item.value
          }))
        } catch (error) {
          console.error('获取 miRNA 列表失败:', error)
        }
      },
      async handleMiRNAChange() {
        if (!this.selectedMiRNA) return
  
        this.loading = true
        try {
          const response = await axios.get(`/data/faker_Top30.json?name=${this.selectedMiRNA}`)
          this.chartData = response.data
          this.updateChart()
        } catch (error) {
          console.error('获取 miRNA 数据失败:', error)
        } finally {
          this.loading = false
        }
      },
      updateChart() {
        const option = {
          title: {
            text: `${this.selectedMiRNA} - 关联CircRNA TOP30`,
            left: 'center',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: this.chartData.map(item => item.name),
            axisLabel: {
              rotate: 45,
              interval: 0,
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '关联数量',
            nameTextStyle: {
              fontSize: 12
            }
          },
          series: [{
            type: 'bar',
            data: this.chartData.map(item => item.num),
            itemStyle: {
              color: '#91cc75',
              borderRadius: [5, 5, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#57a250'
              }
            }
          }],
          grid: {
            bottom: 100,
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                title: '保存图片'
              }
            }
          }
        }
        this.chartInstance.setOption(option)
      },
      handleResize() {
        this.chartInstance?.resize()
      }
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize)
      this.chartInstance?.dispose()
    }
  }
  </script>
  
  <style scoped>
  .mirna-container {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  
  .selection-panel {
    padding: 20px;
    background: #f5f7fa;
    border-radius: 6px;
  }
  
  .full-width-select {
    width: 100%;
  }
  
  .chart-container {
    position: relative;
    min-height: 300px;
  }
  </style>