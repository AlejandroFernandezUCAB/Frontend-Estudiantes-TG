<template>
    <v-container fill-height>
        <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col 
                sm="12"
                lg="12"
                cols="12"
                
            >
                <h1>Mis Medallas</h1>
            </v-col>

            <v-col              
                sm="4"
                lg="4"
                cols="4"
                v-for="medallas in medallasAdquiridas"
                :key="medallas.id"
                >

                <v-card
                    :loading="loading"
                    class="mx-auto"
                    max-width="auto"
                >
                    <v-img
                        height="200"
                        :src="medallas.imagen.guid"
                    ></v-img>

                    <v-card-title>{{medallas.nombre}}</v-card-title>
                    <v-card-text>
                        <strong>{{medallas.texto}}</strong>
                    </v-card-text>
                
                </v-card>
            </v-col>
        </v-row>
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
      loading: false,
      selection: 1,
      medallasAdquiridas:[],
      medallasAdquiridasResponse:[]
    }),
    methods: {
      getMyBadges(){
        this.$http
            .post("my_rest_server/v1/badges/getByUser", {
                username: this.currentUser.username
            })
            .then(request => { ;
                this.medallasAdquiridasResponse = request.data
                //console.log(this.medallasAdquiridasResponse)
                this.getDetailBadges(this.cursosAdquiridosResponse);
                })
            .catch((error) => { console.log(error)});
      },
      getDetailBadges(){
          console.log(this.medallasAdquiridasResponse)
          this.medallasAdquiridasResponse.forEach(medallas => {
            this.$http
            .get("wp/v2/medalla/"+medallas.id_badge)
            .then(request => { 
                let findRepeat=false;
                // for (let i = 0; i < this.medallasAdquiridas.length; i++) {
                //     if(this.medallasAdquiridas[i].id_badge===medallas.id_badge){
                       
                //         findRepeat=true;
                //     }
                    
                // }

                // if(!findRepeat){
                //     this.medallasAdquiridas.push( request.data );
                // }

                this.medallasAdquiridas.push( request.data );
               
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