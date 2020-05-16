<template>
    <v-container fill-height>
        <toolbar-principal></toolbar-principal>
        <v-row v-if="!loading">
            
                <v-col 
                sm="12"
                lg="12"
                cols="12"
                
                >
                <h1>Mis Medallas</h1>
                 </v-col>
        <section v-if="noHayMedallas == false">
                <v-col              
                sm="4"
                lg="4"
                cols="4"
                v-for="medallas in medallasAdquiridas"
                :key="medallas.data.id"
                >

                <v-card
                    :loading="loading"
                    class="mx-auto"
                    max-width="auto"
                >
                    <v-img
                        height="385"
                        width="350"
                        :src="medallas.data.imagen.guid"
                    ></v-img>

                    <v-card-title>{{medallas.data.nombre}}</v-card-title>
                    <v-card-subtitle>x{{medallas.repeat}}</v-card-subtitle>
                    <v-card-text>
                        <strong>{{medallas.data.texto}}</strong>
                    </v-card-text>
                
                </v-card>
            </v-col>
            </section>
            <section  v-if="noHayMedallas == true">
                
                <v-col
                               
                    sm="12"
                    lg="12"
                    cols="12"
                    >
                <h2 class="text-center">
                    Usted aún no ha adquirido medallas
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
        this.getMyBadges();
    },
    computed: {
    ...mapGetters({ currentUser: "currentUser" })
    },
    data: () => ({
      loading: true,
      selection: 1,
      medallasAdquiridas:[],
      medallasAdquiridasResponse:[],
      noHayMedallas:true
    }),
    methods: {
      getMyBadges(){
        this.$http
            .post("my_rest_server/v1/badges/getAll", {
                username: this.currentUser.username
            })
            .then(request => { 
                this.medallasAdquiridasResponse = request.data
                //console.log(this.medallasAdquiridasResponse)
                if(this.medallasAdquiridasResponse.length == 0){

                    this.noHayMedallas = true;
                    this.loading=false;

                }else{

                    this.noHayMedallas = false;
                    this.getDetailBadges(this.cursosAdquiridosResponse);

                }
            
                })
            .catch((error) => { console.log(error)});
      },
      getDetailBadges(){
          console.log(this.medallasAdquiridasResponse)
          this.medallasAdquiridasResponse.forEach(medallas => {
            this.$http
            .get("wp/v2/medalla/"+medallas.id_badge)
            .then(request => { 

                  var medallasObject ={
                    data:request.data,
                    repeat:medallas.total
                }

                this.medallasAdquiridas.push( medallasObject );
               
                })
            .catch((error) => { console.log(error)});
          });
        this.loading=false;
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