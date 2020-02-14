<template>
  <v-container fluid>
        <v-row>
          <v-col
            sm="4"
            lg="4"
            xl="4"
          >

            <lateral-aprender v-if="loading" :curso="curso"></lateral-aprender>

          </v-col>
          <v-col
            sm="8"
            lg="8"
            xl="8"
          >
            <leccion-aprender v-if="loadingLeccion" :curso="curso" :leccion="leccion"></leccion-aprender>
            
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
import LateralAprender from "../components/LateralAprender.vue"
import LeccionAprender from "../components/LeccionAprender.vue"


export default {
    created(){
        this.curso = this.$route.params.idCurso;
        this.leccion = this.$route.params.idLeccion;
        this.obtenerCursoActual();
        this.obtenerLeccionActual();
    },
    data: () => ({
        curso : "",
        leccion: "",
        loading: false,
        loadingLeccion:false
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

        },
        obtenerLeccionActual(){
            this.$http
            .get("wp/v2/leccion/"+this.leccion)
            .then(request => { 
                    this.leccion = request.data;
                    console.log(this.leccion);
                    this.loadingLeccion = true;
                })
            .catch((error) => { console.log(error)});
        }
    },
    components:{
        LateralAprender,
        LeccionAprender
    }
}
</script>