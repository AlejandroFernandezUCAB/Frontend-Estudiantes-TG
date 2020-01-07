<template>
  <div class>
    <p>Este es el nombre de la lesson {{list.nombre}}</p>
    <div v-html="list.informacion"></div>
    <video
      v-if="list.video.guid"
      ref="videoRef"
      :src="list.video.guid"
      id="video-container"
      width="50%"
      controls
      controlslist="nodownload"
    ></video>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "SingleLesson",
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
      id: this.$route.params.id
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
        .get("/wp/v2/leccion/" + this.id)
        .then(request => {
          this.list = request.data;
          console.log(request);
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

