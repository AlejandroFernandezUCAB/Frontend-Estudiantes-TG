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

  <v-menu open-on-hover bottom offset-y class="mx-3">
        <template v-slot:activator="{ on }" >
		
				<v-btn
					target="_blank"
					text
					color="black"
					v-on="on"
					class="mx-3"
					@click="irACategoria(0)"
				>
					<span class="mr-2">Cursos</span>
					<v-icon>mdi-notebook-outline</v-icon>
				</v-btn>
	
        </template>

        <v-list>
          <v-list-item
            v-for="(categoria, index) in categorias"
            :key="index"
          >
              <v-btn
                target="_blank"
                text
                color="black"
              >
                <v-list-item-title @click="irACategoria(categoria.id)">{{ categoria.name }}</v-list-item-title>
              </v-btn>

          </v-list-item>
        </v-list>
      </v-menu>

      	<div v-if="!currentUser">
			<router-link to="/login">
				<v-btn
					target="_blank"
					text
					color="black"
					class="mx-3"
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
				class="mx-3"
				>
					<span class="mr-2">Regístrate</span>
					<v-icon>mdi-pencil-box-outline</v-icon>
				</v-btn>
			</router-link>
      	</div>
        <v-menu open-on-hover bottom offset-y v-if="currentUser">
			<template v-slot:activator="{ on }">
				<v-btn
					target="_blank"
					text
					color="black"
					v-on="on"
					class="mx-3"
				>
					<span class="mr-2">Mi Cuenta</span>
					<v-icon>mdi-account-outline</v-icon>
				</v-btn>
			</template>

			<v-list class="text-center">
				<v-list-item
				>
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

				</v-list-item>
				<v-list-item>
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
				</v-list-item>
				<v-list-item>
					<router-link to="/mis-medallas">
						<v-btn
							target="_blank"
							text
							color="black"
						>
							<span class="mr-2">Mis Medallas</span>
							<v-icon>mdi-pencil-box-outline</v-icon>
						</v-btn>
					</router-link>
					</v-list-item>
				<v-list-item>
					<router-link to="/mis-certificados">
						<v-btn
							target="_blank"
							text
							color="black"
						>
							<span class="mr-2">Mis certificados</span>
						<v-icon>mdi-pencil-box-outline</v-icon>
					</v-btn>
					</router-link>
				</v-list-item>
				<v-list-item>
					<v-btn
						target="_blank"
						text
						color="black"
						@click="cerrarSesion()"
					>
						<span class="mr-2">Cerrar Sesión</span>
						<v-icon>mdi-close-box-outline</v-icon>
					</v-btn>
				</v-list-item>
			</v-list>
      </v-menu>
    </v-app-bar>

        <v-navigation-drawer v-if="!loading"      
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
                    <v-list-item-group  v-model="selector" mandatory color="success">
                        <v-list-item
                            v-for="leccion in lecciones"
                            :key="leccion.ID"
                            @click="cambiarLeccion(leccion.ID)"
                            active-class="v-item--active"
                            isActive="true"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title v-text="leccion.nombre"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                    <v-row v-if="showGenerate">
                        <v-btn v-if="!generado" large color="success mt-10" @click="generarCertificadoDigital(curso.id)">Generar Certificado Digital</v-btn>
                        <v-btn v-if="generado" large color="success mt-10" @click="verCertificados()">Ver Certificado Digital</v-btn>
                        <v-btn v-if="!generadoFisico" large color="success mt-10" @click="generarCertificadoFisico(curso.id)">Generar Certificado Fisico</v-btn>
                    </v-row>
                </v-list>
            </v-container>
        </v-navigation-drawer>
        <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    props:[ "curso" ,"leccion"],
    data: () => ({
        drawer: false,
        group: null,
        generado:false,
        generadoFisico:false,
        menu:true,
        icon: "mdi-notebook",
        moduloSeleccionado:"",
        modulos:[],
        lecciones:[],
        selector: 0,
        idLeccion:"",
        loading:true,
        showGenerate:false,
        totalEvaluation:0,
        totalAprobado:0
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
        this.idLeccion = this.$route.params.idLeccion;
        this.cargarModulos();
        this.cargarLeccionActual();
        this.checkShowGenerate();
        this.checkGenerateCertificate();
        this.checkGenerateCertificatePhysical();
    },
    methods:{
        generarCertificadoFisico (idCurso) {
            this.$router.push("/generar-fisico/"+idCurso);
        },
        checkShowGenerate(){
            this.searchTotalEvaluation(this.curso.id);
        },
        searchTotalEvaluation(idCurso){
             this.$http
                .get("wp/v2/curso/"+idCurso)
                .then(request => {
                    

                     request.data.modulo.forEach(modulo => {
                         let keys = Object.keys(modulo.leccion);
                         keys.forEach(key => {
                             if(modulo.leccion[key].evaluacion){
                                this.totalEvaluation++;
                            }
                         })
                     })
                     console.log(this.totalEvaluation);
                     this.checkTotalAprobado();
                })
                .catch((error) => { console.log(error)});
        },
        checkTotalAprobado(){
            var porcentaje;
            this.$http
            .post("my_rest_server/v1/certificate/totalApprove", {
                username: this.currentUser.username,
                id_course: this.curso.id
            })
            .then(request => { 
                console.log(request.data)
                this.totalAprobado= request.data[0].cantidadAprobado;
                porcentaje = (this.totalAprobado*100)/this.totalEvaluation;
                console.log(porcentaje);
                if(porcentaje>=80){
                    this.showGenerate=true;
                }
                this.loading=false;
            })
            .catch((error) => { console.log(error)});
        },
        checkGenerateCertificate(){

            this.$http
            .post("my_rest_server/v1/certificate/findByCourse", {
                username: this.currentUser.username,
                id_course: this.curso.id
            })
            .then(request => { 
                console.log(request.data.length);
                if(request.data.length==1){
                    this.generado=true;
                }else{
                    this.generado=false;
                }
                
                })
            .catch((error) => { console.log(error)});
        },
        checkGenerateCertificatePhysical(){

            this.$http
            .post("my_rest_server/v1/certificate/findByCoursePhysical", {
                username: this.currentUser.username,
                id_course: this.curso.id
            })
            .then(request => { 
                console.log(request.data.length);
                if(request.data.length==1){
                    this.generadoFisico=true;
                }else{
                    this.generadoFisico=false;
                }
                
                })
            .catch((error) => { console.log(error)});
        },
        generarCertificadoDigital(idCurso){
            console.log("en generar"+idCurso)
            this.$http
            .post("my_rest_server/v1/certificate/generate", {
                username: this.currentUser.username,
                id_course: idCurso
            })
            .then(request => { 
                console.log(request);
                alert("Se genero el certificado digital")
                this.verCertificados();
                })
            .catch((error) => { console.log(error)});
        },
        verCertificados(){
        
        this.$router.push("/mis-certificados");
      },
        cargarModulos(){

            this.curso.modulo.forEach(modulo => {
                this.modulos.push(modulo.post_title);
            });    
            
        },
        cargarLecciones(){
            this.curso.modulo.forEach( modulo =>{

                if(modulo.post_title == this.moduloSeleccionado){
                    this.lecciones = modulo.leccion;
                }

            });
        },
        cargarLeccionActual(){

            for (const modulo of this.curso.modulo) {
                
                var leccionesObserver = modulo.leccion;
                leccionesObserver =  JSON.parse(JSON.stringify(leccionesObserver));
                
                var lecciones = Object.keys(leccionesObserver);

                var contador = 0;

                lecciones.forEach(key => {
                    
                    let leccion = leccionesObserver[key];
                    
                    if(leccion.id == this.idLeccion){

                        this.moduloSeleccionado = modulo.post_title;
                        this.lecciones = modulo.leccion;
                        this.selector = contador;

                    }

                    contador++;

                })

            }


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

.v-btn:not(.v-btn--round).v-size--default {
    
    padding: 0 0px !important;
}
</style>