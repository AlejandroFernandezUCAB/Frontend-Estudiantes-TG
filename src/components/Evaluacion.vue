<template>
    <v-container>
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
                    @click="corregirEvaluacion()"
                  >
                    Enviar
                  </v-btn>
                </div>
              </v-col>
            </v-row>
    </v-container>
</template>

<script>
export default {
    props:["dataEvaluacion", "curso"],
    data: () => ({
        form:{
        	respuestas:[],
        	correctas:[]
        },
        respondio:false
        
    })
}
</script>

<style>

</style>