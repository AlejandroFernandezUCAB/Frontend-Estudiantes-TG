<template>
  <v-form ref="form" @submit.prevent="login">
    <h2 class>Please sign in</h2>
    <v-alert type="error" v-if="error">{{ error }}</v-alert>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            :rules="nameRules"
            v-model="username"
            type="email"
            label="Username"
            required
            autofocus
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
        <v-btn class="mr-4" type="submit">Sign in</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: false,
      show1: false,
      password: "Password",
      nameRules: [v => !!v || "Name is required"],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
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
      this.$http
        .post("/jwt-auth/v1/token", {
          username: this.username,
          password: this.password
        })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed());
    },
    loginSuccessful(req) {
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
    loginFailed() {
      this.error = "Login failed!";
      this.$store.dispatch("logout");
      delete localStorage.token;
      delete localStorage.username;
      delete localStorage.email;
    }
  }
};
</script>

<style lang="css">
.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
