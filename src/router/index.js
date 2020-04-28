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
import MyBadges from "../views/MyBadges.vue"
import Course from "../views/Course.vue"
import Courses from "../views/Courses.vue";
import Learn from "../views/Learn.vue"
import Leccion from "../views/Leccion.vue"
import StripePayment from "../views/StripePayment.vue"
import test from "../views/test.vue";


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
    path:'/mis-medallas',
    name: 'My Badges',
    component:MyBadges
  },
  {
    path:"/catalogo/cursos/categorias/:idCategoria",
    name:"Cursos",
    component:Courses
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
    path: '/cursos/:idCurso/leccion/:idLeccion/aprender',
    component:Leccion
  },
  {
    path:'/stripePayment/:idCurso/:monto',
    name: 'Stripe Payment',
    component:StripePayment
  },
  {
    path:'/test',
    component:test
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : routes
})

export default router
