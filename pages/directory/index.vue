<template>
    <div class="dir-list-wrapper">
      <div class="dir-list-types">
        <v-btn-toggle multiple v-model="typeFilters">
        <v-btn v-for="type in libraryTypes" :key="type.id" :value="type.id" depressed>
          <LibraryTypeIcon :type="type.id" size="14px;"></LibraryTypeIcon>
          <span>{{type.display}}</span>
        </v-btn>
        </v-btn-toggle>
      </div>
    <div class="directory-list">
        <nuxt-link 
            v-for="lib in libraries" :key="lib.id" 
            :to="{path: lib.id}" append 
            v-ripple
            class="lib">
          <LibraryTypeIcon class="lib-logo" :type="lib.type" size="45px" />
          <div class="text">
            <div class="name">{{lib.name}}</div>
            <div class="descr">{{lib.description}}</div>
            <div class="path"><code>/{{lib.id}}/</code></div>
          </div>
        </nuxt-link>
    </div>
    </div>
</template>

<style lang="scss">
@import "../../assets/_colors.scss";
@import "../../assets/_mixins.scss";

.directory-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2em 0;

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

    .text {
      flex: 1;
      margin-left: 1em;
      display: flex;
      flex-direction: column;
    }

    .descr {
      font-size: 0.8em;
      min-height: 2em;
      flex-grow: 1;
    }

    .lib-logo {
      color: $text_medium_gray;
    }

    .path {
      @include type--mono();
      // font-size: 0.8em;
    }

    &:hover {
      background-color: $accent_blue;
      color: white;

      .lib-logo {
        color: white;
      }
    }
  }
}
</style>

<script>
import LibraryTypeIcon from "~/components/LibraryTypeIcon.vue";
import { loadManifest, allLibraryTypes } from "~/assets/manifest-loader.js";

export default {
  components: { LibraryTypeIcon },
  head: {
    title: "Directory"
  },
  async asyncData({ params, error }) {
    const manifest = await loadManifest();
    return { libraries: manifest.libraryArray };
  },
  data() {
    return {
      libraryTypes: allLibraryTypes(),
      typeFilters: allLibraryTypes().map(t => t.id),
    };
  }
  // mounted() {
  //   window.scrollTo(0, 0);
  // },
};
</script>