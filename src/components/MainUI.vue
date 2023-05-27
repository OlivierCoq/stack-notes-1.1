<template>
<div class="bg-grey-darken-4">
  <note-body
    v-if="state.selected_note"
    :note="state.selected_note"
    @edit-note="handleNoteEdit"
    @deleteNote="updateNotesList"
  />
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import noteBody from "./NoteBody.vue";

const notesListRef = ref(null);

export default {
  name: "MainUI",
  props: {},
  setup(props, context) {
    // Data:
      const state = reactive({
        selected_note: false,
        updating: false,
        notes: null,
      }),
      formatSize = (size) => {
        let i = Math.floor(Math.log(size) / Math.log(1024));
        return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
          ["B", "kB", "MB", "GB", "TB"][i]
        }`;
      };

    // Methods:
    const select_main_note = (note) => {
        state.selected_note = note;
      },
      handleNoteEdit = (noteContent) => {
        state.selected_note.content = noteContent;
      };


    return {
      // data:
      state,
      // computed:
      // methods:
      select_main_note,
      handleNoteEdit
    };
  },
  components: {
    noteBody,
  },
};
</script>
<style lang="scss">
#main-ui {
  height: 100vh;
}
</style>