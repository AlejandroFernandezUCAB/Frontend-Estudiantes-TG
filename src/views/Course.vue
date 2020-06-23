<template>
  <v-container>
      <toolbar-principal></toolbar-principal>
      <v-row v-if="!loading">
        <v-col
            sm="8"
            lg="8"
            xl="8"
        >
            <v-card
                color="white"
                light          
            >

                <!-- <v-img
                    :src="curso.banner.guid"
                    height="100"
                    class="grey darken-4"
                ></v-img> -->

                <v-card-title class="headline">{{curso.nombre}}</v-card-title>

                <v-card-text>
                    <iframe 
                        class="embed-container"
                        width="560" 
                        style="height:44vh"
                        :src="curso.video_embed"
                        frameborder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                    <br>
                    <br>
                    {{curso.informacion_del_curso.replace(/<[^>]*>/g, '')}}
                    <br>
                    <br>
                    Categorías: {{categorias}}.
                    <br>
                    <br>
                    Información del profesor: {{curso.informacion_profesor}}
                    <br>
                    <br>
                    <valoracion :idCurso="idCurso">
                    </valoracion>
                </v-card-text>

                <v-expansion-panels focusable>
                    <v-expansion-panel
                        v-for="modulo in curso.modulo"
                        :key="modulo.id"
                    >
                        <v-expansion-panel-header>Módulo: {{modulo.post_title}}</v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-3">
                            <ul 
                                v-for="leccion in modulo.leccion"
                                :key="leccion.id"
                            >
                                <li>Lección: {{leccion.nombre}}</li>
                            </ul>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

            </v-card>

        </v-col>

        <v-col
            sm="4"
            lg="4"
            xl="4"
        >
            <v-card>
                <v-img
                    :src="curso.imagen_curso.guid"
                    height="250"
                    class="grey darken-4"
                ></v-img>
                <v-card-title class="title">{{curso.nombre}}</v-card-title>
                <v-card-subtitle class="subtitle">{{curso.texto_inicial}}</v-card-subtitle>
                
                <v-card-actions v-if="curso.gratis==1">
                    <v-btn
                        v-if="!comprado"
                        color="success"
                        text
                        @click="comprarCurso(curso.id)"                            
                    >
                        Obtener
                    </v-btn>
                    <v-btn
                        v-else
                        color="verde"
                        text
                        @click="verCurso(curso.id)"                            
                    >
                        Continuar   
                    </v-btn>
                </v-card-actions>
                <v-card-actions class="mx-auto" v-if="curso.gratis==0">
                    <v-dialog
                        v-model="dialogStripe"
                        width="500"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-if="!comprado"
                                color="success"
                                x-large
                                text
                                v-on="on"                     
                            >
                                Stripe - ${{curso.costo}}
                            </v-btn>
                        </template>
                        <stripe-payment :idCurso="idCurso"></stripe-payment>
                    </v-dialog>

					<v-divider
						v-if="!comprado"
						class="mx-4"
						inset
						vertical
					></v-divider>
                    <v-dialog
                        v-model="dialogPaypal"
                        width="500"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-if="!comprado"
                                color="success"
                                text
                                x-large
                                v-on="on"                           
                            >
                                Paypal - ${{curso.costo}}
                            </v-btn>
                        </template>
                        <paypal-payment :idCurso="idCurso"></paypal-payment>
                    </v-dialog>

                    <v-btn
                        v-if="comprado"
                        color="success"
                        text
                        @click="verCurso(curso.id)"                            
                    >
                        Continuar   
                    </v-btn>
                </v-card-actions>
            </v-card>
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

import ToolbarPrincipal from "../components/ToolbarPrincipal";
import { mapGetters } from "vuex";
import Valoracion from "../components/Valoracion";
import StripePayment from "../components/StripePayment";
import PaypalPayment from "../components/PaypalPayment";

