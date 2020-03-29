<template>
    <v-container fluid>

    <toolbar-principal></toolbar-principal>

    <v-row>
        <v-col
            sm="12"
            lg="12"
            md="12"
        >

            <h1 class="display-2">Cursos - {{categoria.name}}</h1>

        </v-col>

        <v-col
            sm="4"
            lg="4"
            md="4"
            v-for="curso in cursos"
            :key="curso.id"
        >
        
            <v-card
                class="mx-auto"
                max-width="600"
            >

                <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="curso.imagen_curso.guid"
                >
                    <v-card-title>{{curso.nombre}}</v-card-title>
                </v-img>

                <v-card-text class="text--primary">
                    <p>{{curso.texto_inicial}}</p>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="verde"
                    text
                    @click="ingresarCurso(curso.id)"      
                >
                    Ver detalle
                </v-btn>

                <v-btn
                    color="verde"
                    text
                    @click="comprarCurso(curso.id)"
                >
                    Comprar
                </v-btn>
                </v-card-actions>
            </v-card>

        </v-col>

    </v-row>

    </v-container>
</template>

<script>
import ToolbarPrincipal from "../components/ToolbarPrincipal";

export default {
    created(){
        this.categoriaId = this.$route.params.idCategoria;
        this.cargarCursos();
        this.obtenerCategoria();
    },
    data () {
        return {
            data:"hola",
            categoria:"",
            categorias:[],
            cursos:[]
        }
    },
    methods:{
        cargarCursos(){
            this.$http
                .get("wp/v2/curso?categories="+this.categoriaId)
                .then(request => {
                    this.cursos = request.data;
                    console.log(this.cursos);
                })
                .catch(() => {

                });
        },
        obtenerCategoria(){
            this.$http
                .get("wp/v2/categories/" + this.categoriaId)
                .then(request => {
                    this.categoria = request.data;
                    console.log(this.cursos);
                })
                .catch(() => {

                });
        },
        ingresarCurso (idCurso) {
            this.loading = true
            this.$router.push("/cursos/"+idCurso);
        },
        comprarCurso( cursoId ){
            this.$http
            .post("my_rest_server/v1/user-inscribed", {
                username: localStorage.username,
                courseID: cursoId
            })
            .then(request => {
                this.$router.push("/mis-cursos");
            })
            .catch(error => console.log(error));

        }
    },
    components:{
        ToolbarPrincipal
    }

}
</script>

<style>

</style>