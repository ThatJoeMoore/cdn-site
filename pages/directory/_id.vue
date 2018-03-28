<template>
<div class="lib-page">
    <h1 class="title"><LibraryTypeIcon :type="lib.type" size="1em" class="lib-logo" />{{lib.name}}</h1>
    <p class="descr">{{lib.description}}</p>

    <nuxt-child></nuxt-child>
</div>
</template>

<style lang="scss">
@import "../../assets/_colors.scss";
.lib-page {
  .lib-logo {
    color: $text_medium_gray;
    margin-right: 0.5em;
  }

  .title {
    display: flex;
  }
}
</style>

<script>
import LibraryTypeIcon from "~/components/LibraryTypeIcon.vue";
import { loadLibrary } from "~/assets/manifest-loader.js";

export default {
  components: { LibraryTypeIcon },
  scollToTop: true,
  head() {
    if (this.lib) {
      return { title: this.lib.name };
    }
  },
  asyncData: async function({ params, error, payload }) {
    const lib = payload ? payload : await loadLibrary(params.id);
    return { lib };
  },
  // mounted() {
  //   window.scrollTo(0, 0);   
  // },
};
</script>