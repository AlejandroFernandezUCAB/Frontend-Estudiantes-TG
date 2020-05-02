<template>
    <v-container fluid v-if="loading">
      <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col
                sm="12"
                xl="12"
                md="12"
            >
                <section>
                    <h2>
                        Foro de : {{curso.nombre}}
                    </h2>
                    <h3>
                        Tópicos                         

                    </h3>
                </section>
                <section>
                    <!--Agregar nuevo topico-->
                    <v-row justify="center">
                        <v-dialog v-model="agregarCurso" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="success" v-on="on">Agregar tópico</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">Agregar tópico</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-text-field v-model="crearTopico.titulo" color="verde" label="Título del tópico*" required></v-text-field>
                                        </v-col>
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
                                <v-btn color="success" text @click="agregarCurso = false">Cerrar</v-btn>
                                <v-btn color="success" text @click="guardarTopico()">Guardar</v-btn>
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

                <v-card
                    max-width="auto"
                    class="mx-auto"
                >

                    <v-list three-line>
                        <template v-for="(topico, index) in topicos">

                            <v-divider
                            v-if="topico.divider"
                            :key="index"
                            :inset="topico.inset"
                            ></v-divider>

                            <v-list-item
                                v-else
                                :key="index"
                                @click="irATopico(topico.id_topic)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{topico.title}}</v-list-item-title>
                                    <v-list-item-subtitle>Creador por: {{topico.creator_user}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ToolbarPrincipal from "../components/ToolbarPrincipal"
import { mapGetters } from "vuex";

export default {
    created(){
        this.idCurso = this.$route.params.idCurso;
        this.obtenerCursoConForo();
    },
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    methods: {
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
                    this.topicos = request.data;
                    this.agregarDivisor(this.topicos);
                })
            .catch((error) => { console.log(error)});
        },
        agregarDivisor(topicos){
            let divisorNuevo = [];

            for (let i = 0; i < topicos.length; i++) {
                const topico = topicos[i];
                
                divisorNuevo.push(topico);
                divisorNuevo.push(this.divider);

            }

            divisorNuevo.pop();
            this.topicos = divisorNuevo;
        },
        irATopico(id_topico){
            this.$router.push("/cursos/"+this.idCurso+"/foro/topico/"+id_topico);
            this.$router.go();
        },
        guardarTopico(){

            if(this.crearTopico.titulo.length > 0 && this.crearTopico.pregunta.length > 0){
                this.$http
                .post("my_rest_server/v1/forum/createTopic",{
                    username:this.currentUser.username,
                    id_course:this.idCurso,
                    id_forum:this.curso.foro[0].id,
                    title:this.crearTopico.titulo
                })
                .then(request => { 
                        this.obtenerCursoConForo()
                        
                        this.agregarPreguntaATopico(this.topicos[0]);
                    })
                .catch((error) => {
                        this.snackbar = true; 
                        this.textoSnackbar = "Hubo un error intente nuevamente";
                        console.log(error)
                    });
            }else{
                this.snackbar = true; 
                this.textoSnackbar = "Todos los campos son requeridos";
            }
        },
        agregarPreguntaATopico(topico){
            console.log(topico);
            this.$http
            .post("my_rest_server/v1/forum/topic/createAnswer",{
                    username:this.currentUser.username,
                    id_topic:topico.id_topic,
                    id_father:this.cursonull,
                    answer:this.crearTopico.pregunta
                })
                .then(request => { 
                    this.agregarCurso = false;
                })
                .catch((error) => {
                        this.snackbar = true; 
                        this.textoSnackbar = "Hubo un error intente nuevamente";
                        console.log(error)
                    });
        }
    },
    data:() => ({
        loading:false,
        curso:null,
        topicos:null,
        divider:{ divider: true, inset: true },
        agregarCurso:null,
        crearTopico:{
            titulo:"",
            pregunta:""
        },
        snackbar:false,
        textoSnackbar:"",
        rules: {
            required: value => !!value || "Obligatorio"
        },
        idCurso:""
    }),
    components:{
        ToolbarPrincipal
    }
}
</script>

<style>

</style>
