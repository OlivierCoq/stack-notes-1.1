<template>
  <v-container id="ctr-notes_list" class="gray-1-bg" rounded>
    <v-row class="h-inherit">
      <v-col class="h-inherit">
        <div class="d-flex flex-column h-100">
          <v-text-field 
            v-model="state.search" 
            background-color="gray-2-bg"
            color="gray-4"
            :placeholder="state.displayed_notes.length ? 'Find a note' : 'Create a note!' "
            class="search_field mt-0 mb-5 py-0 secondary-font gray-4"
          /> 
          <!-- loop through notes -->
          <div class="ctr-notes mt-2">
            <div
              v-for="note in state.displayed_notes" 
              :key="note.id" 
              class="px-3 pt-1 pb-4 shadow-1 gray-2-bg note my-3 me-2"
              dark
              :class="note === state.selected_note ? 'selected-note' : ''"
              @click="select_note(note)"
            >
              <h3 class="gray-4 secondary-font mt-3 mb-0">{{ note.title }}</h3>
              <div class="gray-4 secondary-font m-0" v-html="note.preview"></div>
            </div>
          </div>
          <v-spacer />
          <v-btn class="green-bg gray-4 secondary-font m-0">
            <!-- <v-icon icon="mdi-plus" color="primary"></v-icon> &nbsp; --> New Note 
            <v-dialog v-model="state.new_note_dialog" activator="parent" dark>
              <v-card>
                <v-card-title>New Note</v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field 
                      v-model="state.new_note.title" 
                      label="Title" 
                      color="gray-4"
                      dark
                      small
                      dense
                      flat
                      class="secondary-font"
                      @keydown.enter.prevent="newNote()"
                    />
                  </v-form>
                  <p v-show="state.new_note.error" class="primary-color m-0 p-0">{{ state.new_note.error }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn class="gray-2-bg gray-4 secondary-font" @click="state.new_note_dialog = false">
                    <!-- <v-icon small icon="mdi-alpha-x-circle-outline"></v-icon> &nbsp;  -->
                    Cancel
                  </v-btn>
                  <v-btn class="green-bg gray-4 secondary-font" @click="newNote()">
                    <!-- <v-icon small icon="mdi-plus"></v-icon> &nbsp;  -->
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>

    </v-row>
  </v-container>
</template>
<script>
import { reactive, watch, ref, computed, onBeforeMount } from 'vue'
import fs from 'fs'
// import pathModule from 'path'
import { app } from '@electron/remote'
import 'core-js';

export default {
  name: 'NotesList',
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  emits: ['select-note'],
  setup(props, context) {
    // Data:
    const path = ref(app.getAppPath())
    const state = reactive({
      selected_note: null,
      search: '',
      search_notes: null,
      displayed_notes: [],
      new_note_dialog: false,
      new_note: {
        data: {
          title: ``,
          content: `//write code or notes here! :)`,
          date: new Date().getTime(),
          error: false
        }
      },
      local_path: `${path._rawValue}/local`
    })
    const select_note = (note) => {
            state.selected_note = note
            context.emit('select-note', note)
          },
          newNote = () => {
            if(!state.new_note.title.length){
              state.new_note.error = 'Title is required.'
        } else {

          // Save to file:
          try {

            fs.writeFileSync(`${path._rawValue}/local/${state.new_note.title}.json`, JSON.stringify(state.new_note))
            state.displayed_notes.push(state.new_note)


                state.new_note.error = false
                state.new_note_dialog = false
                state.new_note = {
              data: {
                content: `//write code or notes here! :)`,
                date: new Date().getTime(),
                title: ``,
                error: false
              },
                }
              } catch (err) {
                console.error(err)
              }
            }
          },
          setup_notes = () => {
            state.displayed_notes = props.notes
          }
    
    onBeforeMount(() => {
      setup_notes();
    })

    return {
      state,
      // Methods:
      select_note,
      newNote,
    }
  }
}
</script>
<style lang="scss" scoped>
#ctr-notes_list {
  height: 480px;

  .search_field {
    border-radius: 5px; 
    max-height: 40px;

    .v-input__slot {
      padding: 0 10px;}
  }

  .search_field input::placeholder,
  .search_field input {
    color: white !important;
    opacity: 1;
  }

  .ctr-notes {
    height: 360px;
    width: 100%;
    overflow-y: scroll;
    
    .note {
      border-radius: 5px;

      &:hover {
        cursor: pointer;
        background-color: darken($gray-2, 3%) !important;
      }
    }
    .selected-note {
      background-color: darken($gray-2, 3%) !important;
    }
  }
}
.h-inherit { height: inherit; }
.h-100 { height: 100%; }
.green-bg {
  &:hover {
    background-color: darken($green, 3%) !important;
  }
}
::placeholder {
  color: white !important;
}
</style>
