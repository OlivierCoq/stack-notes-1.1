<template>
  <v-row class="pb-0 mb-0">
    <v-col cols="4" />
    <v-col cols="8" class="mt-3 mb-0 pb-0">
      <div class="d-flex w-100">
        <v-spacer />
        <v-btn class="secondary-bg gray-4 secondary-font me-2">
          <!-- <v-icon small icon="mdi-code-braces" color="grey-lighten-5"></v-icon> &nbsp;  -->
          Code
        </v-btn>
        <v-btn class="primary-bg gray-4 secondary-font me-2">
          <!-- <v-icon small icon="mdi-trash-can" color="grey-lighten-5"></v-icon> &nbsp;  -->
          Delete
        </v-btn>
            <v-btn class="gray-2-bg gray-4 secondary-font me-2" @click="saveNote">
          <!-- <v-icon small icon="mdi-vuetify" color="grey-lighten-5"></v-icon> &nbsp;  -->
          Save
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'ActionBar',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {

    // Methods:
    const saveNote = () => {
      context.emit('saveNote', props.note)
      console.log('saving note')
    }

    return {
      // Methods:
      saveNote
    }
  },
  emits: ['saveNote']
}
</script>