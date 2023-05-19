<template>
  <div class="note-list bg-grey-darken-3">
    <div class="d-flex align-center bg-grey-darken-4 px-5 pt-1">
      <search-icon class="pr-2"></search-icon>
      <v-text-field
        variant="plain"
        hide-details
        placeholder="Search For Notes"
        density="dense"
        theme="dark"
        rounded="0"
        elevation="0"
        class="note-list__search-bar"
      >
        
      </v-text-field>
      
    </div>
    <note-preview v-for="note in tempFiles.notes" :note="note" :key="note.path"></note-preview>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import SearchIcon from "./Icons/SearchIcon.vue";
import NotePreview from "./NotePreview.vue";
import { NoteFile } from '../types/Files'

export default {
  setup() {
    // will be replaced with files loaded out of fs into pinia
    const tempFiles = reactive({ 
      notes: [
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        },
        {
          name: 'Testing File',
          path: '/testingfile.json',
          size: 1000,
          date: new Date('10-21-2019'),
          tags: ['test'],
          contents: [
            {
              content: `<p>this is a markup test for formatting</p>`
            }
          ]
        }
      ] as NoteFile[]
    }) 



    return {
      tempFiles
    };
  },
  components: {
    SearchIcon,
    NotePreview
  },
};
</script>

<style lang="scss" scoped>
.note-list {
  height: 100%;
  width: 100%;
  &__search-bar {
   input {
      padding-bottom: 0px !important;
    }
  }
}
</style>