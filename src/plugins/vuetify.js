import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#E6E6E6',
        secondary: '#FCD60D',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#34B3E1',
        warning: '#FFC107'
      },
    },
  },
});
