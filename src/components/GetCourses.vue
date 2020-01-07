<template>
  <div class>
    <p>Este es el nombre del Curso {{list.nombre}}</p>
    <h2>Lecciones</h2>
    <template v-for="element in module">
      <ul v-for="lesson in element.leccion">
        <li>{{lesson.id}} -- {{lesson.post_title}}</li>
      </ul>
    </template>
    <v-btn color="warning" dark v-on:click="user_inscribed">Inscribirse</v-btn>
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
      list: [],
      module: [],
      validate: false,
      error: "",
      id: this.$route.params.id
    };
  },
  methods: {
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
      this.list = request.data;
      this.module = request.data.modulo;
    },
    SearchFailed() {
      this.error = "El curso solicitado no existe";
    }
  }
};
</script>
