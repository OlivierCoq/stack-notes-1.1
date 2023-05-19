<template>
    <div class="note-preview px-5 py-3 bg-grey-darken-4">
        <h5>{{ note.name }}</h5>
        <p class="note-preview__content">{{notePreview}}</p>
        <p class="note-preview__date">{{noteDate}}</p>
    </div>
</template>

<script lang="ts">
import { NoteFile } from '../types/Files'
import { PropType, computed } from 'vue'
    export default {
        setup({ note } : { note: NoteFile}) {
            const noteDate = computed(() => {
                return new Date(note.date).toLocaleDateString()
            })
            const notePreview = computed(() => {
                const preview =  note && note.contents && note.contents.length > 0 ? note.contents[0].content : ''
                return preview.replace(/(<([^>]+)>)/gi, "").substring(0, 100)
            })
            return {
                noteDate,
                notePreview
            }
        },
        props: {
            note: {
                type: Object as PropType<NoteFile>,
                required: true
            },
        },
    }
</script>

<style lang="scss" scoped>
.note-preview {
    border-top: 1px solid rgb(255,255,255,.07);
    &__date {
        color: rgb(255,255,255,.5);
        font-size: 10px;
    }
    &__content {
        color: rgb(255,255,255,.7);
        font-size: 12px;
    }
}
</style>