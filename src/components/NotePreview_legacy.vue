<template>
  <div class="note-preview ps-5 py-3 bg-grey-darken-4 d-flex flex-row" @click="selectNote">
    <div v-if="!state.action" class="main">
      <h5 class="mb-0">{{ note.name }}</h5>
      <p class="note-preview__content">{{ notePreview }}</p>
      <p class="note-preview__date">{{ noteDate }}</p>
    </div>
    <transition v-else name="slide-fade">
      <div class="actions w-100 me-4">
        <div class="d-flex flex-row align-center justify-content-between ctr-actions">
          <v-spacer />
          <folder-icon class="mx-3" />
          <trash-icon class="mx-3" @click="deleteNote" />
          <v-spacer />
          <close-icon class="mb-5 pb-5" @click="state.action = false" />
        </div>
      </div>
    </transition>
    <div v-if="!state.action">
      <!-- https://www.youtube.com/watch?v=CmzmZW21C9U -->
      <vertical-elipsis @click="state.action = true"></vertical-elipsis>
    </div>
  </div>
</template>

<script lang="ts">
import { useNotesStore } from "@/stores/notes";
import { NoteFile } from "../types/Files";
import { PropType, computed, reactive } from "vue";
import VerticalElipsis from "./Icons/VerticalElipsis.vue";
import TrashIcon from "./Icons/Trash.vue";
import closeIcon from "./Icons/Close.vue";
import FolderIcon from "./Icons/FolderIcon.vue";

export default {
  emits: ['delete'],
  // statically type props later
  setup(props: any, {emit}: any) {
    const store = useNotesStore();
    const state = reactive({
      action: false,
      deleting_note: false
    });
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

    const deleteNote = () => {

        // UX/UI
      store.notes = store.notes.filter((n) => n.id !== props.note.id);
      store.openNotes = store.openNotes.filter((n) => n.id !== props.note.id);
      state.action = false;
      state.deleting_note = false;

        // API
      emit('delete', props.note)
    };

    return {
      state,
      store,
        // computed
      noteDate,
      notePreview,
        // methods
      selectNote,
      deleteNote,
    };
  },
  props: {
    note: {
      type: Object as PropType<NoteFile>,
      required: true,
    },
  },
  components: {
    VerticalElipsis,
    TrashIcon,
    closeIcon,
    FolderIcon,
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

   .actions {
    .ctr-actions {
      height: 4.4em;
    }
   }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>