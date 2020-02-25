<template>
  <main 
    class="px-5">
      <v-row>
          <v-col 
            sm="12"
            lg="12"
            xl="12"
            >
              <div>
                 <h1 class="display-1">{{leccion.nombre}}</h1>
              </div>

              <div align="center">
                <video width="55%" controls autoplay>
                    <source :src="leccion.video.guid" type="video/mp4">
                </video>
              </div> 
                <div 
                    class="mt-4"
                    
                    align="left
                    ">
                </div>
                <div><p>Para continuar con el curso por favor seleccione la lección del lado izquierdo</p></div>
          </v-col>
      </v-row>
  </main>
</template>

<script>

export default {
    props:["leccion"],
    created(){
      console.log(this.leccion);
    },
    data:() => ({

    }),
    methods(){
      
    },
    components:{
      
    }
}
</script>

<style>
video {
    width: 55%;
    
    object-fit: cover;
}
</style>