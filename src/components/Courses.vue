<template>
  <div class>
    <ul>
      <!-- Se muestra la lista de los cursos que se tienen  -->
      <li v-for="course in list" v-bind:key="course.id">
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
    // this.validateCoursesInscribed();
    this.getData();
  },
  data() {
    return {
      // courses_inscribed: [],
      list: []
    };
  },
  methods: {
    // validateCoursesInscribed() {
    //     // Se busca los cursos a los cuales esta inscrito el usuario
    //     this.$http
    //       .get(
    //         "my_rest_server/v1/user-inscribed?username=" + localStorage.username
    //       )
    //       .then(request => {
    //         console.log(request);
    //         this.courses_inscribed = request.data;
    //         this.getData();
    //       })
    //       .catch(error => console.log(error));

    // },
    getData() {
      // Se buscan todos los cursos
      this.$http
        .get("/wp/v2/curso")
        .then(request => {
          // console.log(request);
          this.list = request.data;
          // this.list = request.data;
        })
        .catch(error => console.log(error));
    }

    // SearchSuccessful(request) {
    //   // Se valida que el usuario ya este inscrito en algun curso, de ser asi no se muestra en la lista de cursos
    //   var i;
    //   var j;
    //   var find = false;
    //   var data = request.data;
    //   var inscribed = this.courses_inscribed;

    //   for (i = 0; i < data.length; i++) {
    //     for (j = 0; j < inscribed.length; j++) {
    //       find = false;
    //       if (data[i].id == inscribed[j].id_curso) {
    //         find = true;
    //         break;
    //       }
    //     }
    //     if (!find) {
    //       this.list.push(request.data[i]);
    //     }
    //   }
    // }
  }
};
</script>
