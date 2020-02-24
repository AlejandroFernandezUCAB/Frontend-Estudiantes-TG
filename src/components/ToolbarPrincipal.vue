<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="UCAB lOGO"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="200"
          src="https://du.ucab.edu.ve/images/LogoUCAB600x123.png"
          width="255"
        />
      </div>

      <v-spacer></v-spacer>
      
      <v-btn icon color="black">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <div v-if="!currentUser">
        <router-link to="/login">
          <v-btn
            target="_blank"
            text
            color="black"
          >
            <span class="mr-2">Iniciar sesión</span>
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </router-link>
        
        <router-link to="/signup">
        <v-btn
          target="_blank"
          text
          color="black"
        >
          <span class="mr-2">Regístrate</span>
          <v-icon>mdi-pencil-box-outline</v-icon>
        </v-btn>
        </router-link>
      </div>

      <div v-if="currentUser">
        <router-link to="/perfil">
          <v-btn
            target="_blank"
            text
            color="black"
          >
            <span class="mr-2">Mi Perfil</span>
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </router-link>
        
        <router-link to="/mis-cursos">
        <v-btn
          target="_blank"
          text
          color="black"
        >
          <span class="mr-2">Mis Cursos</span>
          <v-icon>mdi-pencil-box-outline</v-icon>
        </v-btn>
        </router-link>
      </div>
    </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Some Default Title';
    },
  }
};
</script>