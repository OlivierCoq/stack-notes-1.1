<template>
  <div class="note-list bg-grey-darken-3">
    <div class="d-flex align-center bg-grey-darken-4 px-5 pt-1">
      <search-icon class="pr-2"></search-icon>
      <v-text-field
        variant="plain"
        hide-details
        placeholder="Search For Notes"
        density="dense"
        theme="dark"
        rounded="0"
        elevation="0"
        class="note-list__search-bar"
      />
    </div>
    <div class="w-100 d-flex my-2 p-2">
      <v-btn
        color="secondary"
        variant="outlined"
        class="mx-auto w-90"
        flat
        @click="state.adding_new_note = true"
      >
        <strong>+ New Note</strong>

        <v-dialog v-model="state.adding_new_note"
          width="400px"
          theme="dark"
        >
          <v-card>
            <v-card-title class="primary-bg gray-4 secondary-font me-2">
              <span>New Note</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="state.new_note.name"
                label="Note Name"
                placeholder="Note Name"
                outlined
                dense
                class="w-100"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="state.adding_new_note = false">Cancel</v-btn>
              <v-btn color="warning" text @click="addNewNote">Add New Note</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
    <!-- <note-preview v-for="note in tempFiles.notes" :note="note" :key="note.path"></note-preview> -->
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import SearchIcon from "./Icons/SearchIcon.vue";
import NotePreview from "./NotePreview.vue";



export default {
  setup() {
    // will be replaced with files loaded out of fs into pinia
    const state = reactive({
      adding_new_note: false,
      new_note: {
        name: "",
        date: new Date(),
        tags: [],
        contents: [
          {
            content: '<p>this is a markup test for formatting</p>'
          }
        ]
      }
    }) 

    // Methods
    const addNewNote = () => {
      console.log("adding new note");
      console.log(state.new_note);
      const postObj = {
        name: state.new_note.name
      }
      console.log(postObj);
      window.api.invoke("add-new-note", postObj)
      .then((result) => {
          if (result.success) {
            console.log("File saved successfully:", result.filePath);
          } else {
            console.error("File save failed:", result.error);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
      state.adding_new_note = false;
    };

    onMounted(() => {
      console.log("mounted");
      window.api.receive("add-new-note-reply", (result) => {
        if (result.success) {
          console.log("File saved successfully:", result.filePath);
        } else {
          console.error("File save failed:", result.error);
        }
      })
    });

    return {
      // Data
      state,
      // Methods
      addNewNote
    };
  },
  components: {
    SearchIcon,
    NotePreview
  },
};
</script>

<style lang="scss" scoped>
.note-list {
  height: 100%;
  width: 100%;
  &__search-bar {
   input {
      padding-bottom: 0px !important;
    }
  }
  .w-100 { width: 100%; }
  .w-90 { width: 90%; }
}
</style>