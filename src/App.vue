<template>
  <v-app>
    <v-main>
      <MainUI/>
    </v-main>
  </v-app>
</template>

<script>
import fs from 'fs'
import pathModule from 'path'
import 'core-js';

import { app } from '@electron/remote'
import { computed, ref } from 'vue'
import MainUI from './components/MainUI.vue';

const formatSize = (size) => {
  let i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    `${ (size / Math.pow(1024, i)).toFixed(2) * 1 } ${ ['B', 'kB', 'MB', 'GB', 'TB'][i] }`
  )
} 

export default {
  setup() {
    const path = ref(app.getAppPath()),
          files = computed(() => {
            const fileNames = fs.readdirSync(path.value)
            return fileNames
              .map(file => {
                const stats = fs.statSync(pathModule.join(path.value, file))
                return {
                  name: file,
                  directory: stats.isDirectory(),
                  size: formatSize(stats.size),
                  created: stats.birthtime,
                  modified: stats.mtime,
                  accessed: stats.atime,
                  permissions: {
                    owner: {
                      read: stats.mode & 0o400,
                      write: stats.mode & 0o200,
                      execute: stats.mode & 0o100
                    },
                    group: {
                      read: stats.mode & 0o40,
                      write: stats.mode & 0o20,
                      execute: stats.mode & 0o10
                    },
                    others: {
                      read: stats.mode & 0o4,
                      write: stats.mode & 0o2,
                      execute: stats.mode & 0o1
                    }
                  },
                  owner: stats.uid,
                  group: stats.gid,
                  isFile: stats.isFile(),
                  isDirectory: stats.isDirectory(),
                  isBlockDevice: stats.isBlockDevice(),
                  isCharacterDevice: stats.isCharacterDevice(),
                  isSymbolicLink: stats.isSymbolicLink(),
                  isFIFO: stats.isFIFO(),
                  isSocket: stats.isSocket(),
                  isHidden: file.startsWith('.'),
                  isSystem: file.startsWith('$'),
                  isTemporary: file.startsWith('~'),
                  isCompressed: file.endsWith('.zip') || file.endsWith('.rar') || file.endsWith('.7z'),
                  isImage: file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif') || file.endsWith('.svg'),
                  isVideo: file.endsWith('.mp4') || file.endsWith('.avi') || file.endsWith('.mkv') || file.endsWith('.mov') || file.endsWith('.wmv'),
                  isAudio: file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.ogg') || file.endsWith('.flac'),
                  isDocument: file.endsWith('.pdf') || file.endsWith('.doc') || file.endsWith('.docx') || file.endsWith('.xls') || file.endsWith('.xlsx') || file.endsWith('.ppt') || file.endsWith('.pptx')
                }
              })
              .sort((a, b) => {
                if(a.directory === b.directory) {
                  return a.name.localeCompare(b.name)
                }
                return a.directory ? -1 : 1
              })
          })
        
        // UX/UI basic functions for files
    const open = (folder) => {
            path.value = pathModule.join(path.value, folder)
          },
          back = () => {
            path.value = pathModule.dirname(path.value)
          },
          searchString = ref(''),
          filteredFiles = computed(() => {
            return searchString.value
              ? files.value.filter(file => file.name.includes(searchString.value))
              : files.value
          })
    
    return {
      path,
      // data/computed:
      files,
      filteredFiles,
      searchString,
      // methods:
      open,
      back
    }
  },
  components: {
    MainUI
  }
}
</script>

<style>

</style>
