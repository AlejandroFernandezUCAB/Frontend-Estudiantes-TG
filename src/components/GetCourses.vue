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
    <div v-if="inscribed">
      {{ error }}
      <router-link v-if="error" v-bind:to="'/my-courses/'+this.id">Ir</router-link>
    </div>
    <div v-if="notFind">{{ error }}</div>
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
      inscribed: false,
      find: false,
      notFind: false,
      list: [],
      module: [],
      validate: false,
      error: "",
      id: this.$route.params.id
    };
  },
  methods: {
    validateCoursesInscribed(req) {
      // Se valida que el curso solicitado existe, y de ser asi, si se encuentra ya inscrito el usuario
      this.$http
        .post("my_rest_server/v1/user-by-course", {
          user: localStorage.username,
          course: this.id
        })
        .then(request => {
          // console.log(request);
          this.courses_inscribed = request.data;
          this.SearchSuccessful(req);
          // this.getData();
        });
    },
    user_inscribed() {
      this.$http
        .post("/my_rest_server/v1/user-inscribed", {
          username: localStorage.username,
          courseID: this.list.id
        })
        .then(request => {
          // console.log(request);
          this.$router.push("/my-courses");
        })
        .catch(error => this.SearchFailed());
    },
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/login");
      }
    },
    getData() {
      // Se busca el curso solicitado para ver si existe
      this.$http
        .get("/wp/v2/curso/" + this.id)
        .then(request => {
          // console.log(request);
          this.validateCoursesInscribed(request);
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
        this.inscribed = true;
      }
    },
    SearchFailed() {
      this.notFind = true;
      this.error = "El curso solicitado no existe";
    }
  }
};
</script>
