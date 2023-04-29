<template>
  <div></div>
</template>

<script>
import fs from 'fs'
import pathModule from 'path'

import { app } from '@electron/remote'
import { computed, ref } from 'vue'

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
                  size: stats.isFile() ? stats.size ?? 0 : null,
                  directory: stats.isDirectory()
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
  }
}
</script>

<style>

</style>
