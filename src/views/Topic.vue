<template>
    <v-container v-if="loading">
      <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col
                sm="12"
                xl="12"
                md="12"
            >
                <section>
                    <h2>
                        Tópico : {{ topico.title }}
                    </h2>
                    <h3>
                        Creado por: {{ topico.creator_user }}
                    </h3>
                </section>
                <section>
                     <!--Agregar nueva respuesta-->
                    <v-row justify="center">
                        <v-dialog v-model="agregarRespuesta" persistent max-width="600px">

                        <v-card>
                            <v-card-title>
                            <span class="headline">Agregar respuesta</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-textarea v-model="crearTopico.pregunta" outlined color="verde" label="Pregunta*" required></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*Indica que el campo es obligatorio</small>
                                <br>
                                <small>Rellene todos los campos</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="success" text @click="agregarRespuesta = false">Cerrar</v-btn>
                                <v-btn color="success" text @click="agregarPreguntaATopico()">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                        <v-snackbar
                            v-model="snackbar"
                            >
                            {{textoSnackbar}}
                            <v-btn
                                light
                                color="error"
                                text
                                @click="snackbar = false"
                            >
                                Cerrar
                            </v-btn>
                        </v-snackbar>
                    </v-row>
                </section>
            </v-col>

            <v-col
                sm="12"
                xl="12"
                md="12"
            >
                <section>
                    <template v-for="(respuesta, index) in respuestas">
                        <v-card
                            :key="index"
                            class="my-5"
                        >
                            <v-card-text>
                                {{respuesta.answer}}
                            </v-card-text>

                            <v-card-actions>

                                <p class="mx-5">Por: {{respuesta.creator_user}}</p>
                                
                            <v-spacer></v-spacer>
                            
                            <v-btn
                                text
                                color="verde"
                                class="mx-5"
                                @click=""
                            >
                                Responder
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </section>

            </v-col>
            
            <v-btn
                color="verde"
                dark
                absolute
                bottom
                right
                fab
                @click="agregarRespuesta = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-row>

    </v-container>
</template>

<script>
import ToolbarPrincipal from "../components/ToolbarPrincipal"
import { mapGetters } from "vuex";

export default {
    created(){
        this.idTopico = this.$route.params.idTopico;
        this.idCurso = this.$route.params.idCurso;
        this.obtenerCursoConForo();
    },
    data:() => ({
        loading:false,
        idTopico:null,
        topicoRespuestas:null,
        idCurso:null,
        topico:null,
        respuestas:null,
        fab:{ color: 'success', icon: 'share' },
        crearTopico:{
            titulo:"",
            pregunta:""
        },
        snackbar:false,
        textoSnackbar:"",
        agregarRespuesta:false
    }),
    components:{
        ToolbarPrincipal
    },
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    methods:{
        obtenerRespuestasTopico(){
            this.respuestas = [];
             this.$http
                .post("my_rest_server/v1/forum/topic/getAnswers?id_topic="+this.idTopico)
                .then(request => { 
                        this.respuestas = request.data;
                        this.loading = true;
                    })
                .catch((error) => {

                    });

        },
        obtenerCursoConForo(){

            this.curso = [];
            this.foro = [];
            this.$http
            .get("wp/v2/curso/"+this.idCurso)
            .then(request => { 
                    this.curso = request.data;
                    this.foro = this.obtenerForo(this.idCurso,this.curso.foro[0].id);
                    this.loading = true;
                })
            .catch((error) => { console.log(error)});

        },
        obtenerForo(idCurso,idForo){

            this.$http
            .post("my_rest_server/v1/forum/getTopics?id_course="+idCurso+"&id_forum="+idForo)
            .then(request => { 
                    this.obtenerTopicoActual(request.data);
                    this.obtenerRespuestasTopico();
                })
            .catch((error) => { console.log(error)});

        },
        obtenerTopicoActual(topicos){
            
            for (const topico of topicos) {

                if(topico.id_topic == this.idTopico){
                    this.topico = topico;
                }

            }

        },
        agregarPreguntaATopico(topico){
            this.$http
            .post("my_rest_server/v1/forum/topic/createAnswer",{
                    username:this.currentUser.username,
                    id_topic:this.idTopico,
                    id_father:null,
                    answer:this.crearTopico.pregunta
                })
                .then(request => { 
                    this.agregarCurso = false;
                    this.obtenerRespuestasTopico();
                })
                .catch((error) => {
                        this.snackbar = true; 
                        this.textoSnackbar = "Hubo un error intente nuevamente";
                        console.log(error)
                    });
        },
        
    }
}
</script>

<style>
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--bottom{
    bottom:5% !important;
    right:5% !important;
}
</style>