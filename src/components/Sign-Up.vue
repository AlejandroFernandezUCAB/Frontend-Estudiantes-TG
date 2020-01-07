<template>
  <div class>
    <form class="form-signin" @submit.prevent="register">
      <h2 class="form-signin-heading">Sign Up</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputUsuario" class>Nombre Usuario</label>
      <input
        v-model="username"
        type="text"
        id="inputUsuario"
        class="form-control"
        placeholder="Username"
        required
        autofocus
      />
      <label for="inputEmail" class>Email</label>
      <input
        v-model="email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email"
        required
        autofocus
      />
      <label for="inputName" class>Nombre</label>
      <input
        v-model="nombre"
        type="text"
        id="inputName"
        class="form-control"
        placeholder="Nombre"
        required
        autofocus
      />
      <label for="inputApellido" class>Apellido</label>
      <input
        v-model="apellido"
        type="text"
        id="inputApellido"
        class="form-control"
        placeholder="Apellido"
        required
        autofocus
      />

      <label for="inputUni" class>Compania/Universidad</label>
      <input
        v-model="compania_universidad"
        type="text"
        id="inputUni"
        class="form-control"
        required
        autofocus
      />
      <label for="inputProfesion" class>Profesion</label>
      <input
        v-model="profesion"
        type="text"
        id="inputProfesion"
        class="form-control"
        required
        autofocus
      />
      <label for="inputPais" class>Pais</label>
      <input v-model="pais" type="text" id="inputPais" class="form-control" required autofocus />

      <label for="inputImagen" class>Imagen</label>
      <input
        v-model="imagen_usuario"
        type="text"
        id="inputImagen"
        class="form-control"
        required
        autofocus
      />
      <label for="inputPassword" class>Password</label>
      <input
        v-model="password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />

      <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sign-Up",

  mounted() {
    // this.getToken();
  },
  created() {},
  data() {
    return {
      username: "",
      email: "",
      nombre: "",
      apellido: "",
      compania_universidad: "",
      profesion: "",
      pais: "",
      imagen_usuario: "",
      password: "",
      error: false
    };
  },
  methods: {
    getToken() {
      this.$http
        .post("/jwt-auth/v1/token", {
          username: "aquilesal",
          password: "24455313"
        })
        .then(request => this.success(request))
        .catch(error => error);
    },
    success(req) {
      localStorage.token = req.data.token;
    },
    successUser(req) {
      localStorage.token = req.data.token;
      localStorage.email = this.email;
      localStorage.username = this.username;
      this.$router.push("/");
    },
    register() {
      this.$http
        .post("/wp/v2/users", {
          username: this.username,
          email: this.email,
          nombre: this.nombre,
          apellido: this.apellido,
          compania_universidad: this.compania_universidad,
          profesion: this.profesion,
          pais: this.pais,
          imagen_usuario: this.imagen_usuario,
          password: this.password,
          roles: "estudiante",
          email_usuario: this.email
        })
        .then(request => this.SignUpSuccessful(request))
        .catch(() => this.SignUpFailed());
    },
    SignUpSuccessful(req) {
      // this.tokenUser();
      this.$router.push("/login");
    },
    tokenUser() {
      this.$http
        .post("/jwt-auth/v1/token", {
          username: this.username,
          password: this.password
        })
        .then(request => this.successUser(request))
        .catch(error => error);
    },
    SignUpFailed() {
      this.error = "Sign Up failed!";
    }
  }
};
</script>
