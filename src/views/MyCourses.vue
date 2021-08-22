<template>
    <v-container > 
        <toolbar-principal></toolbar-principal>
        <v-row v-if="!loading">
            <v-col 
                sm="12"
                lg="12"
                cols="12"
                
            >
                <h1>Mis Cursos</h1>
            </v-col>

            <section class="full-width" v-if="noHayCursos == false" >
				<v-row>
					<v-col
									
						sm="4"
						lg="4"
						cols="4"
						v-for="curso in cursosAdquiridos"
						:key="curso.data.id"
						>

						<v-card
							:loading="loading"
							class="mx-auto"
							max-width="auto"
						>
							<v-img
								height="200"
								:src="curso.data.imagen_curso.guid"
							></v-img>

							<v-card-title>{{curso.data.nombre}}</v-card-title>

							

							<v-card-text>
							<v-row
								
								class="mx-0"
							>
								<valoracion 
								:idCurso="curso.data.id">

								</valoracion>
							</v-row>
							</v-card-text>
							<v-card-text>
								<strong>Porcentaje completado {{curso.porcentaje}}%</strong>
							</v-card-text>
							
							<v-progress-linear
								class="mx-auto"
								color="verde"
								buffer-value="0"     
								:value="curso.porcentaje"
								stream
							></v-progress-linear>
							<v-card-actions>
								<v-btn
									color="success"
									text
									@click="ingresarCurso(curso.data.id)"                            
								>
									Ver Detalle
								</v-btn>
								<v-btn
									color="success"
									text
									@click="verContenido(curso.data.id)"
									
								>
									Continuar
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
            </section>
            <section  v-if="noHayCursos == true">
                
                <v-col
                               
                    sm="12"
                    lg="12"
                    cols="12"
                    >
                <h2 class="text-center">
                    Usted aún no ha adquirido cursos
                </h2>
                </v-col>
            </section>
        </v-row>
        <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
        
    </v-container>
    
</template>

<script>
import { mapGetters } from "vuex";
import ToolbarPrincipal from "../components/ToolbarPrincipal";
import Valoracion from "../components/Valoracion";

  export default {
    created(){
        this.getMyCourses();
    },
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    data: () => ({
      loading: true,
      selection: 1,
      cursosAdquiridos:[],
      modulos:[],
      cursosAdquiridosResponse:[],
      noHayCursos:true
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
                    
                    if(this.cursosAdquiridosResponse.length == 0){

                        this.noHayCursos = true;
                        this.loading=false;

                    }else{

                        this.noHayCursos = false;
                        this.getDetailCourse(this.cursosAdquiridosResponse);

                    }
                })
            .catch((error) => { console.log(error)});
            
      },
      verContenido(cursoId){
        this.loading = true
        this.$router.push("/cursos/"+cursoId+"/aprender");
      },
      getDetailCourse(cursos){

       
        
        cursos.forEach(curso => {


            var totalLeccionesCurso=0;
            var leccionesVistas;
           //Verifico el total de lecciones vistas en ese curso
            this.$http
            .post("my_rest_server/v1/user/getAllLessons", {
                username: this.currentUser.username,
                id_course: curso.id_curso
            })
            .then(request => { 
                //console.log(request.data)
                    if(request.data!==""){
                        leccionesVistas=request.data.length;
                    }
                            //obtengo informacion del curso
                    this.$http
                    .get("wp/v2/curso/"+curso.id_curso)
                    .then(request => { 
                        this.modulos= request.data.modulo;

                        this.modulos.forEach(modulo => {
                        totalLeccionesCurso= totalLeccionesCurso + Object.keys(modulo.leccion).length;
                        });
                        var promedioLecciones=(leccionesVistas*100)/totalLeccionesCurso;
                        var cursoObject ={
                            data:request.data,
                            porcentaje:this.round(promedioLecciones,0)
                        }
                        this.cursosAdquiridos.push(cursoObject);
                    })
                    .catch((error) => { console.log(error)})
                })
            .catch((error) => { console.log(error)});
        

          });
           this.loading = false;

      },
        round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        },
        checkCurrentLogin() {
        // Verifica si el usuario se encuentra login, de no ser asi, lo redirige al home
            if (this.currentUser) {
                this.$router.replace(this.$route.query.redirect || "/");
            }
        },
    },
    computed: {
    ...mapGetters({ currentUser: "currentUser" })
    },
    components:{
		ToolbarPrincipal,
		Valoracion
    }
  }
</script>

<style>
[v-cloak] {
  display: none;
}

.full-width{
    width: 100%;
}
</style>