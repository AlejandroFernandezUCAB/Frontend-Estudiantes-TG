<template>
    <v-container fill-height>
        <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col 
                sm="12"
                lg="12"
                cols="12"
                
            >
                <h1>Mis Certificados</h1>
            </v-col>

            <v-col              
                sm="4"
                lg="4"
                cols="4"
                v-for="certificado in certificadosAdquiridos"
                :key="certificado.id"
                >

                    <ol>
                    <li>{{certificado.url}}</li>
                    </ol>
                   
                        
            </v-col>
        </v-row>
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
      certificadosAdquiridosResponse:[]
    }),
    methods: {
      ingresarCurso (idCurso) {
        this.loading = true
        this.$router.push("/cursos/"+idCurso);
      },

      getMyCertificate(){
          
        this.$http
            .post("my_rest_server/v1/certificate/findByUser", {
                username: this.currentUser.username
            })
            .then(request => { ;
                console.log(request.data);
                this.certificadosAdquiridosResponse = request.data
                this.getDetailCertificate(this.certificadosAdquiridosResponse);
                })
            .catch((error) => { console.log(error)});
      },
       getDetailCertificate(certificados){

          certificados.forEach(certificado => {
            
             this.certificadosAdquiridos.push( certificado );
             console.log(this.certificadosAdquiridos)
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