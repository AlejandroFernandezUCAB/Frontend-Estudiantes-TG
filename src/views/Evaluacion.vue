<template>

  <section>
    <v-navigation-drawer
      absolute
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container class="py-5">
      <h1 class="headline">Evaluación</h1>
        <v-row no-gutters>
          <v-col md="12" sm="12" xs="12" class="py-5">
            <p class="body-1">¿Cúal de las siguientes preguntas es verdadera?</p>
            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="n in 3"
                :key="n"
                :label="`Radio ${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col md="12" sm="12" xs="12" class="py-5">
            <p class="body-1">¿Cúal de las siguientes preguntas es verdadera?</p>
            <v-checkbox
              v-model="checkbox"
              label="Checkbox 1"
            ></v-checkbox>
            <v-checkbox
              v-model="checkbox"
              label="Checkbox 2"
            ></v-checkbox>
            <v-checkbox
              v-model="checkbox"
              label="Checkbox 3"
            ></v-checkbox>
          </v-col>
          <v-col md="12" sm="12" xs="12" class="py-5">
            <p class="body-1">¿Cuanto es 1+1?</p>
            <v-text-field label="Respuesta" v-model="respuesta" :rules="campoRequerido" required>
            </v-text-field>
          </v-col>
        </v-row>
    </v-container>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        campoRequerido: [
            v => !!v || 'Este campo es requerido'
        ],
        respuesta:""
      }
    },
  }
</script>