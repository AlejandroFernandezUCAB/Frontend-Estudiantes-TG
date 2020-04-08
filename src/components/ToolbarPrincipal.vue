<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="UCAB lOGO"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="200"
            src="https://du.ucab.edu.ve/images/LogoUCAB600x123.png"
            width="255"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      
      <v-btn icon color="black">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      
      <router-link to="/">
        <v-btn
          target="_blank"
          text
          color="black"
        >
          <span class="mr-2">Inicio</span>

        </v-btn>
      </router-link>
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            target="_blank"
            text
            color="black"
            v-on="on"
          >
            <span class="mr-2">Cursos</span>
            <v-icon>mdi-notebook-outline</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(categoria, index) in categorias"
            :key="index"
          >
              <v-btn
                target="_blank"
                text
                color="black"
              >
                <v-list-item-title @click="irACategoria(categoria.id)">{{ categoria.name }}</v-list-item-title>
              </v-btn>

          </v-list-item>
        </v-list>
      </v-menu>

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
        <v-btn
          target="_blank"
          text
          color="black"
        >
          <span class="mr-2">Cerrar Sesión</span>
          <v-icon>mdi-close-box-outline</v-icon>
        </v-btn>

      </div>
    </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  name: 'App',
  computed(){

  },
  created(){
    this.obtenerCategorias();
  },
  components: {
    
  },
  data: () => ({
     items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      categorias:[]
  }),
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Some Default Title';
    },
  },
  methods:{
    irACategoria( idCategoria ){
        this.$router.push("/catalogo/cursos/categorias/"+idCategoria);
        this.$router.go();
    },
    obtenerCategorias(){
      this.$http
        .get("wp/v2/categories/")
        .then(request => {
          this.categorias = request.data;
          console.log(this.categorias);
        })
        .catch(() => {

         });
    },
  }
};
</script>