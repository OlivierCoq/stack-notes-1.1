<template>
  <div class="bg-grey-darken-4 fill-height">
    <note-tabs />
  </div>
</template>
<script>
import NoteTabs from "./NoteTabs.vue";
export default {
  components: {
    NoteTabs,
  },
};

</script>
<style lang="scss">
#main-ui {
  height: 100vh;
}
</style>