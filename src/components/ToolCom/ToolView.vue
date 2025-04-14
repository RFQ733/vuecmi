<template>
  <top-nav-bar :cur-id="5" />

  
  <prediction-show 
    :selectedEntityFromFather="defaultCircRNAName"
    :selectedModelFromFahter="selectedComponent"
    
  />
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
        id: '',
        chr: '7',
        start: '55191822',
        end: '55207362'
      },
      defaultCircRNAName: {
        value: '',
        name: ''
      },
      defaultAssociations: [],
    }
  },


  async mounted() {
    
    
    if (this.$route.query.entity && this.$route.query.model) {
      // 先更新本地 state
      console.log("******************** the query is: ", this.$route.query.entity.toString())
      this.defaultCircRNAName.value = this.$route.query.entity.toString()
      this.defaultCircRNAName.name = this.$route.query.entity.toString()
      this.selectedComponent = this.$route.query.model.toString()
    }
    
    console.log(this.defaultCircRNAName.value, "defaultCircRNAName.value IN MOUNTED TOOL VIEW PAGE")
    console.log(" the type of this.defaultCircRNAName.value is: ", typeof this.defaultCircRNAName.value)
    console.log(this.selectedComponent, "selectedComponent IN MOUNTED TOOL VIEW PAGE")
    console.log(" the type of this.selectedComponent is: ", typeof this.selectedComponent)
    // 示例API调用
    const res = await this.$axios.get(`/api/predict/get_mirnas_by_circrna.php`+
      `?entity=${this.defaultCircRNA.id}`+
      `&model=${this.selectedComponent}`
    )
    // this.$set(this.currentCircRNA, 'associations', res.data.miRNAs)
    this.associations = res.data.miRNAs

    // if url has query,  tool?entity=circ123&model=TransFusion


    
    
  }
}
</script>
