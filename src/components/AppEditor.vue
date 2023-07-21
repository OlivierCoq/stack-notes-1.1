<template>
  <div contenteditable v-html="content">
    
  </div>
</template>

<script>
import { computed, ref, watch, reactive, onBeforeMount } from "vue";
import { useNotesStore } from "@/stores/notes";

export default {
  setup(props) {
    const store = useNotesStore();
    const content = ref("");

    watch(() => store?.activeNote?.id, () => {
      content.value = store.activeNote?.contents?.[0]?.content || ""
    }, { deep: true})

    onBeforeMount(() => {
      content.value = store.activeNote?.contents?.[0]?.content || ""
    })
    return {
      content,
    };
  }
};
</script>

<style lang="scss">
.ProseMirror {
  border: none;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>