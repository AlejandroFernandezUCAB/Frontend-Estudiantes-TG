<template>
  <v-container fluid>
    
    <toolbar-lecciones :curso="curso"></toolbar-lecciones>

        <v-row>

          <v-col
            sm="12"
            lg="12"
            xl="12"
          >
            <div align="center">

                <h1 class="display-1">Bienvenido a {{curso.nombre}}</h1>
                
                <v-img
                    class="mt-4 borde-redondo"
                    width="60%"
                    :src="curso.imagen_curso.guid"
                ></v-img>

                <div 
                    class="mt-4"
                    v-html="curso.informacion_del_curso" 
                    align="left
                    ">
                </div>
                <div><p>Para continuar con el curso por favor seleccione la lección del lado izquierdo</p></div>
            </div>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import LateralAprender from "../components/LateralAprender.vue"
import ToolbarLecciones from "../components/ToolbarLecciones.vue"

export default {
    created(){
        this.curso = this.$route.params.id;
        this.obtenerCursoActual();
    },
    data: () => ({
        curso : "",
        loading: false
    }),
    methods:{
        obtenerCursoActual(){
            this.$http
            .get("wp/v2/curso/"+this.curso)
            .then(request => { 
                    this.curso = request.data;
                    console.log(this.curso);
                    this.loading = true;
                })
            .catch((error) => { console.log(error)});

        }
    },
    components:{
        LateralAprender,
        ToolbarLecciones
    }
}
</script>

<style>
.borde-redondo{
    border-radius:10%;
}
</style>