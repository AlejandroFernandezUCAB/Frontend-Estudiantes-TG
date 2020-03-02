<template>
  <main 
    class="px-5">
      <v-row>
          <v-col 
            sm="12"
            lg="12"
            xl="12"
            >
              <section align="center" width="100%" height="auto">
                <video width="89%" controls autoplay>
                    <source :src="leccion.video.guid" type="video/mp4">
                </video>
              </section>

              <section>
                <div>
                  <h2 class="subtitle-1">{{curso.nombre}}</h2>
                  <h1 class="title">{{leccion.nombre}}</h1>
                </div>
                <v-divider color="#34B3E1"></v-divider>
                <div class="mt-4" align="justify">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis metus lobortis, condimentum justo a, ullamcorper elit. Sed vitae viverra metus, vitae varius eros. Ut orci diam, malesuada ac urna et, porta consectetur ex. Cras ut dictum ipsum. Cras at risus fringilla, volutpat sem sit amet, euismod lectus. Nunc sed viverra diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel est convallis, vestibulum enim sit amet, efficitur libero. Sed at mollis odio, in eleifend urna. Ut vulputate dignissim risus in aliquet. Curabitur congue, tellus sit amet porta ultricies, ipsum eros hendrerit ligula, eget lobortis enim risus eget enim. Vivamus feugiat, lectus nec ornare porta, lectus elit sodales neque, vitae consequat justo nibh non diam. Etiam accumsan convallis erat, at interdum nunc tristique sed. In lacinia nunc nec lobortis finibus. In hac habitasse platea dictumst. Mauris vel massa augue.
                  </p>
                </div>
              </section>

              <section>
                <h1 class="title">Evaluación</h1>
                <v-divider color="#34B3E1"></v-divider>
                <p class="mt-4">Para presentar el quiz pulse comenzar</p>
                <div class="my-2" align="center">
                  <v-btn large color="success">Comenzar</v-btn>
                </div>
              </section>

          </v-col>
      </v-row>
  </main>
</template>

<script>

export default {
    props:["leccion", "curso"],
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
    object-fit: cover;
}
</style>