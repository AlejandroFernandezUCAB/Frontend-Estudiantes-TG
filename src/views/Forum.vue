<template>
    <v-container fluid>
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
                        <v-btn
                            class="mx-3 align-center"
                            color="success"
                        >
                            Agregar nuevo tópico
                        </v-btn>
                    </h3>
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
                                :key="topico.id_topic"
                                @click=""
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

export default {
    created(){
        this.obtenerCursoConForo();
    },
    methods: {
        obtenerCursoConForo(){
            this.$http
            .get("wp/v2/curso/270")
            .then(request => { 
                    this.curso = request.data;
                    this.foro = this.obtenerForo("270",this.curso.foro[0].id);
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
        }
    },
    data:() => ({
        curso:null,
        topicos:null,
        divider:{ divider: true, inset: true },
        items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
    }),
    components:{
        ToolbarPrincipal
    }
}
</script>

<style>

</style>
