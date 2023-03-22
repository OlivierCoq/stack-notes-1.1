<template>
  <v-container id="note-body" class="gray-3-bg" fluid>
    <v-row>
      <v-col>
        <h2 class="gray-4 primary-font">{{ note.title }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="gray-1-bg body shadow-1">

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  name: 'NoteBody',
  data() {
    return {};
  },
  methods: {}
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
  }
}
</style>