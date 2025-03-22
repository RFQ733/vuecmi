<template>
  <el-card class="analysis-panel">
    <div class="chart-container">
      <NetworkChart 
        :data="data"
        :score-range="localScoreRange"
        class="network-section"
      />
      <HeatmapChart 
        :data="data"
        :score-range="localScoreRange"
        class="heatmap-section"
      />
    </div>

    <div class="filter-controls">
      <el-input
        :model-value="keyword"
        placeholder="搜索"
        class="search-input"
        clearable
        @update:modelValue="$emit('update:keyword', $event)"
      >
        <template #prefix>
          <el-icon><search /></el-icon>
        </template>
      </el-input>

      <el-slider
        :model-value="localScoreRange"
        :min="0"
        :max="1"
        :step="0.1"
        range
        show-stops
        @update:modelValue="handleSliderChange"
        class="score-slider"
      ></el-slider>
    </div>

    <el-table
      :data="data"
      stripe
      class="association-table"
      empty-text="暂无数据"
    >
      <el-table-column prop="id" label="ID" width="120" />
      <el-table-column prop="name" label="名称" width="200" />
      <el-table-column label="预测得分" width="150">
        <template #default="{ row }">
          <el-progress 
            :percentage="row.score * 100" 
            :color="scoreColor(row.score)"
            :show-text="false"
          />
          {{ row.score.toFixed(2) }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import HeatmapChart from './HeatmapChart.vue'
import NetworkChart from './NetworkChart.vue'

export default defineComponent({
  name: 'AnalysisPanel',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    keyword: {
      type: String,
      default: ''
    },
    scoreRange: {
      type: Array,
      default: () => [0.5, 1]
    }
  },
  emits: ['update:keyword', 'update:score-range'],
  components: {
    HeatmapChart,
    NetworkChart
  },
  setup(props, { emit }) {
    const localScoreRange = ref([...props.scoreRange])

    watch(
      () => props.scoreRange,
      (newVal) => {
        localScoreRange.value = [...newVal]
      },
      { deep: true }
    )

    const handleSliderChange = (val) => {
      localScoreRange.value = val
      emit('update:score-range', val)
    }

    const scoreColor = (score) => {
      const hue = Math.round(120 * score)
      return `hsl(${hue}, 100%, 50%)`
    }

    return {
      localScoreRange,
      handleSliderChange,
      scoreColor
    }
  }
})
</script>

<style scoped>
.analysis-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.filter-controls {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.network-section,
.heatmap-section {
  height: 400px;
}

.association-table ::v-deep .cell {
  padding: 8px 12px;
}

.association-table ::v-deep .el-progress-bar {
  padding-right: 0;
  margin-right: 0;
}
</style>
