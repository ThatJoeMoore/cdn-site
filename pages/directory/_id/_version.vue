<template>
    <div class="version">
        <h2>{{version.name}}</h2>

        <h3>Resources</h3>
        <ul>
            <li v-for="(meta, res) in manifest.resources" :key="res">
                {{res}}
            </li>
        </ul>
    </div>
</template>

<script>
import { loadLibraryVersion, loadLibraryVersionManifest } from "~/assets/manifest-loader.js";

export default {
  scollToTop: true,
  asyncData: async function({ params, error, payload }) {
      if (payload) {
          return payload;
      }
    const version = await loadLibraryVersion(params.id, params.version);
    const manifest = await loadLibraryVersionManifest(params.id, params.version);
    return { version, manifest };
  },
//   mounted() {
//       window.scrollTo(0, 0);
//   },
};
</script>