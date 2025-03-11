import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'

// import ShowCase from '../components/ShowCase'
import DownloadView from '@/components/DownloadCom/DownloadView.vue'
import SearchVue from '../components/SearchVue.vue'
import BrowserView from '@/components/BrowserView.vue'
import DetailView from '../components/DetailView.vue'
import DetailCircRNA from '@/components/DetailCom/DetailCircRNA.vue'
import DetailMiRNA from '../components/DetailCom/DetailMiRNA.vue'
import ToolView from '@/components/ToolCom/ToolView.vue'
const routes = [
  {path: '/tool', component: ToolView},
  {path: '/detail/circRNA', component: DetailCircRNA},
  {path: '/detail', component: DetailView},
  {path: '/detail/miRNA', component: DetailMiRNA},
  { path: '/', component: HomePage },
  // { path: '/showcase', component: ShowCase },
  { path: '/search', component: SearchVue },
  {path: '/browser', component: BrowserView},
  {path: '/download', component: DownloadView}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router