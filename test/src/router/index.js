import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Create from '../components/create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
	{
		path:'/create',
		name: 'create',
		component:Create
	}
]

const router = new VueRouter({
  routes
})

export default router
