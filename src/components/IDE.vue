<template>
  <div>
    <p>IDE HERE</p>
    <!-- <v-ace-editor
      v-model="content"
      @init="editorInit"
      lang="html"
      theme="chrome"
      style="height: 300px" /> -->
  </div>
</template>
<script>
  import { VAceEditor } from 'vue3-ace-editor'
  import { useNotesStore } from "../stores/notes"
  import { reactive } from "vue"

  export default {
    name: "IDE",
    components: {
      VAceEditor
    },
    setup() {
        // data
      const props = defineProps(['content'])
      const state = reactive({})
      const store = useNotesStore()

        // methods:
      

      return {
        state,
        store,
        props
      }
    }
  }
</script>