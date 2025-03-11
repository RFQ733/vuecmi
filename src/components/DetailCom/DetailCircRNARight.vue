<template>
    <div class="searchright-container">
      <!-- 关联强度图 -->
      <div class="chart-card">
        <h3>{{ circRNAName }} 关联网络</h3>
        <div ref="networkChart" class="chart"></div>
      </div>
  
      <!-- 混淆矩阵热力图 -->
      <div class="chart-card">
        <h3>交互得分热力图</h3>
        <div ref="heatmapChart" class="chart"></div>
      </div>
    </div>
  </template>
  <script>
  // 普通 <script> 块用于定义组件选项
  export default {
    name: 'DetailCircRNARight'
  }
  </script>
  

  <script setup>
    import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
    import { defineProps } from 'vue'
    import * as echarts from 'echarts'
    
  const props = defineProps({
    circRNAName: {
      type: String,
      required: true
    },
    pairs: {
      type: Array,
      required: true,
      validator: (arr) => {
        return arr.every(item => 
          item.mirna_id && typeof item.score === 'number'
        )
      }
    }
  })
  console.log(props, " is in DetailCircRNARight.vue")
  // 图表实例引用
  const networkChart = ref(null)
  const heatmapChart = ref(null)
  let networkInstance = null
  let heatmapInstance = null
  
  // 网络图配置
  const initNetwork = () => {
    if (!networkChart.value) return
    
    const nodes = [
      {
        name: props.circRNAName,
        value: 100,
        category: 0,
        symbolSize: 50,
        itemStyle: { color: '#5470c6' }
      },
      ...props.pairs.map((item, index) => ({
        name: item.mirna_id,
        value: item.score,
        category: 1,
        symbolSize: 30 + item.score * 20,
        itemStyle: { color: '#91cc75' },
        label: { show: index % 2 === 0 }
      }))
    ]
  
    const links = props.pairs.map(item => ({
      source: props.circRNAName,
      target: item.mirna_id,
      value: item.score,
      lineStyle: {
        width: 2 + item.score * 3,
        color: {
          type: 'linear',
          colorStops: [
            { offset: 0, color: '#5470c6' },
            { offset: 1, color: '#91cc75' }
          ]
        }
      }
    }))
  
    const option = {
      tooltip: {},
      legend: {
        data: [props.circRNAName, 'miRNA']
      },
      series: [{
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 200,
          edgeLength: 150
        },
        data: nodes,
        links: links,
        edgeSymbol: ['none', 'arrow'],
        edgeLabel: {
          show: true,
          formatter: ({ value }) => `Score: ${value.toFixed(2)}`
        },
        categories: [
          { name: props.circRNAName },
          { name: 'miRNA' }
        ]
      }]
    }
  
    networkInstance = echarts.getInstanceByDom(networkChart.value) || echarts.init(networkChart.value)
    networkInstance.setOption(option)
  }
  
  // 热力图配置
  const initHeatmap = () => {
    if (!heatmapChart.value) return
  
    // 生成正确的矩阵数据（单列多行）
    const matrixData = props.pairs.map((item, index) => [
        0, // x轴索引（固定为circRNA位置）
        props.pairs.length - 1 - index, // y轴索引（反向排列）
        item.score
    ])

  
    const option = {
      tooltip: {
        formatter: params => {
          const item = props.pairs[params.data[0]]
          return `${props.circRNAName} ↔ ${item.mirna_id}<br>Score: ${item.score.toFixed(2)}`
        }
      },
    //   xAxis: {
    //     type: 'category',
    //     data: [props.circRNAName],
    //     axisTick: { show: false }
    //   },
    //   yAxis: {
    //     type: 'category',
    //     data: props.pairs.map(item => item.mirna_id).reverse(),
    //     axisLabel: { rotate: 30 }
    //   },
      visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 10,
        inRange: { color: ['#91cc75', '#5470c6'] }
      },
    //   series: [{
    //     type: 'heatmap',
    //     data: matrixData,
    //     label: {
    //       show: true,
    //       formatter: params => params.value[2].toFixed(2)
    //     },
    //     itemStyle: { borderRadius: 4 }
    //   }],
      xAxis: {
      type: 'category',
      data: [props.circRNAName], // 单列数据
      axisLabel: { 
        interval: 0,
        formatter: () => props.circRNAName // 确保长名称显示
      }
    },
    yAxis: {
      type: 'category',
      data: [...props.pairs].reverse().map(item => item.mirna_id), // 保持反向排序
      axisLabel: { 
        rotate: 30,
        formatter: value => value.length > 8 ? value.substring(0,6)+'...' : value
      }
    },
    series: [{
      type: 'heatmap',
      data: matrixData,
      // 添加标签配置
      label: {
        show: true,
        color: '#fff',
        formatter: params => {
          const yIndex = params.data[1]
          const item = props.pairs[props.pairs.length - 1 - yIndex]
          return `${item.mirna_id}\n${item.score.toFixed(2)}`
        }
      }
    }]
    }
  
    heatmapInstance = echarts.getInstanceByDom(heatmapChart.value) || echarts.init(heatmapChart.value)
    heatmapInstance.setOption(option)
  }
  
  // 响应式调整
  const handleResize = () => {
    networkInstance?.resize()
    heatmapInstance?.resize()
  }
  
  // 生命周期管理
  onMounted(() => {
    nextTick(() => {
      initNetwork()
      initHeatmap()
      window.addEventListener('resize', handleResize)
    })
  })
  
  onUnmounted(() => {
    networkInstance?.dispose()
    heatmapInstance?.dispose()
    window.removeEventListener('resize', handleResize)
  })
  
  watch(() => props.pairs, () => {
    nextTick(() => {
      initNetwork()
      initHeatmap()
    })
  }, { deep: true })
  </script>

  
  <style scoped>
  .searchright-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
  
  .chart-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    padding: 20px;
  }
  
  .chart-card h3 {
    margin: 0 0 15px 0;
    color: #2c3e50;
  }
  
  .chart {
    height: 500px;
  }
  
  @media (max-width: 768px) {
    .searchright-container {
      grid-template-columns: 1fr;
    }
    
    .chart {
      height: 400px;
    }
  }
  </style>