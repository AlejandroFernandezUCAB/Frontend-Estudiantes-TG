<template>
  <v-card color="basil">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat color="basil">
          <v-row no-gutters>
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

                <v-card-title>Programación en Java</v-card-title>
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
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

  export default  {
    name: 'carrusel-cursos',
    props: [],
    mounted () {

    },
    data () {
      return {
        items: [
          'Programación', 'Cocina', 'Educación', 'Idiomas',
        ],
        tab: null      
        }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .carrusel-cursos {

  }
</style>
