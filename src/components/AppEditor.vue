<template>
  <editor-content :editor="editor"  />
</template>

<script>
import { useNotesStore } from "@/stores/notes";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
export default {
  setup(props) {
    const store = useNotesStore();
    const editor = new Editor({
      extensions: [StarterKit],
      content: store.activeNote.contents[0].content,
      // content: `<p>You've created a new note with Stack Notes 🎉 Start writing code here 👨‍💻👩‍💻</p>`,
      // content: props.note.contents[0].content,
    });

    return {
      store,
      editor,
    };
  },
  components: {
    EditorContent,
  },
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