<template>
    <div class="directory">
        <nuxt-child></nuxt-child>
    </div>
</template>

<style lang="scss">
@import "../assets/_colors.scss";

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