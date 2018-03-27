<template>
    <div class="list">
        <nuxt-link 
            v-for="lib in libraries" :key="lib.id" 
            :to="{path: lib.id}" append 
            class="lib">
          <LibraryTypeIcon class="lib-logo" :type="lib.type" size="45px" />
          <div class="text">
            <div class="name">{{lib.name}}</div>
            <div class="descr">{{lib.description}}</div>
            <div class="path"><code>/{{lib.id}}/</code></div>
          </div>
        </nuxt-link>
    </div>
</template>

<style lang="scss">
@import "../../assets/_colors.scss";

.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2em 0;
}

.lib {
  display: flex;
  text-decoration: none;
  color: black;
  flex-direction: row;
  cursor: pointer;
  padding: 0.5em 1em;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  .name {
    font-size: 1.2em;
  }

  .descr {
    font-size: 0.8em;
  }

  .text {
    flex: 1;
    margin-left: 1em;
  }

  .lib-logo {
    color: $text_medium_gray;
  }

  .path {
    font-family: "Source Code Pro", monospace;
    font-size: 0.8em;
  }

  &:hover {
    background-color: $accent_blue;
    color: white;

    .lib-logo {
      color: white;
    }
  }
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
  asyncData: async function({ params, error }) {
    const manifest = await loadManifest();
    return { libraries: manifest.libraryArray };
  },
  methods: {}
};
</script>