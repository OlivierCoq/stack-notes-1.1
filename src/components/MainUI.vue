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
import { reactive, computed, ref, watch, nextTick } from "vue";
import noteBody from "./NoteBody.vue";

import fs from "fs";
import pathModule from "path";
import { app } from "@electron/remote";
import "core-js";

const notesListRef = ref(null);

export default {
  name: "MainUI",
  props: {},
  setup(props, context) {
    // Data:
    const path = ref(app.getAppPath()),
      state = reactive({
        selected_note: false,
        local_path: `${path._rawValue}/local`,
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
      updateNotesList = () => {
        state.notes = false;
        const fileNames = fs.readdirSync(state.local_path);

        nextTick(() => {
          state.notes = fileNames
            .map((file) => {
              const stats = fs.statSync(
                pathModule.join(state.local_path, file)
              );
              // console.log('holup', stats)
              return {
                name: file,
                title: file.split(".")[0],
                data: JSON.parse(
                  fs.readFileSync(
                    pathModule.join(state.local_path, file),
                    "utf8"
                  )
                ),
                // preview: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')).content?.substring(0, 45) + ' ...',
                created_at: stats.birthtime.toDateString(),
                size: formatSize(stats.size),
              };
            })
            .sort((a, b) => {
              if (a.directory === b.directory) {
                return a.name.localeCompare(b.name);
              }
              return a.directory ? -1 : 1;
            });
          state.selected_note = false;
        });
      },
      handleNoteEdit = (noteContent) => {
        state.selected_note.content = noteContent;
      };

    // Init Notes:
    updateNotesList();

    return {
      // data:
      path,
      state,
      // computed:
      // methods:
      select_main_note,
      handleNoteEdit,
      updateNotesList,
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