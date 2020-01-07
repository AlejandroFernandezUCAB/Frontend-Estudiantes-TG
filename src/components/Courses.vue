<template>
  <div class>
    <ul>
      <li v-for="course in list">
        <router-link v-bind:to="'/courses/'+course.id">{{course.id}} -- {{course.nombre}}</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Course",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  mounted() {
    this.validateCoursesInscribed();
    // this.getData();
  },
  data() {
    return {
      courses_inscribed: [],
      list: [],
      error: false
    };
  },
  methods: {
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
          console.log(request.data);
          this.SearchSuccessful(request);
          // this.list = request.data;
        })
        .catch(error => console.log(error));
    },

    SearchSuccessful(request) {
      var i;
      var j;
      var find = false;
      var data = request.data;
      var inscribed = this.courses_inscribed;

      for (i = 0; i < data.length; i++) {
        for (j = 0; j < inscribed.length; j++) {
          find = false;
          if (data[i].id == inscribed[j].id_curso) {
            find = true;
            break;
          }
        }
        if (!find) {
          this.list.push(request.data[i]);
        }
      }
      this.error = "No se encuentra inscrito en el curso solicitado";
    }
  }
};
</script>
