<template>
  <div class="note-preview bg-grey-darken-4 position-relative" @click="selectNote">
    <div class="ctr-details w-100 h-100 position-absolute d-flex flex-row">
      <div class="details p-3">
        <h5 class="mb-0">{{ note.name }}</h5>
        <p class="note-preview__content">{{ notePreview }}</p>
        <p class="note-preview__date">{{ noteDate }}</p>
      </div>
      <div class="elipsis">
        <vertical-elipsis @click="state.action = true" />
      </div>
    </div>
    <div class="ctr-actions h-100 position-absolute d-flex flex-row" :class="state.action ? 'active' : ''">
      <div class="options w-90 d-flex flex-row align-center justify-center">
        <folder-icon class="mx-3" />
        <trash-icon class="mx-3" @click="deleteNote" />

        <v-dialog v-model="state.deleting_note" width="400px" theme="dark">
            <v-card>
              <v-card-text>
                <div class="d-flex align-center justify-center py-2">
                  <trash-icon class="mx-3" />
                </div>

                <div class="d-flex align-center justify-space-between mb-4">
                  <div>
                    <h3 class="primary-font">Are you sure you want to delete {{ note.name }} ?</h3>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="state.deleting_note = false" size="small"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="confirmDelete"
                  size="small"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>


      </div>
      <div class="close">
        <close-icon class="mb-5 pb-5" @click="state.action = false" />
      </div>
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
      state.deleting_note = true;
    };

    const confirmDelete = () => {

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
      confirmDelete
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
  width: 250px;
  height: 100px;
  z-index: 1;

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
   .ctr-details {
    z-index: 2;

    .details {
      padding: 5px 15px;
    }
    .elipsis {
      padding: 5px;
    }
   }
   .ctr-actions {
      background-color: #3e3e42;
      width: 95%;
      z-index: 3;
      right: 0;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      margin-right: -15em;
      transition: all .3s ease;
      box-shadow:rgb(255, 255, 255, 0.07);
   }
   .active {
     margin-right: 0;
   }
}
.w-90 {
  width: 90%;
}
</style>