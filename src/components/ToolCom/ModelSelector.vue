<template>
  <div class="model-selector-container">
    <div>
    <el-select 
      v-model="selectedModel" 
      class="model-selector"
      placeholder="选择预测模型"
      @change="handleModelChange">
      <el-option
        v-for="model in models"
        :key="model.value"
        :label="model.label"
        :value="model.value"
      />
    </el-select>
  </div>
  <div>
    <el-select
      v-model="selectedEntity"
      class="entity-selector"
      :placeholder="entityPlaceholder"
      :loading="loading"
      filterable
      clearable
      remote
      :remote-method="searchEntities"
      @change="handleEntityChange">
      <el-option
        v-for="item in entityList"
        :key="item.value"
        :label="item.name"
        :value="item"
      />
    </el-select>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'ModelSelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    entity: {
      type: Object,
      default: () => ({ value: '', name: '' })
    }
  },
  emits: ['update:modelValue', 'update:entity'],

  //
  setup(props, { emit }) {
  const models = [
    { value: 'TransFusion', label: 'TransFusion (circRNA)' },
    { value: 'LMSSNCDA', label: 'LMSSNCDA (circRNA)' },
    { value: 'HGTMDA', label: 'HGTMDA (miRNA)' }
  ]
  
  // 模型选择 - 使用 computed 实现双向绑定
  const selectedModel = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })

  // 实体选择 - 同样使用 computed 实现双向绑定
  const selectedEntity = computed({
    get: () => props.entity,
    set: value => {
      // 找到选中的完整实体对象
      const selected = entityList.value.find(item => item.value === value)
      // selectedEntity.value = selected || { value, name: value }
      emit('update:entity', selected || { value, name: value })
    }
  })

  const entityList = ref([])
  const loading = ref(false)
  
  

    const entityPlaceholder = computed(() => {
      return selectedModel.value === 'HGTMDA' 
        ? '输入miRNA名称或ID搜索' 
        : '输入circRNA名称或ID搜索'
    })

    const getDataSource = () => {
      return selectedModel.value === 'HGTMDA' 
        ? '/data/toolviewdata/miRNAlist.json'
        : '/data/toolviewdata/circRNAlist.json'
    }

    const loadEntities = async (query = '') => {
      try {
        loading.value = true
        const { data } = await axios.get(getDataSource())
        entityList.value = data.filter(item => 
          item.value.toLowerCase().includes(query.toLowerCase()) ||
          item.name.toLowerCase().includes(query.toLowerCase())
        ).map(item => ({
          value: item.value,
          name: `${item.value} | ${item.name}`
        }))
      } catch (error) {
        console.error('加载实体列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    const searchEntities = (query) => {
      loadEntities(query)
    }

    const handleModelChange = () => {
      selectedEntity.value = ''
      emit('update:entity', { value: '', name: '' })
      loadEntities()
    }


    const handleEntityChange = (value) => {
      selectedEntity.value = value
      emit('update:entity', value)
    }

    // 初始化加载
    loadEntities()

    return {
      models,
      selectedModel,
      selectedEntity,
      entityList,
      loading,
      entityPlaceholder,
      handleModelChange,
      searchEntities,
      handleEntityChange
    }
  }
})
</script>

<style scoped>
.model-selector-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.model-selector {
  width: 300px;
}

.entity-selector {
  flex: 1;
  min-width: 400px;
}

.el-select {
  transition: all 0.3s ease;
}

.el-select:hover {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>
