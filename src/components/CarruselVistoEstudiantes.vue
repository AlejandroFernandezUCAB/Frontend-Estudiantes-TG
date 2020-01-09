<template>
  <v-carousel class="vertical-center-carousel" hide-delimiters light>
    <v-carousel-item
      v-for="(color) in colors"
      :key="color"
    >
        <v-row
        >
          <v-col v-for="i in 3" :key="i" sm="4">
              <v-card
                class="mx-auto"
                max-width="400"
                >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg"
                >
                </v-img>
                <v-card-title class="background-shape">Programación en Java</v-card-title>
  
                <v-card-subtitle class="pb-0">Básico</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div><p>Este curso es dedicado para los nuevos en Java</p></div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="#34B3E1"
                    text
                  >
                    Comprar
                  </v-btn>

                  <v-btn
                    color="#34B3E1"
                    text
                  >
                    Ver contenido
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>

  export default  {
    name: 'carrusel-visto-estudiantes',
    props: [],
    mounted () {

    },
    data () {
      return {
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .vertical-center-carousel{
    height: 400px !important;
  }

  .background-shape{

  }

</style>
