<template>
  <top-nav-bar :cur-id="5" />
  <!-- <prediction-show 
    :entity-data="defaultCircRNA"
    :initial-model="selectedComponent"
    :association-data="defaultAssociations"
  /> -->
  
  <prediction-show />
</template>

<script>
import TopNavBar from '@/components/TopNavBar.vue'
import PredictionShow from '@/components/ToolCom/PredictionShow.vue'

export default {
  components: {
    TopNavBar,
    PredictionShow
  },
  data() {
    return {
      selectedComponent: 'TransFusion',
      defaultCircRNA: {
        id: 'hsa_circ_0000001',
        chr: '7',
        start: '55191822',
        end: '55207362'
      },
      defaultAssociations: [],
    }
  },
  async mounted() {
    // 示例API调用
    const res = await this.$axios.get(`/api/predict/get_mirnas_by_circrna.php`+
      `?entity=${this.defaultCircRNA.id}`+
      `&model=${this.selectedComponent}`
    )
    // this.$set(this.currentCircRNA, 'associations', res.data.miRNAs)
    this.associations = res.data.miRNAs
  }
}
</script>
