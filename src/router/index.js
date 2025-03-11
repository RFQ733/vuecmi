import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'

// import ShowCase from '../components/ShowCase'

import SearchVue from '../components/SearchVue.vue'
import BrowserView from '@/components/BrowserView.vue'
import DetailView from '../components/DetailView.vue'

const routes = [
  {path: '/detail', component: DetailView},
  { path: '/', component: HomePage },
  // { path: '/showcase', component: ShowCase },
  { path: '/search', component: SearchVue },
  {path: '/browser', component: BrowserView}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router