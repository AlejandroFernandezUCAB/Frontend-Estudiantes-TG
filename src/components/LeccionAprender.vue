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
                <video width="89%" controls autoplay>
                    <source :src="leccion.video.guid" type="video/mp4">
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
									v-model="form.padreForm[index]"
									:counter="10"
									label="Respuesta"
									color="success"
									required
								></v-text-field>

							</section>
              <section 
								v-if="pregunta.tipo_de_pregunta == 'Multiple'"
							>
								
								<h2 class="subtitle-1"><strong>{{index + 1}}</strong> - {{pregunta.post_title}}</h2>

								<v-checkbox
									v-for="respuesta in pregunta.respuesta"
									v-model="form.padreForm[index]"
									:label="respuesta.respuesta"
									:key="respuesta.id"
									color="black"
								></v-checkbox>

							</section>
              <section 
								v-if="pregunta.tipo_de_pregunta == 'Simple'"
							>
								
								<h2 class="subtitle-1"><strong>{{index + 1}}</strong> - {{pregunta.post_title}}</h2>

								<v-radio-group v-model="form.padreForm[index]">
										<v-radio
											v-for="respuesta in pregunta.respuesta"
											v-model="form.padreForm[index]"
											:label="respuesta.respuesta"
											:key="respuesta.id"
											color="black"
										></v-radio>
									</v-radio-group>

							</section>
            </section>
						<v-btn :align="center" large color="success" @click="corregirEvaluacion()">Enviar</v-btn>
          </v-col>
      </v-row>
  </main>
</template>

<script>

export default {
    props:["leccion", "curso"],
    created(){
      console.log(this.leccion);
    },
    data:() => ({
			evaluacion:false,
			dataEvaluacion:null,
			form:{
				padreForm:[]
			}
    }),
    methods:{
      cargarEvaluacion(){
        console.log(this.leccion.evaluacion[0].ID);
        this.$http
          .get("/wp/v2/evaluacion/" + this.leccion.evaluacion[0].ID)
          .then(request => {
						this.dataEvaluacion = request.data;
						this.evaluacion = true;
						console.log(this.dataEvaluacion);
          })
					.catch(error => (console.log(error)));
					
			},
			corregirEvaluacion(){
				console.log(this.form.padreForm);
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