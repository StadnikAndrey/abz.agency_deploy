import Vue from 'vue';
import VueRouter from 'vue-router';  

Vue.use(VueRouter);

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home     
  },   
  {
    path: '*',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from) {        
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.hash) {         
          resolve({
            selector: to.hash,
            offset: { x: 0, y: 65 },
            behavior: 'smooth'
          }); 
        } else {
          resolve({ x: 0, y: 0 });
        }         
      }, 700)
    })
  },
  routes
}) 

export default router