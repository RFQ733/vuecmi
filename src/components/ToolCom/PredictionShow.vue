<template>
  <div class="prediction-container">
    <!-- 错误提示 -->
    <el-alert 
      v-if="error"
      :title="error"
      type="error"
      show-icon
      class="error-alert"
      @close="error = ''"
    />

    <!-- 模型和实体选择器 -->
    <model-selector 
      v-model:modelValue="selectedModel"
      v-model:entity="selectedEntity"
    />

    <!-- 数据展示区域 -->
    <el-skeleton :loading="loading" animated :count="3">
      <template #template>
        <el-skeleton-item variant="rect" class="skeleton-header" />
        <div class="skeleton-content">
          <el-skeleton-item variant="rect" class="skeleton-card" />
          <el-skeleton-item variant="rect" class="skeleton-table" />
        </div>
      </template>

      <template #default>
        <el-row :gutter="20">
          <!-- 实体基本信息 -->
          <el-col :span="8">
            <entity-info-card 
              :entity="currentEntity"
              :statistics="statistics"
              :entity-type="entityType"
            />
          </el-col>

          <!-- 分析结果展示 -->
          <el-col :span="16">
            <analysis-panel
              v-model:keyword="searchKeyword"
              v-model:score-range="scoreThreshold"
              :data="filteredData"
              @detail="showDetail"
            />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import axios from 'axios'
import ModelSelector from './ModelSelector.vue'
import EntityInfoCard from './EntityInfoCard.vue'
import AnalysisPanel from './AnalysisPanel.vue'

export default defineComponent({
  name: 'PredictionShow',
  components: {
    ModelSelector,
    EntityInfoCard,
    AnalysisPanel
  },
  setup() {
    // 不再从父组件接收 props，改用本地状态维护
    var selectedModel = ref('TransFusion')
    var selectedEntity = ref({
      value: '',
      name: ''
    })

    const loading = ref(false)
    const error = ref('')
    const searchKeyword = ref('')
    const scoreThreshold = ref([0.5, 1])
    
    // 当前实体信息
    const currentEntity = ref({
      id: '',
      name: '',
      species: '',
      chromosome: '',
      position: '',
      associations: []
    })

    // 统计信息
    // const statistics = ref({
    //   total: 0,
    //   avgScore: 0,
    //   maxScore: 0
    // })
    const statistics = computed(() => {
      const total = currentEntity.value.associations?.length || 0
      const avgScore = currentEntity.value.associations?.reduce((acc, cur) => acc + cur.score, 0) / total || 0
      const maxScore = currentEntity.value.associations?.reduce((acc, cur) => Math.max(acc, cur.score), 0) || 0
      return { total, avgScore, maxScore }
    })
    // 实体类型计算属性
    const entityType = computed(() => {
      return selectedModel.value === 'HGTMDA' ? 'miRNA' : 'circRNA'
    })

    // 过滤后的数据
    const filteredData = computed(() => {
      return currentEntity.value.associations?.filter(item => {
        const matchesKeyword = item.name?.toLowerCase().includes(searchKeyword.value.toLowerCase())
        const inScoreRange = item.score >= scoreThreshold.value[0] && item.score <= scoreThreshold.value[1]
        return matchesKeyword && inScoreRange
      }) || []
    })

    // 获取API地址
    const getPredictionAPI = () => {
      // const apiMap = {
      //   TransFusion: '/api/predict/transfusion',
      //   LMSSNCDA: '/api/predict/lmssncda',
      //   HGTMDA: '/api/predict/hgtmda'
      // }
      // return apiMap[selectedModel.value]
      return '/api/predict/get_mirnas_by_circrna.php'
    }

    // 获取预测数据
    const fetchPredictionData = async () => {

        if (!selectedEntity.value) return
        try {
          loading.value = true
          error.value = ''
          const { data } = await axios.get(getPredictionAPI(), {
            params: {
              id: selectedEntity.value.value,
              model: selectedModel.value
            }
          })
          // 更新实体信息
          console.log('预测数据:', data)
          console.log('selectedEntity:', selectedEntity.value)

          currentEntity.value = {
            id: selectedEntity.value,
            name: selectedEntity.value,
            species: data.species,
            chromosome: data.chromosome,
            position: `${data.start}-${data.end}`,
            associations: data.miRNAs || []
          }

          

      } catch (err) {
        error.value = '数据加载失败，请检查网络或稍后重试'
        console.error('API请求错误:', err)
      } finally {
        loading.value = false
      }
    }

    // 监听模型和实体变化，自动获取数据
    watch([selectedModel, selectedEntity], ([newModel, newEntity]) => {
      if (newModel || newEntity) {
        console.log('模型或实体变化:', newModel, newEntity)

        fetchPredictionData()
      }
    }, { immediate: true })

    // 显示详情
    const showDetail = (item) => {
      console.log('查看详情:', item)
      // 可根据需求执行具体操作
    }

    return {
      loading,
      error,
      searchKeyword,
      scoreThreshold,
      currentEntity,
      statistics,
      entityType,
      filteredData,
      showDetail,
      selectedModel,
      selectedEntity
    }
  }
})
</script>

<style scoped>
.prediction-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 120px);
}

.error-alert {
  margin-bottom: 20px;
}

.skeleton-header {
  width: 200px;
  height: 40px;
  margin-bottom: 20px;
}

.skeleton-content {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.skeleton-card {
  width: 300px;
  height: 400px;
}

.skeleton-table {
  flex: 1;
  height: 400px;
}
</style>