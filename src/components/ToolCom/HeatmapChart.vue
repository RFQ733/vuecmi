<template>
  <div class="heatmap-chart">
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'HeatmapChart',
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

      const option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '80%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: filteredData.map(item => item.id),
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: filteredData.map(item => item.name),
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '5%',
          inRange: {
            color: ['#e0ffff', '#006edd']
          }
        },
        series: [{
          name: 'Score',
          type: 'heatmap',
          data: filteredData.map(item => [item.id, item.name, item.score]),
          label: {
            show: true,
            formatter: ({ value }) => value[2].toFixed(2)
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }

      chartInstance.setOption(option)
    }

    onMounted(() => {
      initChart()
      updateChart()
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
.heatmap-chart {
  width: 100%;
  height: 500px;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>
