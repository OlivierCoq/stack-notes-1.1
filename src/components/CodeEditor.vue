<template>
  <div>
    <v-ace-editor
      v-model:value="state.editor_content"
      @init="editorInit"
      lang="html"
      theme="chrome"
      style="height: 300px" />
      <div
        class="d-flex flex-column align-start justify-start w-10 note_body"
        contenteditable
        ref="contentEditable"
        :innerHTML="state.content"
      ></div>
  </div>
</template>
<script>
 
  import { useNotesStore } from "../stores/notes"
  import { reactive, computed } from "vue"

    // Ace:
  import { VAceEditor } from 'vue3-ace-editor'
    // import all the languages:
  import 'ace-builds/src-noconflict/mode-html'
  import 'ace-builds/src-noconflict/mode-javascript'
  import 'ace-builds/src-noconflict/mode-css'
  import 'ace-builds/src-noconflict/mode-scss'
  import 'ace-builds/src-noconflict/mode-typescript'

    // import all the themes:
  import 'ace-builds/src-noconflict/theme-chrome'
  import 'ace-builds/src-noconflict/theme-monokai'
  import 'ace-builds/src-noconflict/theme-github'
  import 'ace-builds/src-noconflict/theme-tomorrow'
  import 'ace-builds/src-noconflict/theme-kuroir'
  import 'ace-builds/src-noconflict/theme-twilight'
  import 'ace-builds/src-noconflict/theme-xcode'
  import 'ace-builds/src-noconflict/theme-textmate'
  import 'ace-builds/src-noconflict/theme-terminal'


  export default {
    name: "CodeEditor",
    components: {
      VAceEditor
    },
    props: {
      content: {
        type: String,
        required: true
      },
      editor_content: {
        type: String,
        required: true
      }
    },
    setup(props) {
        // data
      const state = reactive({
        content: props.content,
        editor_content: props.editor_content
      })
      // const editor_content = computed(() => props.editor_content)
      const store = useNotesStore()

        // methods:
      const editorInit = () => {}

      return {
        state,
        store,
        // editor_content,
        // methods
        editorInit
      }
    }
  }
</script>
<style lang="scss">
  .note_body {
    background: #424242;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    width: 100%;
    min-height: 200px;
    overflow-y: auto;
  }
</style>