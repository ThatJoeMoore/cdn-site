<template>
<div>

    <div v-if="readme">
      <h2>Readme</h2>
      <Readme :markdown="readme"></Readme>
    </div>

    <div v-if="lib.basic_usage">
      <h2>Usage</h2>
      <Usage :head="lib.basic_usage.head" :body="lib.basic_usage.body"></Usage>
    </div>

    <h2>Available Aliases</h2>

    <ul>
        <li v-for="alias in aliases" :key="alias.name">{{alias.name}} -> {{alias.target}}</li>
    </ul>

    <h2>Releases</h2>

    <ul>
        <li v-for="version in releases" :key="version.name">
          <nuxt-link append :to="{path: version.name}">{{version.name}}</nuxt-link>
        </li>
    </ul>

    <h2>Experimental Branches</h2>

    <ul>
        <li v-for="version in experiments" :key="version.name">
          <nuxt-link append :to="{path: version.name}">{{version.name}}</nuxt-link>
        </li>
    </ul>
</div>
</template>

<style lang="scss">
@import "../../../assets/_colors.scss";

</style>

<script>
import Usage from "~/components/Usage.vue";
import Readme from "~/components/Readme.vue";
import { loadLibrary } from "~/assets/manifest-loader.js";
import axios from 'axios';
import * as semver from 'semver';

export default {
  components: { Usage, Readme },
  scollToTop: true,
  head() {
    if (this.lib) {
      return { title: this.lib.name };
    }
  },
  asyncData: async function(context) {
    const { params, error, payload } = context;
    const lib = payload ? payload : await loadLibrary(context, params.id);
    let readme = null;
    if (lib.links && lib.links.readme) {
      try {
        const resp = await axios.get(lib.links.readme);
        readme = resp.data;
      } catch (err) {
        readme = null;
      }
    }
    return { lib, readme };
  },
  // mounted() {
  //     window.scrollTo(0, 0);
  // },
  computed: {
    aliases() {
      const l = this.lib;
      return Object.keys(this.lib.aliases)
        .map(alias => {
          const target = this.lib.aliases[alias];
          return { name: alias, target };
        })
        .sort(sortAliases);
    },
    versions() {
      const l = this.lib;
      return l.versions.sort((one, two) => {
        return one.name.localeCompare(two.name);
      });
    },
    releases() {
      return this.versions.filter(it => it.type === "release")
        .sort((one, two) => {
          return semver.rcompare(semver.coerce(one.name), semver.coerce(two.name));
        });
    },
    experiments() {
      return this.versions.filter(it => it.type === "branch");
    }
  },
  methods: {}
};

function sortAliases(one, two) {
    const name1 = one.name;
    const name2 = two.name;

    if (name1 === 'latest') {
        return -1;
    } else if (name2 === 'latest') {
        return 1;
    }
    if (name1 === 'unstable') {
        return -1;
    } else if (name2 === 'unstable') {
        return 1;
    }

    return semver.rcompare(one.target, two.target);
}

</script>