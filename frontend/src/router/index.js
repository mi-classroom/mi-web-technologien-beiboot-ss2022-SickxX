import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//import ImageView from '../views/ImageView.vue'
import ImageComponent from '../components/ImageComponent'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/image/:id',
    name: 'image',
    component: ImageComponent, //ImageView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
