<template>
  <main 
    class="px-5">
      <v-row>
          <v-col 
            v-if="!evaluacion"
            sm="12"
            lg="12"
            xl="12"
            >
              <section align="center" width="100%" height="auto">
                <video width="89%"  @contextmenu="handler($event)" controls autoplay controlsList="nodownload" :src="leccion.video.guid">
      
                </video>
              </section>

              <section>
                <div>
                  <h2 class="subtitle-1">{{curso.nombre}}</h2>
                  <h1 class="title">{{leccion.nombre}}</h1>
                </div>
                <v-divider color="#34B3E1"></v-divider>
                <div class="mt-4" align="justify" v-html="leccion.informacion">

                </div>
              </section>

              <section>
                <h1 class="title">Evaluación</h1>
                <v-divider color="#34B3E1"></v-divider>
                <p class="mt-4">Para presentar el quiz pulse comenzar</p>
                <div class="my-2" align="center">
                  <v-btn large color="success" @click="cargarEvaluacion()">Comenzar</v-btn>
                </div>
              </section>

          </v-col>

          <v-col
            v-if="evaluacion"
            sm="12"
            lg="12"
            xl="12"
          >
            <!-- Titulo -->
            <section>
                <div>
                  <h2 class="subtitle-1">{{curso.nombre}}</h2>
                  <h1 class="title">{{dataEvaluacion.nombre}}</h1>
                </div>
            </section>

            <v-divider color="#34B3E1"></v-divider>
            
            <!-- Evaluacion -->
            <section 
				class="mt-5"
				v-for="(pregunta, index) in dataEvaluacion.preguntas"
				:key="pregunta.ID"
			>

				<!--Caso en que sea texto simple-->
				<section 
					v-if="pregunta.tipo_de_pregunta == 'Texto Simple'"
					>
								
					<h2 class="subtitle-1"><strong>{{index + 1}}</strong> - {{pregunta.post_title}}</h2>
								
					<v-text-field
						v-model="form.respuestas[index]"
						:counter="10"
						label="Respuesta"
						color="success"
						required
						:disabled="respondio"
					></v-text-field>

					<h4 
						class="font-italic font-weight-medium verde--text"
						v-if="respondio && form.correctas[index]"
					>
						Respuesta Correcta
					</h4>
					<h4 
						class="font-italic font-weight-medium red--text"
						v-if="respondio && (form.correctas[index] == false)"
					>
						Respuesta Incorrecta
					</h4>

				</section>

              	<section 
					v-if="pregunta.tipo_de_pregunta == 'Multiple'"
					>
								
					<h2 class="subtitle-1"><strong>{{index + 1}}</strong> - {{pregunta.post_title}}</h2>

						<v-checkbox
							v-for="respuesta in pregunta.respuesta"
							v-model="form.respuestas[index]"
							:label="respuesta.respuesta"
        				    :value="respuesta.id"
							:key="respuesta.id"
							:disabled="respondio"
							color="success"
        			          multiple
						></v-checkbox>

					<h4 	
						class="font-italic font-weight-medium verde--text"
						v-if="respondio && form.correctas[index]"
					>
						Respuesta Correcta
					</h4>
					<h4 
						class="font-italic font-weight-medium red--text"
						v-if="respondio && (form.correctas[index] == false)"
					>
						Respuesta Incorrecta
					</h4>

				</section>

              	<section 
					v-if="pregunta.tipo_de_pregunta == 'Simple'"
					>
					
					<h2 class="subtitle-1"><strong>{{index + 1}}</strong> - {{pregunta.post_title}}</h2>

					<v-radio-group v-model="form.respuestas[index]" :disabled="respondio">
						<v-radio
							v-for="respuesta in pregunta.respuesta"
							:label="respuesta.respuesta"
                			:value="respuesta.respuesta"
							:key="respuesta.id"
							color="success"
						></v-radio>
					</v-radio-group>

					<h4 
						class="font-italic font-weight-medium verde--text"
						v-if="respondio && form.correctas[index]"
					>
					Respuesta Correcta
					</h4>

					<h4 
						class="font-italic font-weight-medium red--text"
						v-if="respondio && (form.correctas[index] == false)"
					>
					Respuesta Incorrecta
					</h4>

				</section>

            </section>
			
			<section v-if="respondio">
				Puntaje final: {{puntajeFinal}}
			</section>
			
            <!--Botones de enviar evaluacion y atras-->
            <v-row>
              <v-col
                sm="6"
                md="6"
                xl="6"
                lg="6"
              >
                <div align="center">
                  <v-btn
                    class="right" 
                    large 
                    color="success" 
                    @click="evaluacion = !evaluacion"
                  >
                    Atras
                  </v-btn>
                </div>
              </v-col>
              <v-col
                sm="6"
                md="6"
                xl="6"
                lg="6"
              >
                <div align="center">
                  <v-btn
                    class="right" 
                    large 
                    color="success"
					v-if="!respondio"
                    @click="corregirEvaluacion()"
                  >
                    Enviar
                  </v-btn>
                </div>
				<div align="center">
                  <v-btn
                    class="right" 
                    large 
                    color="success"
					v-if="respondio"
                    @click="siguienteLeccion()"
                  >
                    Siguiente Lección
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
      </v-row>
  </main>
</template>

<script>

import { mapGetters } from "vuex";

