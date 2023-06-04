import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createPinia } from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(createPinia()).use(vuetify).mount('#app')