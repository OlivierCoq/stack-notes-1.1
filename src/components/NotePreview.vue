<template>
  <div class="note-preview px-5 py-3 bg-grey-darken-4" @click="selectNote">
    <h5 class="mb-0">{{ note.name }}</h5>
    <p class="note-preview__content">{{ notePreview }}</p>
    <p class="note-preview__date">{{ noteDate }}</p>
  </div>
</template>

<script lang="ts">
import { useNotesStore } from "@/stores/notes";
import { NoteFile } from "../types/Files";
import { PropType, computed } from "vue";
export default {
  // statically type props later
  setup(props: any) {
    const store = useNotesStore();
    const noteDate = computed(() => {
      return new Date(props.note.date).toLocaleDateString();
    });
    const notePreview = computed(() => {
      const preview =
        props.note && props.note.contents && props.note.contents.length > 0
          ? props.note.contents[0].content
          : "";
      return preview.replace(/(<([^>]+)>)/gi, "").substring(0, 100);
    });

    const selectNote = () => {
      // make sure note isn't already in open notes
      if (!store.openNotes.includes(props.note)) {
        store.openNotes.push(props.note);
      }
      store.activeNote = props.note;
    };

    return {
      store,
        // computed
      noteDate,
      notePreview,
        // methods
      selectNote
    };
  },
  props: {
    note: {
      type: Object as PropType<NoteFile>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.note-preview {
  border-top: 1px solid rgb(255, 255, 255, 0.07);
  &__date {
    color: rgb(255, 255, 255, 0.5);
    font-size: 10px;
  }
  &__content {
    color: rgb(255, 255, 255, 0.7);
    font-size: 12px;
  }

  &:hover { 
    background-color: rgb(255, 255, 255, 0.07);
    cursor: pointer;
   }
}
</style>