export default {
	
    props:["leccion", "curso"],
    created(){
		this.video = this.leccion.video.guid;
		this.idCurso = this.$route.params.idCurso;
		this.idLeccion = this.$route.params.idLeccion;
		this.guardarNuevaLeccion(this.idCurso, this.idLeccion);
	},
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    data:() => ({
		idCurso:"",
		idLeccion:"",
		evaluacion:false,
      	dataEvaluacion:null,
		form:{
        	respuestas:[],
        	correctas:[]
      	},
		respondio:false,
		puntajeFinal:0  
    }),
    methods:{
		handler(event){
			event.preventDefault();
		},
      	cargarEvaluacion(){
			this.obtenerEvaluacionUsuario();
			this.$http
			.get("/wp/v2/evaluacion/" + this.leccion.evaluacion[0].ID)
			.then(request => {
				this.dataEvaluacion = request.data;
				this.setearCorrectasForm();
				this.evaluacion = true;
			})
			.catch(error => (console.log(error)));
					
      },
		setearCorrectasForm(){

			for (let i = 0; i < this.dataEvaluacion.preguntas.length; i++) {
			this.form.correctas[i] = null;
			}

		},
		corregirEvaluacion(){
			this.respondio = true;
			for (let i = 0; i < this.dataEvaluacion.preguntas.length; i++) {
				const pregunta = this.dataEvaluacion.preguntas[i];
				switch (pregunta.tipo_de_pregunta) {
					case "Simple":
						this.corregirSimple( pregunta.respuesta, this.form.respuestas[i], i);
					break;
					case "Texto Simple":
						this.corregirTextoSimple( pregunta.respuesta, this.form.respuestas[i], i);
					break;
					case "Multiple":
						this.corregirMultiple( pregunta.respuesta, this.form.respuestas[i], i);
					break;
				}
			}
			this.guardarResultadoLeccion()
      	},
		corregirTextoSimple(  respuestas , respuestaUsuario, posicion){

			if( respuestas[0].respuesta == respuestaUsuario){
				this.puntajeFinal = this.puntajeFinal + parseFloat(respuestas[0].puntaje); 
				this.form.correctas[posicion] = true;
			}else{
				this.form.correctas[posicion] = false;
			}

		},
		corregirMultiple(respuestas , respuestaUsuario, posicion){
			let respuestasCorrectaArray = [];
			let puntaje = 0;
			for (const respuesta of respuestas) {
				if(respuesta.correcta == "1"){
					puntaje = puntaje + parseFloat(respuesta.puntaje);
					respuestasCorrectaArray.push(respuesta.id);
				}
			}
			
			if( this.arraysEqual(respuestaUsuario, respuestasCorrectaArray)){
				this.puntajeFinal = this.puntajeFinal + puntaje;
				this.form.correctas[posicion] = true;
			}else{
				this.form.correctas[posicion] = false;
			}

		},
      corregirSimple( respuestas , respuestaUsuario, posicion ){
        
        for (const respuesta of respuestas) {
			if( respuesta.correcta == 1 && respuesta.respuesta == respuestaUsuario){
				this.puntajeFinal = this.puntajeFinal + parseFloat(respuesta.puntaje);
				this.form.correctas[posicion] = true;
			}else if( respuesta.correcta == 1 && respuesta.respuesta != respuestaUsuario ){
				this.form.correctas[posicion] = false;
			}
        }

      },
      //Extraido de https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
      arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
        
      },
	  guardarNuevaLeccion(curso, leccion){
            var self = this;
		    setTimeout(function(){
                self.$http
					.post("my_rest_server/v1/user/addLesson",{
						username: self.currentUser.username,
						id_course: curso,
						id_lesson: leccion
					})
					.then(request => {
						console.log(request.data);
					})
					.catch(error => (console.log(error)));
            }, 5000);

	  },
	  guardarResultadoLeccion(){
		    this.$http
            .post("my_rest_server/v1/add-user-evaluation", {
                user: this.currentUser.username,
                id_lesson: this.idLeccion,
                id_evaluation: this.leccion.evaluacion[0].ID,
                score: this.puntajeFinal
            })
            .then(request => { 
                  
            })
            .catch((error) => { console.log(error)});
	  },
	  obtenerEvaluacionUsuario(){
		  this.$http
            .post("my_rest_server/v1/user-evaluation", {
                user: this.currentUser.username,
                id_lesson: this.idLeccion,
                id_evaluation: this.leccion.evaluacion[0].ID
            })
            .then(request => { 
				
				this.presentoEvaluacion( request.data );
				 
            })
            .catch((error) => { console.log(error)});
	  },
	  siguienteLeccion(){

			let modulos = this.curso.modulo;
			let leccionContenedor = null;
			let leccionAnterior = null;

			for (const modulo of modulos) {
				
                var leccionesObserver = modulo.leccion;
                leccionesObserver =  JSON.parse(JSON.stringify(leccionesObserver));
                
                var lecciones = Object.keys(leccionesObserver);

                lecciones.forEach(key => {
					
					if(this.idLeccion == leccionAnterior){
						this.$router.push("/cursos/"+this.curso.id+"/leccion/"+key+"/aprender");
						this.$router.go();
					}

					leccionAnterior = key;

				});

			}

	  },
	  presentoEvaluacion( evaluaciones ){

		  evaluaciones.forEach(evaluacion => {
				if(evaluacion.id_evaluation == this.leccion.evaluacion[0].ID){
					this.respondio = true;
					this.puntajeFinal = evaluacion.puntaje;
				}
		  });

	  }
    },
    components:{
      
    }
}
</script>

<style>
video {    
    object-fit: cover;
}
</style>