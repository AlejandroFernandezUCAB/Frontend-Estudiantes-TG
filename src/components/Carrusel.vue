<template>
  <v-card color="basil">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="categoria in categorias"
        :key="categoria.name"
      >
        {{ categoria.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="categoria in categorias"
        :key="categoria.name"
      >
        <v-card flat color="basil">
          <v-row no-gutters>
            <v-col 
              v-for="curso in tabsCursos(cursos, categoria)" 
              :key="curso.name" :sm="sizeCol(cursos,categoria)"
            >
              <v-card
                class="mx-auto"
                >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="curso.imagen_curso.guid"
                >
                </v-img>

                <v-card-title>{{curso.title.rendered}}</v-card-title>
                <v-card-subtitle class="pb-0">{{categoria.name}}</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>
                    <p v-if="curso.texto_inicial != '' ">{{curso.texto_inicial}}</p>
                    <p v-else>Ingresa y ve el contenido del curso</p>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="#34B3E1"
                    text
                    @click="comprarCurso(curso.id)"
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
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>

  export default  {
    name: 'carrusel-cursos',
    created(){
      this.cargarCursos();
      this.cargarCategorias();
    },
    mounted () {

    },
    data () {
      return {
        cursos:[],
        categorias:[],
        cursosCategoria:[],
        tab: null      
        }
    },
    methods: {
    cargarCategorias(){
      this.$http
        .get("wp/v2/categories")
        .then(request => {
          this.categorias = request.data;
        })
        .catch(() => {

        });
    },
    cargarCursos(){
      this.$http
        .get("wp/v2/curso")
        .then(request => {
          this.cursos = request.data;
          console.log(this.cursos);
        })
        .catch(() => {

        });
    },
    comprarCurso(id){

      this.$http
        .post("my_rest_server/v1/user-inscribed", {
          username: localStorage.username,
          courseID: id
        })
        .then(request => {
          console.log(request.data)
          this.$router.push("/mis-cursos");
        })
        .catch(error => console.log(error));
    },
    tabsCursos(cursos, categoria){
      
      let cursosCategoria = [];
      
      for (let i = 0; i < cursos.length; i++) {
        const element = cursos[i];

        if( element.categories.includes(categoria.id) && cursosCategoria.length < 3){

          cursosCategoria.push(element);

        }

      }

      return cursosCategoria;

    },
    sizeCol( cursos,categoria ){

      let tamanoCursos = this.tabsCursos(cursos, categoria);
      let col = 4;
      
      if( tamanoCursos.length == 3){
        return 4;
      }else if( tamanoCursos.length== 2){
        return 6;
      }else if( tamanoCursos.length == 1){
        return 12
      }else{
        return col;
      }

    },
    computed: {

    }
  }
}


</script>

<style scoped lang="scss">
  .carrusel-cursos {

  }
</style>
