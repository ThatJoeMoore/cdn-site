<template>
    <div class="version">
        <h2>{{version.name}}</h2>
        {{version.basic_usage}}
        
        <h3>Resources</h3>
        <!-- <ul>
            <li v-for="(meta, res) in manifest.resources" :key="res">
                {{res}}
            </li>
        </ul> -->
        <v-expansion-panel popout>
            <v-expansion-panel-content v-for="(group, groupId) in resourceGroups" :key="groupId">
                <div slot="header">{{groupId}}</div>
                <v-card>
                    <v-card-text>Size: {{prettySize(group.baseFile.size)}} bytes ({{prettySize(group.baseFile.gzip_size)}} bytes gzipped)</v-card-text>
                    <v-card-text><h4>Hashes</h4>
                      <table>
                        <tr v-for="(hash, type) in group.baseFile.hashes" :key="type">
                          <th>{{type}}</th><td>Hex: {{hash.hex}}<br />Base64: {{hash.base64}}</td>
                        </tr>
                      </table>
                      </v-card-text>
                    <v-card-text><h2>Variants</h2></v-card-text>
                    <v-expansion-panel class="variants-list">
                        <v-expansion-panel-content v-for="variant in group.variants" :key="variant.variant.id">
                            <div slot="header">{{variant.variant.id}}</div>
                            <v-card>
                                <v-card-text>Size: {{prettySize(variant.info.size)}} bytes ({{prettySize(variant.info.gzip_size)}} bytes gzipped)</v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- <v-list>
          <v-list-group
            v-for="(group, groupId) in resourceGroups"
            :key="groupId"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ groupId }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ groupId }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="variant in group.variants" :key="variant.variant.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ variant.variant.id }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list> -->
    </div>
</template>

<style>
.variants-list {
  margin: 0 1em;
}
</style>

<script>
import {
  loadLibraryVersion,
  loadLibraryVersionManifest
} from "~/assets/manifest-loader.js";
import * as prettyBytes from 'pretty-bytes';

export default {
  scollToTop: true,
  data() {
    return {
      version: {}
    };
  },
  asyncData: async function(context) {
    const { params, error, payload } = context;
    if (payload) {
      return payload;
    }
    const version = await loadLibraryVersion(
      context,
      params.id,
      params.version
    );
    const manifest = await loadLibraryVersionManifest(
      context,
      params.id,
      params.version
    );
    return { version, manifest };
  },
  computed: {
    resources() {
      return this.manifest ? this.manifest.resources : {};
    },
    resourceGroups() {
      const groups = {};

      const resources = this.resources;

      for (const [id, res] of Object.entries(resources)) {
        const variant = getVariant(id);
        if (!variant) {
          const group = (groups[id] = groups[id] || {
            variants: []
          });
          group.baseFile = res;
          continue;
        }
        const { parent, details } = variant;
        const group = (groups[parent] = groups[parent] || {
          baseFile: null,
          variants: []
        });

        group.variants.push({
          variant: details,
          info: res
        });
      }

      return groups;
    }
  },
  methods: {
    prettySize(input) {
      return prettyBytes(input);
    }
  }
  //   mounted() {
  //       window.scrollTo(0, 0);
  //   },
};

const FILE_VARIANTS = [
  {
    id: "min",
    display: "Minified File",
    pattern: /\.min\.([a-z]+)$/
  },
  {
    id: "min-sourcemap",
    display: "Minified Source Map",
    pattern: /\.min\.([a-z]+).map$/
  },
  {
    id: "sourcemap",
    display: "Source Map",
    pattern: /\.([a-z]+)\.map$/
  }
];

function getVariant(file) {
  const variant = FILE_VARIANTS.find(v => v.pattern.test(file));
  if (!variant) {
    return null;
  }
  const parent =
    file.replace(variant.pattern, "") + "." + file.match(variant.pattern)[1];

  return {
    parent,
    details: variant
  };
}
</script>