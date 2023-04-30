<template>
  <v-container fluid id="main-ui" class="gray-3-bg">
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <h1 class="main-font">
          <span class="primary-color">stack</span>
          <span class="gray-4">.</span>
          <span class="secondary-color">notes</span>
          <span class="gray-4">();</span>
        </h1>
      </v-col>
    </v-row>
    <v-row mt-5>
      <v-col cols="4">
        <notes-list @select-note="select_main_note" :notes="state.notes" />
      </v-col>
      <v-col cols="8">
        <v-row>
          <!-- Selected Note -->
          <note-body v-if="state.selected_note" :note="state.selected_note" />
        </v-row>
        <v-row v-if="state.selected_note" class="pb-0 mb-0">
          <v-col cols="4" />
          <v-col cols="8" class="mt-3 mb-0 pb-0">
            <div class="d-flex w-100">
              <v-spacer />
              <v-btn class="secondary-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-code"></v-icon> &nbsp; Code
              </v-btn>
              <v-btn class="primary-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-trash"></v-icon> &nbsp; Delete
              </v-btn>
              <v-btn class="gray-2-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-check"></v-icon> &nbsp; Save
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { reactive } from 'vue'
import notesList from './sections/notes-list.vue'
import noteBody from './sections/note-body.vue'

export default {
  name: 'MainUI',
  setup() {
      // Data:
    const state = reactive({
      notes: [],
      selected_note: false,
    })
      // Methods:
    const select_main_note = (note) => {
      state.selected_note = note
    }


    return {
      // data:
      state,
      // methods: 
      select_main_note    
    }
  },
  components: {
    notesList,
    noteBody
  }
}
</script>
<style lang="scss">
#main-ui {
  height: 100vh;
}
</style>