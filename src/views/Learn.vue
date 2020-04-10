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
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    created(){
        this.curso = this.$route.params.id;
        this.obtenerCursoActual();
    },
    data: () => ({
        curso : "",
        loading: false,
        leccionesVistas:[]
    }),
    methods:{
        obtenerCursoActual(){
            this.$http
            .get("wp/v2/curso/"+this.curso)
            .then(request => { 
                    this.curso = request.data;
                    console.log(this.curso);
                    this.loading = true;
                    this.obtenerUltimaLeccionVista(this.curso)
                })
            .catch((error) => { console.log(error)});

        },
        obtenerUltimaLeccionVista(curso){
            this.$http
                .post("my_rest_server/v1/user/getAllLessons?username="+this.currentUser.username+"&id_course="+curso.id)
                .then (request => {
                    this.leccionesVistas = request.data;
                    console.log(this.leccionesVistas);
                    this.pasarDeStringADate();
                    this.ordenarArrayPorFechaDescenciente();
                    this.reedireccionarLeccion();
                })
        },
        pasarDeStringADate(){

            for (let i = 0; i < this.leccionesVistas.length; i++) {
                
                const leccion = this.leccionesVistas[i];
                this.leccionesVistas[i].reg_date = new Date(leccion.reg_date) ;
                
            }

        },
        ordenarArrayPorFechaDescenciente(){

            this.leccionesVistas.sort(function (a, b) {
                if (a.reg_date > b.reg_date) return -1;
                if (a.reg_date < b.reg_date) return 1;
                return 0;
            });
        },
        reedireccionarLeccion(){
            console.log(this.curso);
            if(this.leccionesVistas.lenght != 0){
                //console.log("/cursos/"+this.curso.id+"/leccion/"+this.leccionesVistas[0].id_course+"/aprender");
                this.$router.push("/cursos/"+this.curso.id+"/leccion/"+this.leccionesVistas[0].id_lesson+"/aprender");
            }
            
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