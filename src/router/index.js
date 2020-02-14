import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Perfil from '../views/Perfil.vue'
import Evaluacion from '../views/Evaluacion.vue'
import Carrusel from "../components/Carrusel.vue";
import CarruselVistoEstudiantes from "../components/CarruselVistoEstudiantes.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Sign-Up.vue"
import MyCourses from "../views/MyCourses.vue"
import Course from "../views/Course.vue"
import Learn from "../views/Learn.vue"
import Leccion from "../views/Leccion.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta:{
      title: 'Perfil del estudiante',
    }
  },
  {
    path: '/evaluacion',
    name: 'Evaluacion',
    component: Evaluacion
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/carrusel',
    name: 'carrusel',
    component: Carrusel
  },
  {
    path: '/carrusel-visto-estudiantes',
    name: 'carrusel-visto-estudiantes',
    component: CarruselVistoEstudiantes
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path :'/signup',
    name: 'signup',
    component: Signup
  },
  {
    path:'/mis-cursos',
    name: 'My Courses',
    component:MyCourses
  },
  { 
    path: '/cursos/:id', 
    component: Course
  },
  {
    path: '/cursos/:id/aprender/',
    component:Learn
  },
  {
    path: '/cursos/:idCurso/aprender/leccion/:idLeccion',
    component:Leccion
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
