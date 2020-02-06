<template>
    <v-container fill-height>
        <v-row>
            <v-col 
                sm="12"
                lg="12"
                cols="12"
                
            >
                <h1>Mis Cursos</h1>
            </v-col>

            <v-col              
                sm="4"
                lg="4"
                cols="4"
                v-for="i in 9"
                :key="i"
                >

                <v-card
                    :loading="loading"
                    class="mx-auto my-12"
                    max-width="374"
                >
                    <v-img
                    height="100%"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-title>Curso 1</v-card-title>

                    <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>

                        <div class="grey--text ml-4">4.5 (413)</div>
                    </v-row>
                    </v-card-text>
                    <v-card-text>
                        <strong>Porcentaje completado 10%</strong>
                    </v-card-text>
                    
                    <v-progress-linear
                        class="mx-auto"
                        color="verde"
                        buffer-value="0"     
                        value="10"
                        stream
                    ></v-progress-linear>
                    <v-card-actions>
                    <v-btn
                        color="success"
                        text
                        @click="reserve"
                         :align="center"
                    >
                        Continuar
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>

<style>

</style>