export default {
    created(){

        this.idCurso = this.$route.params.id;
        this.getCurso(this.idCurso);

        if(this.currentUser != null){
        
            this.obtenerMisCursos();

        }

    },
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    data: () => ({
        dialogStripe:false,
        dialogPaypal:false,
        idCurso:"",
        curso:null,
        cargado:false,
        categorias:"",
        cursosAdquiridosResponse:"",
        medallas:"",
        idMedallaPrimerCurso:"",
        comprado:null,
        loading: true
    }),
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    methods:{
        getCurso(idCurso){
            this.$http
                .get("wp/v2/curso/"+idCurso)
                .then(request => {
                    this.curso = request.data;
                    this.getCategorias(this.curso.categories);
                    this.loading = false;

                })
                 .catch((error) => { console.log(error)});
        },
        getCategorias( categorias ){

            categorias.forEach(categoria => {
                this.$http
                .get("wp/v2/categories/"+categoria)
                .then(request => {
                    this.categorias = this.categorias + request.data.name
                    this.loading = false;
                })
                .catch(() => {

                });
            });
        },
        comprarCurso( cursoId ){
            this.verificarLogin();
            this.$http
            .post("my_rest_server/v1/user-inscribed", {
                username: localStorage.username,
                courseID: cursoId
            })
            .then(request => {
                this.checkBadgesActive();
                this.$router.push("/mis-cursos");
            })
            .catch(error => console.log(error));

        },
        comprarCursoStripe( cursoId ){
			this.verificarLogin();
            if( this.currentUser != null){
            	this.$router.push("/stripePayment/"+cursoId);
			}else{
				this.$router.push("/login");
				this.$router.go();
			}
        },
        comprarCursoPaypal( cursoId ){
            this.verificarLogin();
			if( this.currentUser != null){
            	this.$router.push("/paypalPayment/"+cursoId);
			}else{
				this.$router.push("/login");
				this.$router.go();
			}
        },
       	checkBadgesActive(){
 			this.$http
            .get("wp/v2/medalla")
            .then(request => {
                this.medallas=request.data;
				this.searchCondition("Primer Curso Adquirido");
            })
               .catch((error) => { console.log(error)});
        },
        searchCondition(condition){
		
			for (let i = 0; i < this.medallas.length; i++) {
				const element = this.medallas[i];
				if( element.condicion[0].includes(condition)){

					this.idMedallaPrimerCurso=element.id;
		 	 		this.checkFirstCourseBadge(condition);
		 	 		break;
        			}
      			}
		},
        checkFirstCourseBadge(condition){
             this.$http
            .post("my_rest_server/v1/users/courses/user_inscribed_by_username", {
                    username: this.currentUser.username
                })
            .then(request => { 
				if(request.data.length==1){
					this.addBadgeFirstLesson(condition);
				}
                  
            })
            .catch((error) => { console.log(error)});
        },
          addBadgeFirstLesson(condition){
   		 this.$http
            .post("my_rest_server/v1/badges/addUserBadges", {
				username: this.currentUser.username,
				id_badge:this.idMedallaPrimerCurso
            })
            .then(request => { 
				alert("Obtuvo la medalla "+condition)
                console.log(request.data)
                })
            .catch((error) => { console.log(error)});
	  },
        obtenerMisCursos(){
          
            this.$http
                .post("my_rest_server/v1/users/courses/user_inscribed_by_username", {
                    username: this.currentUser.username
                })
                .then(request => { 
                    this.cursosAdquiridosResponse = request.data
                    this.validarSiYaCompro(this.cursosAdquiridosResponse);
                    })
                .catch((error) => { console.log(error)});

        },
        verificarLogin(){

			if(this.currentUser == null){

				this.$router.push("/login");
				this.$router.go();
				return false;

			}else{

				return true; 

			}

		},
        validarSiYaCompro(cursosAdquiridos){

            for (const curso of cursosAdquiridos) {
                
                if(curso.id_curso == this.idCurso){
                    this.comprado = true;
                }
         
            }

            if(this.comprado == null){
                this.comprado = false;
                console.log(this.comprado);
            }
        },
        verCurso(idCurso){
            this.$router.push("/cursos/"+idCurso+"/aprender");
        }
    },
    components:{
        ToolbarPrincipal,
        Valoracion,
        StripePayment,
        PaypalPayment
    }
}
</script>

<style>
    .background-img{
        background-image: url("../assets/fondo.jpg")
    }
    iframe { display:block; width:100%; border:none;}
</style>