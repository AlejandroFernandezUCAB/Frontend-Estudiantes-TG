<template>
  <div class>
    <form class="form-signin" @submit.prevent="edit">
      <h2 class="form-signin-heading">Edit User Data</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputUsuario" class>Nombre Usuario</label>
      <input
        disabled
        v-model="dataUser.name"
        type="text"
        id="inputUsuario"
        class="form-control"
        required
        autofocus
      />
      <label for="inputEmail" class>Email</label>
      <input
        disabled
        v-model="dataUser.email_usuario"
        type="text"
        id="inputEmail"
        class="form-control"
        required
        autofocus
      />
      <label for="inputName" class>Nombre</label>
      <input
        v-model="dataUser.nombre"
        type="text"
        id="inputName"
        class="form-control"
        placeholder="Nombre"
        required
        autofocus
      />
      <label for="inputApellido" class>Apellido</label>
      <input
        v-model="dataUser.apellido"
        type="text"
        id="inputApellido"
        class="form-control"
        placeholder="Apellido"
        required
        autofocus
      />

      <label for="inputUni" class>Compania/Universidad</label>
      <input
        v-model="dataUser.compania_universidad"
        type="text"
        id="inputUni"
        class="form-control"
        required
        autofocus
      />
      <label for="inputProfesion" class>Profesion</label>
      <input
        v-model="dataUser.profesion"
        type="text"
        id="inputProfesion"
        class="form-control"
        required
        autofocus
      />
      <label for="inputPais" class>Pais</label>
      <input
        v-model="dataUser.pais"
        type="text"
        id="inputPais"
        class="form-control"
        required
        autofocus
      />

      <label for="inputImagen" class>Imagen</label>
      <input
        v-model="dataUser.imagen_usuario.guid"
        type="text"
        id="inputImagen"
        class="form-control"
        required
        autofocus
      />

      <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Edit",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    this.checkCurrentLogin();
    this.getData();
  },
  updated() {
    this.checkCurrentLogin();
  },
  data() {
    return {
      dataUser: {
        id: "",
        name: "",
        nombre: "",
        apellido: "",
        email_usuario: "",
        compania_universidad: "",
        profesion: "",
        pais: "",
        imagen_usuario: ""
      },
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
      // Se obtiene la data del usuario segun el token se inicio de sesion
      this.$http
        .get("/wp/v2/users/me")
        .then(request => {
          this.dataUser = request.data;
          console.log(request);
          console.log(request.data.imagen_usuario);
        })
        .catch(error => console.log(error));
    },
    edit() {
      this.$http
        .post("/wp/v2/users/" + this.dataUser.id, {
          nombre: this.dataUser.nombre,
          apellido: this.dataUser.apellido,
          compania_universidad: this.dataUser.compania_universidad,
          profesion: this.dataUser.profesion,
          pais: this.dataUser.pais
        })
        .then(request => this.EditSuccessful(request))
        .catch(() => this.EditFailed());
    },
    EditSuccessful(req) {
      // Se actualiza la pagina
      this.$router.go();
    },
    EditFailed() {
      this.error = "Edit failed!";
    }
  }
};
</script>
