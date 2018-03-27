<template>
    <div class="version">
        <h2>{{version.name}}</h2>

        <h3>Resources</h3>
        <ul>
            <li v-for="(meta, res) in version.manifest.resources" :key="res">
                {{res}}
            </li>
            </ul>
    </div>
</template>

<script>
import { loadLibraryVersion } from "~/assets/manifest-loader.js";

export default {
  scollToTop: true,
  asyncData: async function({ params, error }) {
    const version = await loadLibraryVersion(params.id, params.version);
    return { version };
  },
};
</script>