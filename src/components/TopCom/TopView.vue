<template>
    <top-nav-bar>

    </top-nav-bar>
    <div>
      <el-select v-model="selectedComponent" class="full-width-select">
        <el-option label="Disease" value="DiseaseCircRelation" />
        <el-option label="miRNA" value="miRNACircRelation" />
      </el-select>
      <component :is="selectedComponent" />
    </div>
  </template>
  
  <script>
  import DiseaseCircRelation from '@/components/TopCom/DiseaseCircRelation.vue'
  import miRNACircRelation from '@/components/TopCom/miRNACircRelation.vue'
  import TopNavBar from '@/components/TopNavBar.vue'
  export default {
    name: 'TopView',
    components: {
      DiseaseCircRelation,
      miRNACircRelation,
      TopNavBar
    },
    data() {
      return {
        selectedComponent: 'DiseaseCircRelation'
      }
    }
  }
  </script>
  
  <style scoped>
  .full-width-select {
    width: 200px;
    margin-bottom: 20px;
  }
  </style>