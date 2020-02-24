<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Some Default Title';
    },
  }
};
</script>
