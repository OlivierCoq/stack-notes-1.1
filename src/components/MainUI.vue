<template>
  <div class="bg-grey-darken-4 main-ui">
    <note-tabs class="main-ui__tabs" />
    <app-editor class="main-ui__editor pa-5" />
  </div>
</template>
<script>
import NoteTabs from "./NoteTabs.vue";
import AppEditor from "./AppEditor.vue";
export default {
  components: {
    NoteTabs,
    AppEditor,
  },
};
</script>
<style lang="scss">
.main-ui {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &__editor {
    max-height: 80vh;
    flex: 1;
    overflow-y: auto;
  }
}
</style>