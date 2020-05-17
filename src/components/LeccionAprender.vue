<template>
  <main 
    class="px-5">
      <v-row v-if="!loading">
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

              <section v-if="leccion.evaluacion">
                <h1 class="title">Evaluación</h1>
                <v-divider color="#34B3E1"></v-divider>
                <p class="mt-4">Para presentar el quiz pulse comenzar</p>
                <div class="my-2" align="center" >
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
				<h4 
					class="font-italic font-weight-medium">
				Puntaje final: {{puntajeFinal}}
				</h4>
			</section>
			
			<section v-if="respondio">
				<h4 
					class="font-italic font-weight-medium">
					Puntaje total: {{puntajeTotal}}
				</h4>
			</section>

			<section v-if="completarEvaluacion">
				<h4 
					class="font-italic font-weight-medium red--text">
					Por favor responda todas las preguntas
				</h4>
			</section>

			<section v-if="respondio && !aprobo && segundosParaEvaluacion > 0">
				<h4 
					class="font-italic font-weight-medium red--text">
					No ha aprobado esta evaluación, deberá esperar {{ 600 - segundosParaEvaluacion }} segundos para volverla a presentar
				</h4>
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
					v-if="!respondio && volverResponder"
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
					v-if="respondio && !volverResponder"
                    @click="siguienteLeccion()"
                  >
                    Siguiente Lección
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
      </v-row>
	  <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
      </div>
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
		this.checkLessonEvaluation =
		this.checkBadgesActive("Primera Lección Vista");
		this.guardarNuevaLeccion(this.idCurso, this.idLeccion);
		//alert("Aqui")
	},
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    data:() => ({
		loading:true,
		idCurso:"",
		idLeccion:"",
		medallas:"",
		idMedallaPrimeraLeccion:"",
		idMedallaPrimeraEvaluacion:"",
		evaluacion:false,
		medallaRepetida:false,
		medallasAdquiridasResponse:[],
      	dataEvaluacion:null,
		form:{
        	respuestas:[],
        	correctas:[]
      	},
		respondio:false,
		puntajeFinal:0,
		puntajeTotal:0,
		aprobo:null,
		volverResponder:true,
		resultadoUsuario:null,
		segundosParaEvaluacion:0,
		completarEvaluacion:false  
    }),
    methods:{
		calcularTiempoParaResponder(){

			this.resultadoUsuario.forEach(respuesta => {
					console.log("test");
					let inicioTiempo = new Date(respuesta.reg_date);
				  	let endTime = new Date();
					var timeDiff = endTime - inicioTiempo; //in ms
					// strip the ms
					timeDiff /= 1000;

					// get seconds 
					this.segundosParaEvaluacion = Math.round(timeDiff);

					if( this.segundosParaEvaluacion >= 600){

						this.volverResponder = true;
						this.respondio = false;
						this.puntajeFinal = 0;
						this.puntajeTotal = 0;
						
					}else{

						this.respondio = true;
						this.volverResponder = false;

					}

			});
		},
		calcularPuntuacionTotal(){
			for (let i = 0; i < this.dataEvaluacion.preguntas.length; i++) {
				
				let respuestas = this.dataEvaluacion.preguntas[i].respuesta;

				for (const respuesta of respuestas) {

					this.puntajeTotal = this.puntajeTotal + parseFloat(respuesta.puntaje);
					
				}
			}
			
		},
		calcularSiAproboElUsuario(){
			console.log(this.puntajeTotal)
			let puntajeAprobar = 0;
			puntajeAprobar=this.puntajeTotal/2;
			console.log( this.puntajeFinal , puntajeAprobar);

			if( this.puntajeFinal >= puntajeAprobar && puntajeAprobar != 0 ){
				
				console.log("entre en aprobo evaluacion")
				console.log(puntajeAprobar)
				this.aprobo = true;
				this.checkBadgesActive("Primera Evaluación Aprobada")
				this.volverResponder = false;
				
			}else{

				this.aprobo = false;
				
			}

		},
		handler(event){
			event.preventDefault();
		},

		checkBadgesActive(condition){
 			this.$http
            .get("wp/v2/medalla")
            .then(request => {
				this.medallas=request.data;
				this.searchCondition(condition);
            })
               .catch((error) => { console.log(error)});
		},
		searchCondition(condition){
		
			for (let i = 0; i < this.medallas.length; i++) {
				const element = this.medallas[i];
				if( element.condicion[0].includes(condition)){
					console.log(condition);
					if(condition==="Primera Lección Vista"){
						this.$http
						.post("my_rest_server/v1/badges/getAll", {
							username: this.currentUser.username
						})
						.then(request => { 
							console.log(request.data)
							this.medallasAdquiridasResponse = request.data;
							 this.medallasAdquiridasResponse.forEach(medalla => {
								if(medalla.id_badge == element.id){
									console.log("entre en repetida")
									this.medallaRepetida=true;
								}
							});
							if(!this.medallaRepetida){
							console.log(this.medallaRepetida)
							this.idMedallaPrimeraLeccion=element.id;
							this.checkFirstLessonBadge(this.idCurso,condition);
						}
						
						})
						.catch((error) => { console.log(error)});
						
						
					}
					if(condition==="Primera Evaluación Aprobada"){
						this.idMedallaPrimeraEvaluacion=element.id;
						this.CheckFirstEvaluationUser(condition);
					}
					
		 	 		break;
        			}

      			}
		},
		 CheckFirstEvaluationUser(condition){
		  this.$http
            .post("my_rest_server/v1/get_user_first_evaluation", {
				user: this.currentUser.username,
				id_course: this.idCurso
            })
            .then(request => { 
				console.log(request.data[0].Cantidad);
				if(request.data[0].Cantidad==="1"){
					this.addBadgeFirstEvaluation(condition);
				}
                  console.log(request.data)
				 
            })
            .catch((error) => { console.log(error)});
	  },
		checkFirstLessonBadge(curso,condition){

		  this.$http
            .post("my_rest_server/v1/user/getAllLessons", {
                username: this.currentUser.username,
                id_course: curso,
            })
            .then(request => { 
				console.log(request.data)
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
				id_badge:this.idMedallaPrimeraLeccion
            })
            .then(request => { 
				alert("Obtuvo la medalla "+condition)
                console.log(request.data)
                })
            .catch((error) => { console.log(error)});
	  },
	  addBadgeFirstEvaluation(condition){
   		 this.$http
            .post("my_rest_server/v1/badges/addUserBadges", {
				username: this.currentUser.username,
				id_badge:this.idMedallaPrimeraEvaluacion
            })
            .then(request => { 
				alert("Obtuvo la medalla "+condition)
                console.log(request.data)
                })
            .catch((error) => { console.log(error)});
	  },
      	cargarEvaluacion(){
			this.puntajeTotal = 0;
			this.puntajeFinal = 0;
			this.obtenerEvaluacionUsuario();
			this.$http
			.get("/wp/v2/evaluacion/" + this.leccion.evaluacion[0].ID)
			.then(request => {
				this.dataEvaluacion = request.data;
				this.calcularPuntuacionTotal();
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
		verificarCompletitudEvaluacion(){
			
			if( this.form.correctas.length <= this.form.respuestas.length){

				return true;

			}else{

				return false;

			}
		},
		corregirEvaluacion(){
			if(this.verificarCompletitudEvaluacion()){
				this.completarEvaluacion = false;
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
				this.calcularSiAproboElUsuario();
				this.guardarResultadoLeccion();
			}else{
				this.completarEvaluacion = true;
			}
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
			this.loading=false;
		    setTimeout(function(){
                self.$http
					.post("my_rest_server/v1/user/addLesson",{
						username: self.currentUser.username,
						id_course: curso,
						id_lesson: leccion
					})
					.then(request => {
						
						this.loading=false;
					})
					.catch(error => (console.log(error)));
            }, 5000);

	  },
	  guardarResultadoLeccion(){
		    this.$http
            .post("my_rest_server/v1/add-user-evaluation", {
				user: this.currentUser.username,
				id_course:this.idCurso,
                id_lesson: this.idLeccion,
                id_evaluation: this.leccion.evaluacion[0].ID,
				score: this.puntajeFinal,
				approve: this.aprobo
            })
            .then(request => { 
                  
            })
            .catch((error) => { console.log(error)});
	  },
	  obtenerEvaluacionUsuario(){
		  console.log(this.leccion)
		  this.$http
            .post("my_rest_server/v1/user-evaluation", {
				user: this.currentUser.username,
				id_course: this.idCurso,
                id_lesson: this.idLeccion,
                id_evaluation: this.leccion.evaluacion[0].ID
            })
            .then(request => { 
				
				this.presentoEvaluacion( request.data );
				this.resultadoUsuario = request.data;
				this.calcularTiempoParaResponder();

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
					this.calcularSiAproboElUsuario();
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