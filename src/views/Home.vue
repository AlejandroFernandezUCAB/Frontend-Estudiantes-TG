<template>

  <v-container fluid>

    <toolbar-principal></toolbar-principal>
    
    <v-row no-gutters v-if="!loading">
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card>
          <v-system-bar lights-out></v-system-bar>
          <v-carousel
            :continuous="false"
            :cycle="cycle"
            :show-arrows="true"
            hide-delimiter-background
            show-arrows-on-hover
            delimiter-icon="mdi-minus"
            height="300"
          >

            <v-carousel-item
              v-for="curso in cursosValorados"
              :key="curso.id"
              :src="curso.imagen_curso.guid"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3" >
                    <v-btn color="green" dark large @click="ingresarCurso(curso.id)">
                      {{ curso.nombre }}
                    </v-btn>
                  </div>
                </v-row>
            </v-carousel-item>
          </v-carousel>
          <v-list two-line>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
                <v-list-item-subtitle>Creador</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-title>Este curso es para los creadores de contenido</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col 
        class="py-5" 
        cols="12" 
        sm="12" 
        md="12" 
        lg="12">
        <v-row
          no-gutters 
          align="center"
          justify="center">
          <v-col 
            cols="4" 
            sm="12" 
            md="4" 
            lg="4" >
            <p class="text-center">
              <b>Los mejores cursos</b>
              <br>
              Puedes conseguirlos aquí
            </p>
          </v-col>
          <v-col 
            cols="8" 
            sm="12" 
            md="8" 
            lg="8">
            <carrusel 
              v-bind:categorias="{categorias}"
              v-bind:cursos="{cursos}"
              > 
            </carrusel>
          </v-col>
          <v-col
            class="pt-5"  
            cols="12" 
            sm="12" 
            md="12" 
            lg="12">
          <h2 class="headline">Lo más visto por nuestros estudiantes</h2>
            <carrusel-visto-estudiantes>
            </carrusel-visto-estudiantes>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
  </v-container>
</template>

<script>
import Carrusel from '../components/Carrusel.vue'
import CarruselVistoEstudiantes from "../components/CarruselVistoEstudiantes.vue";
import Categoria from "../models/Categoria";
import ToolbarPrincipal from "../components/ToolbarPrincipal";

export default {
  name: 'home',
  beforeCreate(){
    
  },
  created(){
    this.masValorados();
    this.cargarCategorias();
    this.cargarCursos();
  },
   data:() => ({
    colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
        ],
        cycle: false,
        masValoradosTotal:[],
        cursosValorados:[],
        slides: [
          'Primer curso',
          'Segundo Curso',
          'Tercer Curso',
          'Cuarto Curso',
          'Quinto Curso',
        ],
        tab: null,
        items: [
          'Programación', 'Cocina', 'Educación', 'Idiomas',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        categorias: [],
        cursos:[],
        loading: true
  }),
  methods: {
    
    masValorados(){
      console.log("entre")
       this.$http
        .post("my_rest_server/v1/valoration/getValorationAllCourses")
        .then(request => {
          this.masValoradosTotal= request.data;
          console.log(this.masValoradosTotal)
          this.cargarCursosValorados(this.masValoradosTotal);
        })
        .catch((error) => { console.log(error)});
    },
    cargarCursosValorados(valorados){
      console.log(valorados)
      let keys = Object.keys(valorados);
      keys.forEach(key => {
      let item = valorados[key];
      this.$http
        .get("wp/v2/curso/"+item.id_course)
        .then(request => {
          this.cursosValorados.push( request.data );
        })
        .catch((error) => { console.log(error)});
    })
      console.log(this.cursosValorados);
    },
     ingresarCurso (idCurso) {
            this.loading = true
            this.$router.push("/cursos/"+idCurso);
        },
    cargarCategorias(){
      this.$http
        .get("wp/v2/categories")
        .then(request => {
          this.categorias = request.data;
        })
        .catch(() => {

        });
    },
    cargarCursos(){
      this.$http
        .get("wp/v2/curso")
        .then(request => {
          this.cursos = request.data;
          this.loading = false;
        })
        .catch(() => {

        });
    }
  },
  components:{
    Carrusel,
    CarruselVistoEstudiantes,
    ToolbarPrincipal
  }
}
</script>

<style scoped lang="scss">
  v-content{
    background-image: url("https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg") !important;
  }
  .background{
    background-image: url("https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg") !important;
  }

</style>

