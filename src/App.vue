<template>
  <router-view />
</template>
<script>
// import {router} from './router'
import router from './router'
export default {
  name: 'App',
  router
}
</script>

<!-- 
<script>
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'

import ShowCase from './components/ShowCase'

import SearchVue from './components/SearchVue.vue'

import DetailView from './components/DetailView.vue'

const routes = [
  {path: '/detail', component: DetailView},
  { path: '/', component: HomePage },
  { path: '/showcase', component: ShowCase },
  { path: '/search', component: SearchVue }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
</script> -->

<style>

body{
  /* background-image: url(../public/pic/xin.jpg); */
  /* background: linear-gradient(#ced2d26a , rgba(95, 110, 110, 0.192)) ;
   */
   
   /* background: linear-gradient(to right, #1c92d2, #f2fcfe);  */
  /* background: linear-gradient(rgba(0, 0, 0, 0.078), rgba(66, 66, 66, 0.111)); */
   font-size: medium;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
  
}

</style>
