import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ShowCase from '../components/ShowCase.vue'
import SearchVue from '../components/SearchVue.vue'
import DetailView from '../components/DetailView.vue'
import BrowserView from '../components/BrowserView.vue'
const routes = [
  {path: '/detail', component: DetailView},
  { path: '/', component: HomePage },
  { path: '/showcase', component: ShowCase },
  { path: '/search', component: SearchVue },
  { path: '/browser', component: BrowserView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
