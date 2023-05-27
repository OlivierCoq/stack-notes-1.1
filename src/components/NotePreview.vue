<template>
  <div class="note-preview px-5 py-3 bg-grey-darken-4">
    <h5 class="mb-0">{{ note.name }}</h5>
    <p class="note-preview__content">{{ notePreview }}</p>
    <p class="note-preview__date">{{ noteDate }}</p>
  </div>
</template>

<script>

import { PropType, computed } from "vue";
export default {
  // statically type props later
  setup(props) {
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

    return {
      noteDate,
      notePreview,
    };
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.note-preview {
  border-top: 1px solid rgb(255, 255, 255, 0.07);
  &__date {
    color: rgb(255, 255, 255, 0.5);
    font-size: 10px;
  }
  &__content {
    color: rgb(255, 255, 255, 0.7);
    font-size: 12px;
  }
}
</style>