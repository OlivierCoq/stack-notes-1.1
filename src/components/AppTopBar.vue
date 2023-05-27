<template>

  <div class="d-flex align-center justify-space-between app-bar py-2">
    <app-logo />
    <!-- lol no idea if this will work in vueitfy 3 doing it vuetify 2 way -->
    <v-menu>
        <template v-slot:activator="{on,attrs}">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-avatar size="40" color="grey-darken-3">AC</v-avatar>
            </v-btn>
        </template>
    </v-menu>
  </div>
</template>

<script>
import AppLogo from "./AppLogo.vue";
export default {
  components: {
    AppLogo,
  },
};
</script>

<style lang="scss" scoped>
.app-bar {
    width: 100%;
    padding: 30px 0px;
}
</style>