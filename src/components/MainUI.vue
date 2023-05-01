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
        <notes-list @select-note="select_main_note" :notes="notes" />
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
                <!-- <v-icon small icon="mdi-code-braces" color="grey-lighten-5"></v-icon> &nbsp;  -->
                Code
              </v-btn>
              <v-btn class="primary-bg gray-4 secondary-font me-2">
                <!-- <v-icon small icon="mdi-trash-can" color="grey-lighten-5"></v-icon> &nbsp;  -->
                Delete
              </v-btn>
              <v-btn class="gray-2-bg gray-4 secondary-font me-2">
                <!-- <v-icon small icon="mdi-vuetify" color="grey-lighten-5"></v-icon> &nbsp;  -->
                Save
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import notesList from './sections/notes-list.vue'
import noteBody from './sections/note-body.vue'

import fs from 'fs'
import pathModule from 'path'
import { app } from '@electron/remote'
import 'core-js';

export default {
  name: 'MainUI',
  props: {
  },
  setup() {
      // Data:
    const path = ref(app.getAppPath())
    const state = reactive({
      selected_note: false,
      local_path: `${path._rawValue}/local`
    })
    

    const notes = computed(() => {
      const fileNames = fs.readdirSync(state.local_path)
      return fileNames
        .map(file => {
          const stats = fs.statSync(pathModule.join(state.local_path, file))
          console.log('holup', stats)
          return {
            name: file,
            title: file.split('.')[0],
          }
        })
    })
    
      // Methods:
    const select_main_note = (note) => {
      state.selected_note = note
    }


    return {
      // data:
      state,
      // computed:
      notes,
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