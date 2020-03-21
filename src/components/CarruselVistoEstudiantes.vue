<template>
  <v-carousel class="vertical-center-carousel" hide-delimiters light>
    <v-carousel-item
      v-for="i in 3" 
      :key="i" 
    >
        <v-row
        >
          <v-col 
            v-for="curso in cursosTags"
            :key="curso.name" sm="4"
          >
              <v-card
                class="mx-auto"
                max-width="400"
                >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://i.ytimg.com/vi/7TezZ2JbvZs/maxresdefault.jpg"
                >
                </v-img>
                <v-card-title class="background-shape">Programación en Java</v-card-title>
  
                <v-card-subtitle class="pb-0">Básico</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div><p>Este curso es dedicado para los nuevos en Java</p></div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="#34B3E1"
                    text
                  >
                    Comprar
                  </v-btn>

                  <v-btn
                    color="#34B3E1"
                    text
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
      this.cargarCursos();
    },
    data () {
      return {
        cursos:[],
        tags:[],
        cursosTags:[],
        tab: null,
        destacadoId:null     
      }
    },
    methods: {
    cargarTags(){
      this.$http
        .get("http://aquilesypedrotesis.host/wp-json/wp/v2/tags")
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
    cargarCursos(){
      this.$http
        .get("http://aquilesypedrotesis.host/wp-json/wp/v2/curso")
        .then(request => {
          this.cursos = request.data;
          this.cargarTags();
        })
        .catch(() => {

        });
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

  .background-shape{

  }

</style>
