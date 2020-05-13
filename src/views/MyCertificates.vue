<template>
    <v-container>
        <toolbar-principal></toolbar-principal>
        <v-row v-if="!loading">
            <v-col 
                sm="12"
                lg="12"
                cols="12"
                
            >
                <h1>Mis Certificados</h1>
            </v-col>

            <section v-if="noHayCertificados == false" >
                <v-col
                                
                    sm="4"
                    lg="12"
                    cols="4"
                    v-for="certificadosAdquiridos in certificadosAdquiridos"
                    :key="certificadosAdquiridos.curso.id"
                    >

                    <v-card
                        :loading="loading"
                        class="mx-auto"
                        max-width="auto"
                    >
                        <v-img
                            height="200"
                            :src="certificadosAdquiridos.curso.imagen_curso.guid"
                        ></v-img>

                        <v-card-title>{{certificadosAdquiridos.curso.nombre}}</v-card-title>

                        <v-card-text>
                        <v-row
                            
                            class="mx-0"
                        >
                            <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                            ></v-rating>

                            <div class="grey--text ml-4">4.5 (413)</div>
                        </v-row>
                        </v-card-text>
                
                        <v-card-actions>
                            <v-btn
                                color="success"
                                text
                                @click="verCertificado(certificadosAdquiridos.certificado.url)"                            
                            >
                                Ver Certificado
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </section>
            <section  v-if="noHayCertificados == true">
                
                <v-col
                               
                    sm="12"
                    lg="12"
                    cols="12"
                    >
                <h2 class="text-center">
                    Usted aún no tiene certificados
                </h2>
                </v-col>
            </section>
        </v-row>
          <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ToolbarPrincipal from "../components/ToolbarPrincipal"

  export default {
    created(){
        this.getMyCertificate();
    },
    computed: {
    ...mapGetters({ currentUser: "currentUser" })
    },
    data: () => ({
      loading: false,
      selection: 1,
      certificadosAdquiridos:[],
      certificadosAdquiridosResponse:[],
      noHayCertificados:true,
      loading: true
    }),
    methods: {
      verCertificado (url) {
        window.open(url);
      },
      obtenerCurso (idCurso) {
         this.$http
            .get("wp/v2/curso/"+idCurso)
            .then(request => { 
               console.log(request)
               this.curso=request;
            })
            .catch((error) => { console.log(error)});
      },

      getMyCertificate(){
          
        this.$http
            .post("my_rest_server/v1/certificate/findByUser", {
                username: this.currentUser.username
            })
            .then(request => { 
                console.log(request.data);
                this.certificadosAdquiridosResponse = request.data
                 if(this.certificadosAdquiridosResponse.length == 0){

                        this.noHayCertificados = true;

                    }else{

                        this.noHayCertificados = false;
                        this.getDetailCertificate(this.certificadosAdquiridosResponse);

                    }

                    this.loading=false;
             
                })
            .catch((error) => { console.log(error)});
      },
       getDetailCertificate(certificados){

          certificados.forEach(certificado => {
            var curso;
            this.$http
            .get("wp/v2/curso/"+certificado.id_course)
            .then(request => { 
                curso=request.data;
                console.log(curso)
                var certficadoObject ={
                        certificado:certificado,
                        curso:curso
                    }
                this.certificadosAdquiridos.push( certficadoObject );
                console.log(this.certificadosAdquiridos) 

            })
            .catch((error) => { console.log(error)});

          });

      },
        checkCurrentLogin() {
        // Verifica si el usuario se encuentra login, de no ser asi, lo redirige al home
            if (this.currentUser) {
                this.$router.replace(this.$route.query.redirect || "/");
            }
        },
    },
    computed: {
    ...mapGetters({ currentUser: "currentUser" })
    },
    components:{
        ToolbarPrincipal
    }
  }
</script>

<style>

</style>