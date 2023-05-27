<template>
  <v-app>
    <v-layout>
      <v-app-bar theme="dark" elevation="0" class="app__top-bar">
        <app-top-bar />
      </v-app-bar>

      <v-navigation-drawer permanent class="bg-grey-darken-3">
        <note-list/>
      </v-navigation-drawer>

      <v-main>
        <MainUI />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
// import "core-js";
import MainUI from "./components/MainUI.vue";
import AppTopBar from "./components/AppTopBar.vue";
import NoteList from './components/NoteList.vue';
export default {
  setup() {},
  components: {
    MainUI,
    AppTopBar,
    NoteList
  },
};
</script>
<style lang="scss" scoped>
.app {
  &__top-bar {
    border-bottom: 1px solid rgb(255,255,255,.07);
  }
}
</style>
