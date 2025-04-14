import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'

// import ShowCase from '../components/ShowCase'
import DownloadView from '@/components/DownloadCom/DownloadView.vue'
import SearchVue from '../components/SearchVue.vue'
import BrowserView from '@/components/BrowserView.vue'

import DetailCircRNA from '@/components/DetailCom/DetailCircRNA.vue'
import DetailMiRNA from '../components/DetailCom/DetailMiRNA.vue'
import ToolView from '@/components/ToolCom/ToolView.vue'
import AboutView from '@/components/AboutCom/AboutView.vue'
// import DetailView from '../components/DetailView.vue'
import DetailView from '@/components/DetailViewOLD.vue'
const routes = [
  {path: '/tool', component: ToolView},
  {path: '/detail/circRNA', component: DetailCircRNA},
  {path: '/detail', component: DetailView},
  
  {path: '/detail/miRNA', component: DetailMiRNA},
  { path: '/', component: HomePage },
  // { path: '/showcase', component: ShowCase },
  { path: '/search', component: SearchVue },
  {path: '/browser', component: BrowserView},
  {path: '/download', component: DownloadView},
  {path: '/about', component: AboutView},
  {
    path: '/disease-analysis',
    component: () => import('../components/TopCom/DiseaseCircRelation.vue')
  },
  {
    path: "/top",
    component: () => import('../components/TopCom/TopView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
