<template>
  <v-carousel class="vertical-center-carousel" hide-delimiters light>
    <v-carousel-item
      v-for="i in 6" 
      :key="i" 
    >
        <v-row
        >
          <v-col 
            v-for="curso in cursos"
            :key="curso.name"
            sm="4"
            lg="4"
            md="4"
          >
              <v-card
                class="mx-auto"
                max-width="600"
                >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="curso.imagen_curso.guid"
                >
                </v-img>
                <v-card-title class="background-shape">{{curso.nombre}}</v-card-title>
  

                <v-card-text class="text--primary">
                  <div><p>{{curso.texto_inicial}}</p></div>
                </v-card-text>

                <v-card-actions>
                   <v-btn
                      color="verde"
                      text
                      @click="ingresarCurso(curso.id)"      
                        >
                            Ver contenido
                        </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>

  export default  {
    name: 'carrusel-cursos',
    created(){
      this.masVistos();
    },
    data () {
      return {
        cursos:[],
        tags:[],
        cursosMasVistos:[],
        cursosTags:[],
        tab: null,
        destacadoId:null     
      }
    },
    methods: {
      ingresarCurso (idCurso) {
            this.loading = true
            this.$router.push("/cursos/"+idCurso);
        },
    cargarTags(){
      this.$http
        .get("wp/v2/tags")
        .then(request => {
          this.tags = request.data;
          this.tags.forEach(tag => {
            if (tag.name == "destacado"){
              this.destacadoId = tag.id
            }
          });
          this.cursosTags = this.cursosTagsFiltro();
        })
        .catch(() => {

        });
    },
    masVistos(){
       this.$http
        .post("my_rest_server/v1/user/getMoreViewed")
        .then(request => {
          this.cursosMasVistos= request.data;
          this.cargarCursos(this.cursosMasVistos);
        })
        .catch(() => {

        });
    },
    cargarCursos(vistos){

      let keys = Object.keys(vistos);
      keys.forEach(key => {
      let item = vistos[key];
      this.$http
        .get("wp/v2/curso/"+item.id_curso)
        .then(request => {
          this.cursos.push( request.data );
        })
        .catch(() => {

        });
    })
      console.log(this.cursos);
    },
    cursosTagsFiltro( iterador ){
      
      let cursosTags = [];
      
      for (let i = 0; i < this.cursos.length; i++) {
        module
        const curso = this.cursos[i];
        
        if( curso.tags.includes(this.destacadoId)){

          cursosTags.push(curso);

        }

      }
      
      return cursosTags;

    },
    tamanoCursosTab(){
      
      if(this.cursosTags.length % 3 == 1){
        return (this.cursosTags.length/3) + 1;
      }else{
        return this.cursosTags.length;
      }
      
    }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .vertical-center-carousel{
    height: 400px !important;
  }


</style>
