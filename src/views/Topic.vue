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
            </v-col>
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
        loading:true,
        idTopico:null,
        topicoRespuestas:null,
        idCurso:null,
        topico:null
    }),
    components:{
        ToolbarPrincipal
    },
    methods:{
        obtenerRespuestasTopico(){
             this.$http
                .post("my_rest_server/v1/forum/topic/getAnswers?id_topic="+this.idTopico)
                .then(request => { 
                        console.log(request.data);
                    })
                .catch((error) => {
                        this.snackbar = true; 
                        this.textoSnackbar = "Hubo un error intente nuevamente";
                        console.log(error)
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
                })
            .catch((error) => { console.log(error)});
        },
        obtenerTopicoActual(topicos){
            
            for (const topico of topicos) {
                if(topico.id_topic == this.idTopico){
                    this.topico = topico;
                }
            }

        }
    }
}
</script>

<style>

</style>