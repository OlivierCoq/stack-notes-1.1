<template>
    <v-row>
      <v-container id="note-body" class="gray-3-bg" fluid>
        <v-row>
          <v-col>
            <h2 class="gray-4 primary-font">{{ note.title }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
              <div contenteditable v-html="noteBody.content" class="gray-1-bg gray-4 body shadow-1" @blur="edit"></div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row class="pb-0 mb-0">
      <v-col cols="4" />
      <v-col cols="8" class="mt-3 mb-0 pb-0">
        <div class="d-flex w-100">
          <v-spacer />
          <v-btn class="secondary-bg gray-4 secondary-font me-2" @click="addCodeBlock">
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
    <!-- <action-bar :note="note" /> -->
</template>
<script>
// import actionBar from './action-bar.vue'
import { VAceEditor } from 'vue3-ace-editor'
import { reactive, onBeforeMount, watch } from 'vue'
export default {
  name: 'NoteBody',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['edit-note'],
  setup(props, context) {
      // Methods:

      const noteBody = reactive({ content: '' })

      const remapNoteState = () => {
        noteBody.content = props?.note?.data?.content
      }

      onBeforeMount(() => {
        remapNoteState()
      })

      // check for data update
      watch(props, () => {
        remapNoteState()
      })

    
    const edit = (e) => {
            noteBody.content = e.target.innerText
            context.emit('edit-note', noteBody)

          },
          addCodeBlock = () => {
            console.log('adding code block')
          }
    return {
      edit,
      addCodeBlock,
      noteBody
    }
  },
  components: {
    // actionBar,
    VAceEditor
  }
}
</script>
<style lang="scss">
#note-body {
  height: 432px;

  .body {
    padding: 1rem;
    border-radius: 0.5rem;
    height: 370px;
    overflow-y: scroll;

    &:focus-visible {
      outline: $gray-2  1px !important;
      border-radius: 0.5rem !important;
    }
  }
}
.h-inherit { height: inherit !important; }
</style>