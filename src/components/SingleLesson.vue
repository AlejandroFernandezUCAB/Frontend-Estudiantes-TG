<template>
  <div class>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <div v-if="find">
      <p>Este es el nombre de la lesson {{ list.nombre }}</p>
      <div v-html="list.informacion"></div>
      <video
        v-if="list.video"
        ref="videoRef"
        :src="list.video.guid"
        id="video-container"
        width="50%"
        controls
        controlslist="nodownload"
      ></video>
      <div v-if="list.evaluacion">
        <v-btn color="warning" dark v-on:click="user_inscribed"
          >Presentar evaluacion --
          {{ list.evaluacion[0].puntaje_evaluacin }} Ptos</v-btn
        >
      </div>
    </div>
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
      find: false,
      list: [],
      msg: false,
      evaluation: false,
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
          this.find = true;
          console.log(request);
        })
        .catch(error => (this.msg = "No se ha encontrado la leccion"));
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
