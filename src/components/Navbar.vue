<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        <v-btn text>
          <router-link to="/home" class="btn btn-logout btn-sm">home</router-link>
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>
          <router-link to="/courses" class="btn btn-logout btn-sm">Cursos</router-link>
        </v-btn>
        <template v-if="currentUser">
          <v-btn text>
            <router-link to="/edit" class="btn btn-logout btn-sm">Editar Usuario</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/my-courses" class="btn btn-logout btn-sm">Mis Cursos</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/lesson" class="btn btn-logout btn-sm">Lecciones</router-link>
          </v-btn>
          <span class="navbar-text">
            {{ currentUser.email }}
            <v-btn text>
              <router-link to="/logout" class="btn btn-logout btn-sm">Logout</router-link>
            </v-btn>
          </span>
        </template>
        <template v-if="!currentUser">
          <v-btn text>
            <router-link to="/Login" class="btn btn-logout btn-sm">Login</router-link>
          </v-btn>
          <v-btn text>
            <router-link to="/Sign-Up" class="btn btn-logout btn-sm">Sign Up</router-link>
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>



<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  }
};
</script>

