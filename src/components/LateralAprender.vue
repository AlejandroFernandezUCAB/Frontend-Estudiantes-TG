<template>
    <v-container> 
        <v-select
          :items="modulos"
          v-model="moduloSeleccionado"
          label="Modulo"
          outlined
          color="success"
          @change="cambiarModulo($event)"
        ></v-select>
      <v-list fill-width>
        <v-list-item-group  v-model="model" mandatory color="success">
            <v-list-item
                v-for="leccion in lecciones"
                :key="leccion.ID"
                @click="cambiarLeccion(leccion.ID)"
            >
            <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title v-text="leccion.nombre"></v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
        </v-list>
    </v-container>
</template>

<script>
export default {
    props:[ "curso" ,"leccion"],
    created(){
        this.cargarModulos();
        this.cargarLecciones();
    },
    methods:{
        cargarModulos(){

            this.curso.modulo.forEach(modulo => {
                this.modulos.push(modulo.post_name);
                this.moduloSeleccionado = modulo.post_name;
            });    
            
        },
        cargarLecciones(){
            this.curso.modulo.forEach( modulo =>{

                if(modulo.post_name == this.moduloSeleccionado){
                    this.lecciones = modulo.leccion;
                }

            });
        },
        cambiarModulo(event){
            this.cargarLecciones();
        },
        cambiarLeccion(idLeccion){
            this.$router.push("/cursos/"+this.curso.id+"/aprender/leccion/"+idLeccion);
            this.$router.go();
        }
    },
    data: () => ({
        icon: "mdi-notebook",
        moduloSeleccionado:"",
        modulos:[],
        lecciones:[],
        model: 1,
    }),
}
</script>

<style>

</style>