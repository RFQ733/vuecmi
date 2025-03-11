<template>
  <top-nav-bar :curId="6">

  </top-nav-bar>
  <div class="container main-content">
    <div class="chart-container">
      <el-card class="box-card">
        <template #header>
          <div class="clearfix">
            <el-link type="primary" :underline="false" class="title-link">
              <i class="el-icon-download"></i>
              数据集下载中心
            </el-link>
          </div>
        </template>

        <el-row :gutter="20">
          <el-col :span="8" v-for="(category, index) in downloadCategories" :key="index">
            <el-card class="category-card">
              <template #header>
                <div class="category-header">
                  <span class="category-title">{{ category.title }}</span>
                  <el-tag type="info" effect="dark">{{ category.items.length }}个文件</el-tag>
                </div>
              </template>
              
              <div class="download-item" v-for="item in category.items" :key="item.name">
                <div class="file-info">
                  <span class="file-name">{{ item.name }}</span>
                  <span class="file-format">{{ item.format }}</span>
                </div>
                <el-button 
                  type="primary" 
                  size="mini" 
                  @click="downloadFile(item)"
                  icon="el-icon-download">
                  下载
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import TopNavBar from '@/components/TopNavBar.vue'
export default {
  components: {
    TopNavBar
  },
  data() {
    return {
      downloadCategories: [
        {
          title: '核心数据集',
          description: '主要研究数据文件',
          items: [
            { name: 'circRNA全集', format: 'CSV', size: '2.1GB', path: '/data/circRNA_full.zip' },
            { name: 'miRNA交互数据', format: 'JSON', size: '850MB', path: '/data/miRNA_interactions.zip' }
          ]
        },
        {
          title: '分析结果',
          description: '统计分析输出文件',
          items: [
            { name: '差异表达分析', format: 'XLSX', size: '350MB', path: '/data/DE_analysis.zip' },
            { name: '通路富集结果', format: 'PDF', size: '120MB', path: '/data/pathway_enrichment.zip' }
          ]
        },
        {
          title: '可视化数据',
          description: '图表原始数据文件',
          items: [
            { name: '网络关系图数据', format: 'GEXF', size: '680MB', path: '/data/network_graph.zip' },
            { name: '热图矩阵数据', format: 'CSV', size: '410MB', path: '/data/heatmap_matrix.zip' }
          ]
        }
      ]
    }
  },
  methods: {
    downloadFile(item) {
      // 实现下载逻辑
      console.log('Downloading:', item.path)
      // 实际项目中这里应调用下载API
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.box-card {
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.title-link {
  font-size: 24px;
  color: #409EFF;
}

.category-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-title {
  font-size: 16px;
  color: #606266;
}

.download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}

.file-name {
  color: #303133;
  font-size: 14px;
}

.file-format {
  color: #909399;
  font-size: 12px;
  margin-left: 8px;
}
</style>
