import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import "vuetify/dist/vuetify.min.css";


Vue.use(Vuetify);

const opts = {
  theme: {
    dark: false
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: 'fa',
  }
};

export default new Vuetify(opts);
