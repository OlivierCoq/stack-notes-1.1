<template>
    <div v-for="item,idx in store.activeNote.contents" :key="idx" class="pa-5">
      <div v-once contenteditable ref="contentEditable" @input="updateContent($event, idx)" :innerHTML="item.content"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes";

const contentEditable = ref<HTMLInputElement>()

const store = useNotesStore();


const updateContent = (value: Event, idx: number) => {
  // hacky as fuck lol
  const content = (value?.target as HTMLElement)?.innerHTML
  store.updateContent(content, idx);
}







</script>

<style lang="scss">
[contenteditable]:focus {
  outline: 0px solid transparent;
}
</style>