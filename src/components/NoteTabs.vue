<template>
    <div class="tabs-container w-100 overflow-x-auto">
        <v-tabs v-model="store.activeNote" fixed-tabs density="comfortable" grow center-active>
            <v-tab v-for="(note, a) in store.openNotes" :key="a" :value="note" @click="setNote(note)" class="d-flex">
                {{ note.name }} 
                <!-- <v-spacer/> -->
                <div class="spacer"></div>
                <span class="close" @click="removeTab(note)">
                    <close/>    
                </span> 
            </v-tab>
        </v-tabs>
        <v-divider />
    </div>
</template>

<script>
import { useNotesStore } from "../stores/notes";
import { reactive, toRefs } from 'vue'
import Close from "./Icons/Close.vue";

export default  {
    setup () {
        const store = useNotesStore();
        const setNote = (note) => {
            if(store.openNotes.length) { store.activeNote = note }
            else { store.activeNote = false }
        }
        const removeTab = (note) => {
            store.openNotes = store.openNotes.filter(n => n.id !== note.id)
            // store.activeNote = {}
        }
        return {
            store,
            // methods
            removeTab,
            setNote
        }
    },
    components: {
        Close
    }
}
</script>

<style lang="scss" scoped>
    .w-100 { width: 100% !important; }
    .spacer { width: 2.5em; }
    .close {
        cursor: pointer;
        font-size: 10px;
        padding: 0.4em 0.5em;

        &:hover {
           background-color: #bab6b62b;
           border-radius: 50%;
        //    padding: 3px;
        }
        svg {
            max-width: 8px !important;
        }
    }
</style>