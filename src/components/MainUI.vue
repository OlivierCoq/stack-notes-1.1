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
          <!-- Selected Note -->
        <note-body v-if="state.selected_note" :note="state.selected_note" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import notesList from './sections/notes-list.vue'
import noteBody from './sections/note-body.vue'
import actionBar from './sections/action-bar.vue'

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
          // console.log('holup', stats)
          return {
            name: file,
            title: file.split('.')[0],
            data: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')),
            preview: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')).content?.substring(0, 45) + ' ...',
            created_at: stats.birthtime.toDateString(),
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
    noteBody,
    actionBar
  }
}
</script>
<style lang="scss">
#main-ui {
  height: 100vh;
}
</style>