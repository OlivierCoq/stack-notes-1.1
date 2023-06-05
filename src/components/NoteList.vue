<template>
  <div class="note-list bg-grey-darken-4 d-flex justify-space-between flex-column">
    <div>
      <div class="d-flex align-center px-5 pt-1">
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
    <v-divider></v-divider>
    

    <note-preview
      v-for="note in state.notes"
      :note="note"
      :key="note.path"
    ></note-preview>
    </div>
    

    <div class="d-flex align-center justify-center mb-3">
      
      <v-btn
        color="secondary"
        variant="outlined"
        class="mx-auto w-90"
        flat
        @click="state.adding_new_note = true"
      >
        <strong>+ New Note</strong>

        <v-dialog v-model="state.adding_new_note" width="400px" theme="dark">
          <v-card>
            <v-card-text>
              <div class="d-flex align-center justify-center py-2">
                <note-icon />
              </div>

              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <h3 class="primary-font">Create a note ✍️</h3>
                  <p class="grey-lighten-3">
                    Add a new note to your collection.
                  </p>
                </div>
              </div>
              <v-row class="mb-3">
                <v-col cols="12">
                  <v-text-field
                    v-model="state.new_note.name"
                    label="Note Name"
                    persistent-placeholder
                    density="compact"
                    class="w-100"
                    hide-details
                    variant="underlined"
                    autofocus
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Created Date"
                    readonly
                    persistent-placeholder
                    density="compact"
                    class="w-100"
                    hide-details
                    :value="currentDate"
                    variant="underlined"
                  />
                </v-col>
                <v-col cols="12">
                  <!-- replace with actual user data when pinia setup -->
                  <v-combobox
                    readonly
                    :items="allUsers"
                    v-model="state.new_note.users"
                    label="Users"
                    multiple
                    variant="underlined"
                    hide-details
                  >
                    <template v-slot:selection>
                      <v-chip size="small">
                        <template v-slot:prepend>
                          <v-avatar class="bg-primary text-uppercase" start
                            >CU</v-avatar
                          >
                        </template>
                        Current User
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="state.adding_new_note = false" size="small"
                >Cancel</v-btn
              >
              <v-btn
                color="primary"
                variant="outlined"
                @click="addNewNote"
                size="small"
                >Add New Note</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, nextTick, computed, ref } from "vue";
import SearchIcon from "./Icons/SearchIcon.vue";
import NotePreview from "./NotePreview.vue";
import NoteIcon from "./Icons/NoteIcon.vue";

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
            content: "<p>this is a markup test for formatting</p>",
          },
        ],
        users: [
          // remove when hooking up to live data

          {
            name: "Current User",
            initials: "CU",
          },
        ],
      },
      notes: [],
    });

    const currentDate = computed(() => {
      const date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    });

    const allUsers = ref([
      {
        name: "Current User",
        initials: "CU",
      },
    ]);

    // Methods

    // From ipc renderer
    const getNotes = () => {
      window.api.receive("get-notes-reply", (response) => {
        if (response.success) {
          state.notes = response.notes;
        } else {
          console.error("Not working", response.error);
        }
      });

      window.api.invoke("get-notes");
    };

    const addNewNote = () => {
      const postObj = {
        name: state.new_note.name,
        date: state.new_note.date,
        tags: [],
        contents: [
          {
            content: "<p>this is a markup test for formatting</p>",
          },
        ],
      };
      window.api
        .invoke("add-new-note", postObj)
        .then((result) => {
          if (result.success) {
            console.log("File saved successfully:", result.filePath);
            nextTick(() => {
              getNotes();
            });
          } else {
            console.error("File save failed:", result.error);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
      state.adding_new_note = false;
    };

    // Lifecycle Hooks
    onMounted(() => {
      console.log("mounted, motherfucker");

      // Listen for async-reply message from main process
      getNotes();

      // If user added a new note:
      window.api.receive("add-new-note-reply", (result) => {
        if (result.success) {
          getNotes();
          console.log("File saved successfully:", result.filePath);
        } else {
          console.error("File save failed:", result.error);
        }
      });
    });

    return {
      // Data
      state,
      // Methods
      addNewNote,
      currentDate,
      allUsers,
    };
  },
  components: {
    SearchIcon,
    NotePreview,
    NoteIcon,
  },
};
</script>

<style lang="scss" scoped>
.note-list {
  height: calc(100vh - 65px);
  &__search-bar {
    input {
      padding-bottom: 0px !important;
    }
  }
  .w-100 {
    width: 100%;
  }
  .w-90 {
    width: 90%;
  }
}
</style>