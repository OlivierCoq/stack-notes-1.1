<template>
  <editor-content :editor="editor"  />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
export default {
  setup() {
    const editor = new Editor({
      extensions: [StarterKit],
      content: `<p>You've created a new note with Stack Notes 🎉 Start writing code here 👨‍💻👩‍💻</p>`,
    });

    return {
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