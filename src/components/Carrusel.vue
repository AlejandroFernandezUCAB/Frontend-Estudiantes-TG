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
        @click="tabsCursos(categoria.name)"
      >
        {{ categoria.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="curso in cursosCategoria"
        :key="curso.name"
      >
        <v-card flat color="basil">
          <v-row no-gutters>
            <v-col v-for="i in 3" :key="i" sm="4">
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

                <v-card-title>{{curso.title.rendered}}</v-card-title>
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
        .get("http://172.23.0.3/wp-json/wp/v2/categories")
        .then(request => {
          this.categorias = request.data;
        })
        .catch(() => {

        });
    },
    cargarCursos(){
      this.$http
        .get("http://172.23.0.3/wp-json/wp/v2/curso")
        .then(request => {
          this.cursos = request.data;
        })
        .catch(() => {

        });
    },
    tabsCursos(categoria){
      
      let idCategoriaActual;
      this.cursosCategoria = [];
      for (let i = 0; i < this.categorias.length; i++) {
        
        if (this.categorias[i].name == categoria) {
          idCategoriaActual = this.categorias[i].id;
        }

      }
      
      for (let i = 0; i < this.cursos.length; i++) {
        const element = this.cursos[i];

        if( element.categories.includes(idCategoriaActual)){

          this.cursosCategoria.push(element);

        }

      }
    }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .carrusel-cursos {

  }
</style>
