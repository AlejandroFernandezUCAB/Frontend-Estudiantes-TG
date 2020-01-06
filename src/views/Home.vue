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
                :color="colors[i]"
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

      <v-col class="py-5" cols="12" sm="12" md="12" lg="12">
        <v-row no-gutters>
          <v-col cols="4" sm="12" md="4" lg="4">
            <p class="text-center">
              <b>Los mejores cursos</b>
              <br>
              Puedes conseguirlos aquí
            </p>
          </v-col>
          <v-col cols="8" sm="12" md="8" lg="8">
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
                    <v-card
                      class="mx-auto"
                      max-width="400"
                      >
                      <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      >
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                      </v-img>

                      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                      <v-card-text class="text--primary">
                        <div>Whitehaven Beach</div>

                        <div>Whitsunday Island, Whitsunday Islands</div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn
                          color="orange"
                          text
                        >
                          Share
                        </v-btn>

                        <v-btn
                          color="orange"
                          text
                        >
                          Explore
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

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
  })
}
</script>
