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
                v-for="curso in cursosAdquiridos"
                :key="curso.id"
                >

                <v-card
                    :loading="loading"
                    class="mx-auto"
                    max-width="374"
                >
                    <v-img
                        height="200"
                        :src="curso.imagen_curso.guid"
                    ></v-img>

                    <v-card-title>{{curso.nombre}}</v-card-title>

                    <v-card-text>
                    <v-row
                        
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
                            @click="ingresarCurso(curso.id)"                            
                        >
                            Ver Detalle
                        </v-btn>
                        <v-btn
                            color="success"
                            text
                            @click="verContenido(curso.id)"
                            
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
import { mapGetters } from "vuex";

  export default {
    created(){
        this.getMyCourses();
    },
    computed: {
    ...mapGetters({ currentUser: "currentUser" })
    },
    data: () => ({
      loading: false,
      selection: 1,
      cursosAdquiridos:[],
      cursosAdquiridosResponse:[]
    }),
    methods: {
      ingresarCurso (idCurso) {
        this.loading = true
        this.$router.push("/cursos/"+idCurso);
      },

      getMyCourses(){
          
        this.$http
            .post("my_rest_server/v1/users/courses/user_inscribed_by_username", {
                username: this.currentUser.username
            })
            .then(request => { ;
                this.cursosAdquiridosResponse = request.data
                this.getDetailCourse(this.cursosAdquiridosResponse);
                })
            .catch((error) => { console.log(error)});
      },
      verContenido(cursoId){
        this.loading = true
        this.$router.push("/cursos/"+cursoId+"/aprender");
      },
      getDetailCourse(cursos){

          cursos.forEach(curso => {
              
            this.$http
            .get("wp/v2/curso/"+curso.id_curso)
            .then(request => { 
                this.cursosAdquiridos.push( request.data );
                console.log(request.data);
                })
            .catch((error) => { console.log(error)});
          });

      },
        checkCurrentLogin() {
        // Verifica si el usuario se encuentra login, de no ser asi, lo redirige al home
            if (this.currentUser) {
                this.$router.replace(this.$route.query.redirect || "/");
            }
        },
    },
  }
</script>

<style>

</style>