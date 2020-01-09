<template>

  <v-container fluid>
    <v-row no-gutters>
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
              v-for="(slide, i) in slides"
              :key="i"
            >
              <v-sheet
                class="background"
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">{{ slide }}</div>
                </v-row>
              </v-sheet>
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
            <carrusel>
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
  </v-container>
</template>

<script>
import Carrusel from '../components/Carrusel.vue'
import CarruselVistoEstudiantes from "../components/CarruselVistoEstudiantes.vue";

export default {
  name: 'home',
   data:() => ({
    colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
        ],
        cycle: false,
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
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }),
  components:{
    Carrusel,
    CarruselVistoEstudiantes
  }
}
</script>

<style scoped lang="scss">
  .background{
    background-image: url("https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg") !important;
  }

</style>

