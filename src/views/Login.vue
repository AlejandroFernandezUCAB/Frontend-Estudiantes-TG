<template >
    <v-container class="background-img" fill-height fluid>
      <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col 
                cols="9"
                xs="7"
                md="7"
                sm="9"
                lg="6"
                xl="7"
                offset="2"
                offset-xs="5"
                offset-md="2"
                offset-sm="2"
                offset-xl="2"
                offset-lg="3"
                class="background-form my-10"
                align="center"
                justify="center"
            >
            <h1 class="display-1 py-10">Iniciar sesión</h1>
            <v-form
                @submit.prevent="login"
                ref="form"
                lazy-validation
                class="px-7 py-5"
            >
                <v-text-field
                v-model="username"
                :rules="nameRules"
                label="Nombre de usuario"
                required
                color="success"
                autofocus
                ></v-text-field>


                <v-text-field
                    :append-icon="showContrasena ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showContrasena ? 'text' : 'password'"
                    counter
                    @click:append="showContrasena = !showContrasena"
                    v-model="contrasena"
                    :rules="[rules.required, rules.min]"
                    label="Contraseña"
                    required
                    color="success"
                ></v-text-field>

                <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="¿Recordar contraseña?"
                required
                ></v-checkbox>

                <v-btn
                color="success"
                class="mr-4"
                @click="reset"
                >
                Olvíde la contraseña
                </v-btn>

                <v-btn
                    color="verde"
                    type="submit"                
                >
                    <span class="font-color">Ingresar</span>
                </v-btn>
            </v-form>
            <v-snackbar
                v-model="snackbar"
                >
                {{snackbartext}}
                <v-btn
                    light
                    color="error"
                    text
                    @click="snackbar = false"
                >
                    Cerrar
                </v-btn>
            </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ToolbarPrincipal from "../components/ToolbarPrincipal"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      error: false,
      showContrasena: false,
      contrasena: "",
      snackbar:false,
      snackbartext:"El nombre de usuario y la contraseña no coinciden.",
      nameRules: [v => !!v || "El nombre de usuario es requerido"],
      rules: {
        required: value => !!value || "Obligatorio",
        min: v => v.length >= 8 || "Minimo 8 caracteres"
      }
    };
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  methods: {
    checkCurrentLogin() {
      // Verifica si el usuario se encuentra login, de no ser asi, lo redirige al home
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || "/");
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login() {
      // Se obtiene el token de usuario en base a las credenciales ingresadas
      this.$http
        .post("https://aquilesypedrotesis.host/wp-json/jwt-auth/v1/token", {
          username: this.username,
          password: this.contrasena
        })
        .then(request => this.loginExitoso(request))
        .catch(() => this.loginFallido());
    },
    loginExitoso(req) {
      // Si el login es correcto, se guardan en variables locales para usarlas mientras el usuario este login
      if (!req.data.token) {
        this.loginFailed();
        return;
      }
      this.error = false;
      localStorage.token = req.data.token;
      localStorage.email = req.data.user_email;
      localStorage.username = req.data.user_nicename;
      this.$store.dispatch("login");
      this.$router.go();
      this.$router.replace(this.$route.query.redirect || "/");
    },
    loginFallido() {
      this.snackbar = true;
      this.$store.dispatch("logout");
      delete localStorage.token;
      delete localStorage.username;
      delete localStorage.email;
    }
  },
  components:{
    ToolbarPrincipal
  }
};
</script>

<style>
    .background-img{
        background-image: url("../assets/fondo.jpg")
    }
    .background-form{
        background-color: #E6E6E6;
        border-radius: 20px;
    }
    .font-color{
        color: white;
    }
</style>