<template>
  <div class="bg-grey-darken-4 main-ui">
    <note-tabs class="main-ui__tabs" />
    <app-editor v-if="store.activeNote.id" class="main-ui__editor" />
  </div>
</template>
<script>
import NoteTabs from "./NoteTabs.vue";
import AppEditor from "./AppEditor.vue";
import { useNotesStore } from "@/stores/notes";
export default {
  setup(){
    const store = useNotesStore();
    return {
      store
    }
  },
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
    // max-height: 80vh;
    flex: 1;
    overflow-y: auto;
  }
}
</style>