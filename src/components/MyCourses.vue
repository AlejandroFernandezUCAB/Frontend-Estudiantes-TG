<template>
  <div class>
    <H1>Mis cursos</H1>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <ul>
      <li v-for="courses in list">
        <router-link
          v-bind:to="'/my-courses/'+courses.id"
        >{{courses.id}} -- {{courses.title.rendered}}</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "MyCourses",
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
      error: false,
      msg: false
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
        .get(
          "my_rest_server/v1/user-inscribed?username=" + localStorage.username
        )
        .then(request => {
          console.log(request);
          this.courses_inscribed = request.data;
          this.getData();
        })
        .catch(error => this.SearchFailed());
    },
    getData() {
      this.$http
        .get("/wp/v2/curso")
        .then(request => {
          // console.log(request.data);
          this.SearchSuccessful(request);
        })
        .catch(error => console.log(error));
    },
    edit() {},
    SearchSuccessful(request) {
      var i;
      var j;
      var data = request.data;
      var inscribed = this.courses_inscribed;

      for (i = 0; i < data.length; i++) {
        for (j = 0; j < inscribed.length; j++) {
          if (data[i].id == inscribed[j].id_curso) {
            console.log("entre");
            this.list.push(request.data[i]);
          }
        }
      }

      if (this.list.length == 0) {
        this.msg = "No tiene cursos";
      }
    }
  }
};
</script>
