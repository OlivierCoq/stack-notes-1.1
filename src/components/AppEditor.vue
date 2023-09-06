<template>
  <div v-for="(item, idx) in content" :key="item.id" class="pa-5">
    <div
      contenteditable
      ref="contentEditable"
      :innerHTML="item.content"
      @input="queueSave($event, idx)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useNotesStore } from "@/stores/notes";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const content = ref<Array<{ content: string; id: string }>>([]);
const contentEditable = ref<HTMLInputElement>();

const store = useNotesStore();

const mapValues = () => {
  content.value =
    store.activeNote?.contents?.map((item) => ({ ...item, id: uuidv4() })) ||
    [];
};

onMounted(mapValues);
watch(() => store.activeNote?.contents, mapValues);

const queueSave = _.debounce((event: Event, idx: number) => {
  const content = (event?.target as HTMLElement)?.innerHTML;
  store.updateContent(content, idx);
}, 1000);
</script>

<style lang="scss">
[contenteditable]:focus {
  outline: 0px solid transparent;
}
</style>