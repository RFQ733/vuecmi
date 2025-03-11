<template>
    <el-header>
        <top-nav-bar :curid="-1">
        </top-nav-bar>
    </el-header>
    <el-container>
        <el-col :span="12">
            <div class="main-content">
              miRNA ID: {{ miRNA.mirna_id }}
            </div>
            <div v-for="xx in miRNAdetails" :key="xx.num">
              <div>{{ xx.mirna_id }}</div>
              <div>{{ xx.circrna_id }}</div>
              <div>{{ xx.description }}</div>
              <div>{{ xx.experiment }}</div>
              <div>{{ xx.pmid }}</div>
            </div>
          </el-col>

        <el-col :span="8">
            <search-right :data="this.rightdata"></search-right>
        </el-col>
    </el-container>
</template>

<script>
import SearchRight from '../SearchCompoent/SearchRight.vue';
import TopNavBar from '../TopNavBar.vue';
import axios from 'axios';
export default {
  name: 'DetailMiRNA',
  components: {
    SearchRight,
    TopNavBar
  },
  created() {

    this.miRNA.mirna_id = this.$route.query.mirna_id;
    axios.get(`/api/detail_page/mirna_detail.php?mirna_id=${this.miRNA.mirna_id}`)
      .then(response => {
        this.miRNAdetails = response.data;
        console.log(this.miRNA);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
  data() {
    return {
      miRNA:{
        mirna_id:"nan"
      },
      miRNAdetails: {},
      rightdata:{
        mirna: "hsa-miR-21-5p",
        circRNA: "hsa_circ_0000001"
      }
    };
  }
};
</script>

<style scoped>
.detail-mi-rna {
  display: flex;
}

.main-content {
  flex: 1;
  margin: 10%;
}

.search-right {
  width: 300px;
}
</style>
