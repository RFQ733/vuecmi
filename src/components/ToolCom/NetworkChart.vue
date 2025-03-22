<template>
  <div class="network-chart">
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'NetworkChart',
  props: {
    data: {
      type: Array,
      required: true
    },
    scoreRange: {
      type: Array,
      default: () => [0, 1]
    }
  },
  setup(props) {
    const chart = ref(null)
    let chartInstance = null

    const initChart = () => {
      if (chartInstance) {
        chartInstance.dispose()
      }
      chartInstance = echarts.init(chart.value)
    }

    const updateChart = () => {
      const filteredData = props.data.filter(item => 
        item.score >= props.scoreRange[0] && 
        item.score <= props.scoreRange[1]
      )

      const nodes = [
        {
          name: 'Analysis',
          value: 100,
          category: 0,
          symbolSize: 50,
          itemStyle: { color: '#5470c6' }
        },
        ...filteredData.map((item, index) => ({
          name: item.id,
          value: item.score,
          category: 1,
          symbolSize: 30 + item.score * 20,
          itemStyle: { color: '#91cc75' },
          label: { show: index % 2 === 0 }
        }))
      ]

      const links = filteredData.map(item => ({
        source: 'Analysis',
        target: item.id,
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
          data: ['Analysis', 'Entities']
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
            { name: 'Analysis' },
            { name: 'Entities' }
          ]
        }]
      }

      chartInstance.setOption(option)
    }

    const handleResize = () => {
      chartInstance?.resize()
    }

    onMounted(() => {
      initChart()
      updateChart()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      chartInstance?.dispose()
      window.removeEventListener('resize', handleResize)
    })

    watch(() => props.data, () => {
      updateChart()
    }, { deep: true })

    watch(() => props.scoreRange, () => {
      updateChart()
    })

    return {
      chart
    }
  }
})
</script>

<style scoped>
.network-chart {
  width: 100%;
  height: 500px;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>
