<template>
    <nav>
        <v-app-bar
            app
            clipped-left
            color="primary"
            dark
        >
        <v-app-bar-nav-icon color="black" @click="menu=!menu"></v-app-bar-nav-icon>
        
        <div class="d-flex align-center">
            <router-link to="/">
                <v-img
                    alt="UCAB lOGO"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="200"
                    src="https://du.ucab.edu.ve/images/LogoUCAB600x123.png"
                    width="255"
                />
            </router-link>
        </div>

        <v-spacer></v-spacer>
        
        <v-btn icon color="black">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

      <router-link to="/">
        <v-btn
          target="_blank"
          text
          color="black"
        >
          <span class="mr-2">Inicio</span>

        </v-btn>
      </router-link>

        <div v-if="!currentUser">
            <router-link to="/login">
            <v-btn
                target="_blank"
                text
                color="black"
            >
                <span class="mr-2">Iniciar sesión</span>
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
            </router-link>
            
            <router-link to="/signup">
            <v-btn
            target="_blank"
            text
            color="black"
            >
            <span class="mr-2">Regístrate</span>
            <v-icon>mdi-pencil-box-outline</v-icon>
            </v-btn>
            </router-link>
        </div>

        <div v-if="currentUser">
            <router-link to="/perfil">
            <v-btn
                target="_blank"
                text
                color="black"
            >
                <span class="mr-2">Mi Perfil</span>
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
            </router-link>
            
            <router-link to="/mis-cursos">
                <v-btn
                    target="_blank"
                    text
                    color="black"
                >
                    <span class="mr-2">Mis Cursos</span>
                    <v-icon>mdi-pencil-box-outline</v-icon>
                </v-btn>
            </router-link>

            <v-btn
                target="_blank"
                text
                color="black"
				@click="cerrarSesion()"
            >
                <span class="mr-2">Cerrar Sesión</span>
                <v-icon>mdi-close-box-outline</v-icon>
            </v-btn>
        </div>
    </v-app-bar>

        <v-navigation-drawer       
            app 
            v-model="menu" 
            color="primary"   
            clipped
            width="25%"
            >
            <v-container>
                <v-list
                    dense
                    nav
                    class="py-0"
                >
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="title">
                                {{curso.nombre}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider color="#34B3E1"></v-divider>



                </v-list>
                <v-list class="pt-4" height="auto" width="">
                    <v-list-item >
                        <v-select
                            :items="modulos"
                            v-model="moduloSeleccionado"
                            label="Modulo"
                            outlined
                            color="success"
                            @change="cambiarModulo($event)"
                            ></v-select>
                    </v-list-item>
                </v-list>
                <v-list>
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
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    props:[ "curso" ,"leccion"],
    data: () => ({
        drawer: false,
        group: null,
        menu:true,
        icon: "mdi-notebook",
        moduloSeleccionado:"",
        modulos:[],
        lecciones:[],
        model: 1,
    }),
    computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
    watch: {
        group () {
            this.drawer = false
        },
        $route(to, from) {
            document.title = to.meta.title || 'Some Default Title';
        },
    },
    created(){
        this.cargarModulos();
        this.cargarLecciones();
    },
    methods:{
        cargarModulos(){

            this.curso.modulo.forEach(modulo => {
                this.modulos.push(modulo.post_title);
                this.moduloSeleccionado = modulo.post_title;
            });    
            
        },
        cargarLecciones(){
            this.curso.modulo.forEach( modulo =>{

                if(modulo.post_title == this.moduloSeleccionado){
                    this.lecciones = modulo.leccion;
                }

            });
        },
        cambiarModulo(event){
            this.cargarLecciones();
        },
        cambiarLeccion(idLeccion){
            this.$router.push("/cursos/"+this.curso.id+"/leccion/"+idLeccion+"/aprender");
            this.$router.go();
		},
		cerrarSesion(){
			// Se procede a hacer logout del usuario, y se borran las variables local que tenga
			delete localStorage.token;
			delete localStorage.username;
			delete localStorage.email;
			this.$store.dispatch("logout");
			this.$router.push("/");
		}
    },
  }
</script>

<style>
.v-navigation-drawer__border {
  display: none
}
</style>