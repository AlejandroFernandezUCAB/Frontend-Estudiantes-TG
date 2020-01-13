import Vue from "vue";
import Router from "vue-router";
import Hello from "@/components/Hello";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import CreateUser from "@/components/Sign-Up";
import Edit from "@/components/Edit-User";
import Lesson from "@/components/Lesson";
import SingleLesson from "@/components/SingleLesson";
import Courses from "@/components/Courses";
import GetCourses from "@/components/GetCourses";
import MyCourses from "@/components/MyCourses";
import SingleCourses from "@/components/SingleCourses";
import Evaluation from "@/components/Evaluation";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Home",
      component: Hello
    },
    {
      path: "/edit",
      name: "Edit",
      component: Edit
    },
    {
      path: "/sign-up",
      name: "Sign-Up",
      component: CreateUser
    },
    {
      path: "/courses",
      name: "Courses",
      component: Courses
    },
    {
      path: "/courses/:id",
      name: "GetCourses",
      component: GetCourses
    },
    {
      path: "/my-courses",
      name: "MyCourses",
      component: MyCourses
    },
    {
      path: "/my-courses/:id",
      name: "SingleCourses",
      component: SingleCourses
    },
    {
      path: "/lesson",
      name: "Lesson",
      component: Lesson
    },
    {
      path: "/lesson/:id",
      name: "SingleLesson",
      component: SingleLesson
    },
    {
      path: "/lesson/:idLesson/:idEvaluation",
      name: "Evaluation",
      component: Evaluation
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
});
