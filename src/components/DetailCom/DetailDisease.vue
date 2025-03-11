<template>
    <el-header>
        <top-nav-bar :curid="-1">
        </top-nav-bar>
    </el-header>
    <el-container>
        <el-col :span="12">
            <div class="main-content">
              Disease ID: {{ disease.disease_id }}
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
export default {
  name: 'DetailDisease',
  components: {
    SearchRight,
    TopNavBar
  },
  created() {
    this.disease.disease_id = this.$route.query.disease_id;
  },
  data() {
    return {
      disease:{
        disease_id:"nan"
      },
      rightdata:{
        mirna: "hsa-miR-21-5p",
        circRNA: "hsa_circ_0000001"
      }
    };
  }
};
</script>

<style scoped>
.detail-disease {
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
