<template>
  <div id="ctr-app_editor" class="w-100 position-relative">
    <div v-for="(item, idx) in store.activeNote.contents" :key="idx" class="pa-5">
      <code-editor v-if="item.code" :content="item.content" :editor_content="item.editor_content" />
      <div
        v-else
        class="d-flex flex-column align-start justify-start w-100"
        contenteditable
        ref="contentEditable"
        :innerHTML="item.content"
        @input="queueSave($event, idx)"
      ></div>
    </div>
    <action-bar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useNotesStore } from "@/stores/notes";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import CodeEditor from "./CodeEditor.vue";
import ActionBar from "./ActionBar.vue";

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
  #ctr-app_editor {
    flex: none !important;
    height: 90vh !important;

    [contenteditable]:focus {
      outline: 0px solid transparent;
    }
  }
</style>