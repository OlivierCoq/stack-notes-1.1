<template>
  <v-app>
    <v-main>
      <MainUI/>
    </v-main>
  </v-app>
</template>

<script>
import MainUI from './components/MainUI.vue';
export default {
  name: 'App',
  components: {
    MainUI
  },
  data(){
    return {}
  }
};
</script>
