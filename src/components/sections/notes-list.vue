<template>
  <v-container id="ctr-notes_list" class="gray-1-bg" rounded>
    <v-row class="h-inherit">
      <v-col class="h-inherit">
        <div class="d-flex flex-column h-100">
          <v-text-field 
            v-model="search" 
            append-icon="fa fa-search" 
            single-line 
            hide-details 
            background-color="gray-2-bg"
            color="gray-4"
            dark
            small
            solo
            dense
            flat
            :placeholder="displayed_notes.length ? 'Find note' : 'Create a note!' "
            class="search my-0 py-0 secondary-font"
          /> 
          <!-- loop through notes -->
          <div class="ctr-notes mt-2">
            <div
              v-for="note in displayed_notes" 
              :key="note.id" 
              class="px-3 pt-1 pb-4 shadow-1 gray-2-bg note my-2 me-2"
              dark
              :class="note === selected_note ? 'selected-note' : ''"
              @click="select_note(note)"
            >
              <h3 class="gray-4 secondary-font my-3">{{ note.title }}</h3>
            </div>
          </div>
          <v-spacer />
          <v-btn class="green-bg gray-4 secondary-font m-0" @click="new_note_dialog = true">
            <v-icon small class="fa fa-plus"></v-icon> &nbsp; New Note
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="new_note_dialog" width="500" dark>
        <v-card>
          <v-card-title>New Note</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field 
                v-model="new_note.title" 
                label="Title" 
                color="gray-4"
                dark
                small
                dense
                flat
                class="secondary-font"
                @keydown.enter.prevent="newNote()"
               />
            </v-form>
            <p v-show="new_note.error" class="primary-color m-0 p-0">{{ new_note.error }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn class="gray-2-bg gray-4 secondary-font" @click="new_note_dialog = false">
              <v-icon small class="fa fa-times"></v-icon> &nbsp; Cancel
            </v-btn>
            <v-btn class="green-bg gray-4 secondary-font" @click="newNote()">
              <v-icon small class="fa fa-check"></v-icon> &nbsp; Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'NotesList',
    data(){
      return {
        search: '',
        new_note_dialog: false,
        new_note: {
          title: '',
          content: '',
          error: false
        },
        displayed_notes: [],
        selected_note: null
      }
    },
    methods: {
      newNote(){
        
        if(!this.new_note.title){
          this.new_note.error = 'Title is required.'
        } else {
          this.displayed_notes.push(this.new_note)
          this.new_note.error = false
          this.new_note_dialog = false
          this.new_note = {
            title: '',
            content: '',
            error: false
          }
        }
        
      },
      select_note(note){
        this.selected_note = note
        this.$emit('select-note', note)
      }
    }
  }
</script>
<style lang="scss" scoped>
#ctr-notes_list {
  height: 480px;

  .search {
    border-radius: 5px;
    max-height: 40px;

    .v-input__slot {
      padding: 0 10px;}
  }

  .ctr-notes {
    height: 360px;
    width: 100%;
    overflow-y: scroll;
    
    .note {
      border-radius: 5px;

      &:hover {
        cursor: pointer;
        background-color: darken($gray-2, 3%) !important;
      }
    }
    .selected-note {
      background-color: darken($gray-2, 3%) !important;
    }
  }
}
.h-inherit { height: inherit; }
.h-100 { height: 100%; }
.green-bg {
  &:hover {
    background-color: darken($green, 3%) !important;
  }
}
</style>
