<template>
  <el-card class="entity-info-card">
    <div class="entity-header">
      <h3 class="entity-title">{{ entityType }} </h3>
      <h3 v-if="entity.name ">{{ entity.name }}</h3>
      <el-tag type="info">{{ genomeVersion }}</el-tag>
    </div>
    
    <div class="genomic-location" v-if="entity.chr && entity.start && entity.end">
      <el-icon class="location-icon"><location /></el-icon>
      <span>chr{{ entity.chr }}:{{ entity.start }}-{{ entity.end }}</span>
    </div>

    <el-divider></el-divider>

    <div class="statistics-grid">
      <div class="stat-item">
        <div class="stat-label">关联{{ targetType }}数</div>
        <div class="stat-value">{{ statistics.total }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">平均得分</div>
        <div class="stat-value">{{ statistics.avgScore.toFixed(2) }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EntityInfoCard',
  props: {
    entity: {
      type: Object,
      required: true
    },
    statistics: {
      type: Object,
      required: true
    },
    entityType: {
      type: String,
      default: 'circRNA'
    },
    targetType: {
      type: String,
      default: 'miRNA'
    },
    genomeVersion: {
      type: String,
      default: 'hg38'
    }
  }
})
</script>

<style scoped>
.entity-info-card {
  margin-bottom: 20px;
}

.entity-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.entity-title {
  margin: 0 10px 0 0;
  font-size: 18px;
  color: #303133;
}

.genomic-location {
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
}

.location-icon {
  margin-right: 5px;
  font-size: 16px;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.stat-item {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
}

.stat-label {
  color: #909399;
  font-size: 12px;
}

.stat-value {
  font-size: 20px;
  color: #409EFF;
  margin-top: 5px;
}
</style>
