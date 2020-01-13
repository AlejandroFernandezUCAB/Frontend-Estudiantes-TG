<template>
  <div class>
    <div v-if="find">
      <p>Este es el nombre del Curso {{list.nombre}}</p>
      <h2>Lecciones</h2>
      <!-- Se recorre los modulos que tiene el curso para mostrar las lecciones que posee -->
      <template v-for="element in module">
        <ul v-for="lesson in element.leccion" v-bind:key="lesson.id">
          <li>{{lesson.id}} -- {{lesson.post_title}}</li>
        </ul>
      </template>
      <v-btn color="warning" dark v-on:click="user_inscribed">Inscribirse</v-btn>
    </div>
    <div v-else>
      {{ error }}
      <router-link v-if="error" v-bind:to="'/my-courses/'+this.id">Ir</router-link>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "GetCourse",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  mounted() {
    this.validateCoursesInscribed();
    this.getData();
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  data() {
    return {
      find: false,
      list: [],
      module: [],
      validate: false,
      error: "",
      id: this.$route.params.id
    };
  },
  methods: {
    validateCoursesInscribed() {
      // Se valida que el curso solicitado existe, y de ser asi, si se encuentra ya inscrito
      this.$http
        .get("my_rest_server/v1/user-by-course?course=" + this.id)
        .then(request => {
          // console.log(request);
          this.courses_inscribed = request.data;
          this.getData();
        })
        .catch(error => this.SearchFailed());
    },
    user_inscribed() {
      this.$http
        .post("/my_rest_server/v1/user-inscribed", {
          username: localStorage.username,
          courseID: this.list.id
        })
        .then(request => {
          console.log(request);
          this.$router.push("/my-courses");
        })
        .catch(error => this.SearchFailed());
    },
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    },
    getData() {
      this.$http
        .get("/wp/v2/curso/" + this.id)
        .then(request => {
          console.log(request);
          this.SearchSuccessful(request);
        })
        .catch(error => this.SearchFailed());
    },
    SearchSuccessful(request) {
      // Si ya esta inscrito le muestra un msje, si no, le permite inscribirse en el curso
      if (this.courses_inscribed.length == 0) {
        this.list = request.data;
        this.module = request.data.modulo;
        this.find = true;
      } else {
        this.error = "Se encuentra inscrito en el curso solicitado";
      }
    },
    SearchFailed() {
      this.error = "El curso solicitado no existe";
    }
  }
};
</script>
