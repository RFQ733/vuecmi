<template>
    <el-header>
        <top-nav-bar :curid="-1">
        </top-nav-bar>
    </el-header>
    <el-container>
        <el-col :span="16">
            <div>
              circRNA ID: {{ circRNA.circRNA_id }}
            </div>

        </el-col>
        <el-col :span="8">
            <search-right :data="this.Formdata"></search-right>
        </el-col>
    </el-container>



</template>

<script>
import SearchRight from '../SearchCompoent/SearchRight.vue';
import TopNavBar from '../TopNavBar.vue';
export default {
  name: 'DetailCircRNA',
  components: {
    SearchRight,
    TopNavBar
  },
  props: {
    circRNA: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      FormData: {
        selectedRNA: this.circRNA.circRNA_id,
        selectedModel: "TransFusion"
      }
    };
  }
};
</script>

<style scoped>
.detail-circ-rna {
  display: flex;
}

.main-content {
  flex: 1;
}

.search-right {
  width: 300px;
}
</style>