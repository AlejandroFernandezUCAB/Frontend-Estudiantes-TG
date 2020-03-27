<template>
  <v-container>
      <toolbar-principal></toolbar-principal>
      <v-row>
        <v-col
            sm="8"
            lg="8"
            xl="8"
        >
            <v-card
                color="white"
                light          
            >

                <v-img
                    :src="curso.banner.guid"
                    height="100"
                    class="grey darken-4"
                ></v-img>

                <v-card-title class="headline">{{curso.nombre}}</v-card-title>

                <v-card-text>

                    {{curso.informacion_del_curso.replace(/<[^>]*>/g, '')}}
                    <br>
                    <br>
                    Categorías: {{categorias}}.
                    <br>
                    <br>
                    Información del profesor: {{curso.informacion_profesor}}
                    
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
                <v-card-actions>
                    <v-btn
                        v-if="!comprado"
                        color="success"
                        text
                        @click="comprarCurso(curso.id)"                            
                    >
                        Comprar
                    </v-btn>
                    <v-btn
                        v-else
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
  </v-container>
</template>

<script>

import ToolbarPrincipal from "../components/ToolbarPrincipal";
import { mapGetters } from "vuex";

export default {
    created(){
        this.idCurso = this.$route.params.id;
        this.getCurso(this.idCurso);
        this.obtenerMisCursos();
    },
    computed: {

    },
    data: () => ({
        idCurso:"",
        curso:null,
        cargado:false,
        categorias:"",
        cursosAdquiridosResponse:"",
        comprado:null
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
                    console.log(this.curso);
                    this.getCategorias(this.curso.categories);
                })
                .catch(() => {

                });
        },
        getCategorias( categorias ){
            console.log(categorias);
            categorias.forEach(categoria => {
                this.$http
                .get("wp/v2/categories/"+categoria)
                .then(request => {
                    this.categorias = this.categorias + request.data.name
                    
                })
                .catch(() => {

                });
            });
        },
        comprarCurso( cursoId ){module
            this.$http
            .post("my_rest_server/v1/user-inscribed", {
                username: localStorage.username,
                courseID: cursoId
            })
            .then(request => {
                this.$router.push("/mis-cursos");
            })
            .catch(error => console.log(error));

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
        ToolbarPrincipal
    }
}
</script>

<style>
    .background-img{
        background-image: url("../assets/fondo.jpg")
    }
</style>