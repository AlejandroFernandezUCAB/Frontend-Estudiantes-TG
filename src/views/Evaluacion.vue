<template>

  <section>

      <v-container class="py-5 fill-height">
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
    
    <v-navigation-drawer
      absolute
      permanent
      floating="true"
    >
      
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="caption">Curso de programación</v-list-item-title>
          
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >

          <v-list-item-content>
            <v-list-item-title class="font-regular">{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Lección 1 - Conceptos Básico' },
          { title: 'Quiz #1' },
          { title: 'Lección 2 - Declaración de variables' },
          { title: 'Quiz #2' },
          { title: 'Lección 3 - COndicionales' },
          { title: 'Quiz #3' },
          { title: 'Examen' }
        ],
        campoRequerido: [
            v => !!v || 'Este campo es requerido'
        ],
        respuesta:""
      }
    },
  }
</script>