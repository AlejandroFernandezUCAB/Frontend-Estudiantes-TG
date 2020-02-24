<template>
  <div>
    <v-toolbar
        app
        color="primary"
        dark
    >
      <v-app-bar-nav-icon color="black" @click="menu=!menu"></v-app-bar-nav-icon>
      
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

      <div>
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

    </v-toolbar>
    <v-container>
      <v-navigation-drawer app v-model="menu" color="primary">
        asdasdas
      </v-navigation-drawer>
    </v-container>
    </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      menu:false
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>

<style>

</style>