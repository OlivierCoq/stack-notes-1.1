<template>
  <div id="action-bar" class="w-100 action-bar position-fixed">
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-end pt-0">
            <v-btn
              color="secondary"
              variant="outlined"
              class="mx-1"
              flat
              @click="add_content"
              >
                Code
            </v-btn>
            <v-btn
              color="info"
              variant="outlined"
              class="mx-1"
              flat>
                Save
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import { useNotesStore } from "../stores/notes"
  import { reactive } from "vue"

  export default {
    name: "ActionBar",
    setup() {
      const store = useNotesStore();
        // data
      const state = reactive({})

        // methods
      const add_content = () => {
        store.activeNote.contents.push({
          editor_content: ``,
          content: ``,
          code: true
        })
      }

      return {
        store,
        add_content
      }
    }
  }
</script>
<style lang="scss">
  #action-bar {
    background: #212121 !important;
    height: 65px;
    bottom: 0px;
    right: 0;
    z-index: 9; // above the editor. A strange and very specific number.
  }
</style>