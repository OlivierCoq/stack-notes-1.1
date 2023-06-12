<template>
    <div>
        <v-tabs v-model="store.activeNote" fixed-tabs height="60px">
            <v-tab v-for="(note, a) in store.openNotes" :key="a" :value="note">{{ note.name }} 
                &nbsp;&nbsp;<span class="close" @click="removeTab(note)">x</span> 
            </v-tab>
        </v-tabs>
        <v-divider></v-divider>
    </div>
</template>

<script>
import { useNotesStore } from "../stores/notes";
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const store = useNotesStore();
        const removeTab = (note) => {
            store.openNotes = store.openNotes.filter(n => n.id !== note.id)
            if (store.openNotes.length == 1) { store.activeNote = {} }
        }
        return {
            store,
            // methods
            removeTab
        }
    }
}
</script>

<style lang="scss" scoped>
    .close {
        cursor: pointer;
        font-size: 10px;
        padding: 0.4em 0.5em;

        &:hover {
           background-color: #bab6b62b;
           border-radius: 50%;
        //    padding: 3px;
        }
    }
</style>