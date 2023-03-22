<template>
  <v-container fluid id="main-ui">
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <h1 class="main-font">
          <span class="primary-color">stack</span>
          <span class="gray-4">.</span>
          <span class="secondary-color">notes</span>
          <span class="gray-4">();</span>
        </h1>
        <!-- <v-icon class="fa fa-house"></v-icon> -->
      </v-col>
    </v-row>
    <v-row mt-5>
      <v-col cols="4">
        <notes-list :notes="notes" />
      </v-col>
      <v-col cols="8">
        <v-row>
          <!-- Selected Note -->
        </v-row>
        <v-row v-if="selected_note">
          <v-col cols="6" />
          <v-col cols="6">
            <div class="d-flex w-100">
              <v-spacer />
              <v-btn class="secondary-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-code"></v-icon> &nbsp; Code
              </v-btn>
              <v-btn class="primary-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-trash"></v-icon> &nbsp; Delete
              </v-btn>
              <v-btn class="gray-2-bg gray-4 secondary-font me-2">
                <v-icon small class="fa fa-check"></v-icon> &nbsp; Save
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import notesList from './sections/notes-list.vue'
  export default {
    components: {
      notesList
    },
    name: 'MainUI',
    data(){
      return {
        notes: [],
        selected_note: false
      }
    }
  }
</script>

<style lang="scss">
#main-ui {
  background-color: $gray-3;
  height: 100vh;
}
</style>
