<template>
  <div class>
    <ul>
      <li v-for="lesson in list">
        <router-link v-bind:to="'/lesson/'+lesson.id">{{lesson.id}} -- {{lesson.nombre}}</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Lesson",
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
      error: false
    };
  },
  methods: {
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    },
    getData() {
      this.$http
        .get("/wp/v2/leccion")
        .then(request => {
          this.list = request.data;
          console.log(this.list);
        })
        .catch(error => console.log(error));
    },
    edit() {},
    EditSuccessful(req) {
      this.$router.go();
    },
    EditFailed() {
      this.error = "Edit failed!";
    }
  }
};
</script>
