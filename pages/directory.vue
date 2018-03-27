<template>
    <div class="directory">
        <nuxt-child></nuxt-child>
    </div>
</template>

<style lang="scss">
@import "../assets/_colors.scss";

.directory {
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  // margin: 2em 0;
}
</style>

<script>
import LibraryTypeIcon from "~/components/LibraryTypeIcon.vue";
import { loadManifest } from "~/assets/manifest-loader.js";

export default {
  components: { LibraryTypeIcon },
  head: {
    title: "Directory"
  },
  async asyncData() {
    return {manifest: await loadManifest()};
  },
};
</script>