<template>
  <div class="bg-grey-darken-4 fill-height">
    <note-tabs />
    <div class="pa-5">
      <app-editor class="fill-height" />
    </div>
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
#main-ui {
  height: 100vh;
}
</style>