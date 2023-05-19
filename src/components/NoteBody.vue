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
              <div contenteditable v-html="note.content" class="gray-1-bg gray-4 body shadow-1" @blur="edit"></div>
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
          <v-btn class="primary-bg gray-4 secondary-font me-2" @click="state.deleting = true">
            <!-- <v-icon small icon="mdi-trash-can" color="grey-lighten-5"></v-icon> &nbsp;  -->
            Delete

            <v-dialog v-model="state.deleting">
              <v-card>
                <v-card-title class="primary-bg gray-4 secondary-font me-2">
                  <span>Delete Note</span>
                </v-card-title>
                <v-card-text>
                  Are you sure you want to delete "{{ note.title }}"? This action cannot be undone.
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="state.deleting = false">Cancel</v-btn>
                  <v-btn color="warning" text @click="confirmDelete">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-btn>
          <v-btn class="gray-2-bg gray-4 secondary-font me-2" @click="saveNote">
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
import { reactive, onBeforeMount, watch, ref } from 'vue'
import fs from 'fs'
import { app } from '@electron/remote'
const path = ref(app.getAppPath())

export default {
  name: 'NoteBody',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['edit-note', 'saveNote', 'deleteNote'],
  setup(props, context) {

    const state = reactive({
      deleting: false
    })
    // Methods:

    const noteBody = reactive({ content: '' })

    const remapNoteState = () => {
      noteBody.content = props?.note?.content
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
      },
      saveNote = () => {
        fs.writeFileSync(`${path._rawValue}/local/${props.note.title}.json`, JSON.stringify(props.note))
        context.emit('saveNote', props.note)
        console.log('saving note')
      },
      confirmDelete = () => {
        fs.unlink(`${path._rawValue}/local/${props.note.title}.json`, () => {
          state.deleting = false
        })
        context.emit('deleteNote')
      }
    return {
      // data:
      state,
      noteBody,
      // methods:
      edit,
      addCodeBlock,
      saveNote,
      confirmDelete
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