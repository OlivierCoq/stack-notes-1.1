<template>
  <v-container fluid id="main-ui" class="gray-3-bg">
    <v-row>
      <logo />
    </v-row>
    <v-row mt-5>
      <v-col cols="4">
                  <notes-list v-if="state.notes" @select-note="select_main_note" :notes="state.notes" ref="notesListRef" />
                        </v-col>
                        <v-col cols="8">
                            <!-- Selected Note -->
                  <note-body v-if="state.selected_note" :note="state.selected_note" @edit-note="handleNoteEdit" @deleteNote="updateNotesList" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { reactive, computed, ref, watch } from 'vue'
import logo from './sections/header-bar/logo.vue'
import notesList from './sections/notes-list.vue'
import noteBody from './sections/note-body.vue'
import actionBar from './sections/action-bar.vue'

import fs from 'fs'
import pathModule from 'path'
import { app } from '@electron/remote'
import 'core-js';

const notesListRef = ref(null)

export default {
  name: 'MainUI',
  props: {
  },
  setup(props, context) {
    // Data:
    const path = ref(app.getAppPath()),
      state = reactive({
        selected_note: false,
        local_path: `${path._rawValue}/local`,
        updating: false,
        notes: null
      }),
      formatSize = (size) => {
        let i = Math.floor(Math.log(size) / Math.log(1024))
        return (
          `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
        )
      }


    // const notes = computed(() => {
    //   const fileNames = fs.readdirSync(state.local_path)
    //   return fileNames
    //     .map(file => {
    //       const stats = fs.statSync(pathModule.join(state.local_path, file))
    //       // console.log('holup', stats)
    //       return {
    //         name: file,
    //         title: file.split('.')[0],
    //         data: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')),
    //         // preview: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')).content?.substring(0, 45) + ' ...',
    //         created_at: stats.birthtime.toDateString(),
    //         size: formatSize(stats.size),
    //       }
    //     })
    //     .sort((a, b) => {
    //       if (a.directory === b.directory) {
    //         return a.name.localeCompare(b.name)
    //       }
    //       return a.directory ? -1 : 1
    //     })
    // })

    // Methods:
    const select_main_note = (note) => {
      state.selected_note = note
    },
      updateNotesList = () => {
        state.notes = false
        const fileNames = fs.readdirSync(state.local_path)
        // So fucking tacky I want to kill myself:
        setTimeout(() => {
          state.notes = fileNames
            .map(file => {
              const stats = fs.statSync(pathModule.join(state.local_path, file))
              // console.log('holup', stats)
              return {
                name: file,
                title: file.split('.')[0],
                data: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')),
                // preview: JSON.parse(fs.readFileSync(pathModule.join(state.local_path, file), 'utf8')).content?.substring(0, 45) + ' ...',
                created_at: stats.birthtime.toDateString(),
                size: formatSize(stats.size),
              }
            })
            .sort((a, b) => {
              if (a.directory === b.directory) {
                return a.name.localeCompare(b.name)
              }
              return a.directory ? -1 : 1
            })
        }, 1)
      },
      handleNoteEdit = (noteContent) => {
        state.selected_note.content = noteContent
      }

    // Init Notes:
    updateNotesList()

    return {
      // data:
      path,
      state,
      // computed:
      // methods: 
      select_main_note,
      handleNoteEdit,
      updateNotesList
    }
  },
  components: {
    logo,
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