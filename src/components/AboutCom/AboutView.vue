<template>
    <top-nav-bar :cur-id="4">

    </top-nav-bar>
    <div class="container">
        <el-row :gutter="20">
            <!-- 左侧信息面板 -->
            <el-col :span="8">
                <el-card class="box-card info-panel">
                    <div class="entity-header">
                        <h3 class="entity-title">关于我们</h3>
                    </div>
                    <el-divider></el-divider>
                    <div class="statistics-grid">
                        <div class="stat-item">
                            <div class="stat-label
                            ">联系我们</div>
                            <div class="stat-value
                            ">Email:</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <!-- 右侧分析面板 -->
        </el-row>
    </div>

</template>
<script>
import TopNavBar from '@/components/TopNavBar.vue'
export default {
  components: {
    TopNavBar
  },
  
}
</script>