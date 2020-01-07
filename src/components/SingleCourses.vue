<template>
  <div class>
    <div v-if="validate">
      <p>Este es el nombre del Curso {{list.nombre}}</p>
      <h2>Lecciones</h2>
      <template v-for="element in module">
        <ul v-for="lesson in element.leccion">
          <li>
            <router-link v-bind:to="'/lesson/'+lesson.id">{{lesson.id}} -- {{lesson.post_title}}</router-link>
          </li>
        </ul>
      </template>
    </div>
    <div v-else>{{ error }}</div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "SingleCourse",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  mounted() {
    this.validateCoursesInscribed();
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  data() {
    return {
      list: [],
      courses_inscribed: [],
      module: [],
      validate: false,
      error: "",
      id: this.$route.params.id
    };
  },
  methods: {
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    },
    validateCoursesInscribed() {
      this.$http
        .get("my_rest_server/v1/user-by-course?course=" + this.id)
        .then(request => {
          // console.log(request);
          this.courses_inscribed = request.data;
          this.getData();
        })
        .catch(error => this.SearchFailed());
    },
    getData() {
      this.$http
        .get("/wp/v2/curso/" + this.id)
        .then(request => {
          // console.log(request);
          this.SearchSuccessful(request);
        })
        .catch(error => this.SearchFailed());
    },
    SearchSuccessful(request) {
      if (this.courses_inscribed.length == 0) {
        this.error = "No se encuentra inscrito en el curso solicitado";
      } else {
        this.list = request.data;
        this.module = request.data.modulo;
        this.validate = true;
      }
    },
    SearchFailed() {
      this.error = "El curso solicitado no existe";
    }
  }
};
</script>
