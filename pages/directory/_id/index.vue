<template>
<div>

  <h2>Readme</h2>

    <div v-if="lib.basic_usage">
      <h3>Usage</h3>
      <Usage :head="lib.basic_usage.head" :body="lib.basic_usage.body"></Usage>
      <!-- <div v-if="lib.basic_usage.head">
        <h4><code>&lt;head&gt;</code></h4>
        <prism-block language="markup" :code="lib.basic_usage.head"></prism-block>
      </div>
      <div v-if="lib.basic_usage.body">
        <h4><code>&lt;body&gt;</code></h4>
        <prism-block language="markup" :code="lib.basic_usage.body"></prism-block>
      </div> -->
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
import { loadLibrary } from "~/assets/manifest-loader.js";
import * as semver from 'semver';

export default {
  components: { Usage },
  scollToTop: true,
  head() {
    if (this.lib) {
      return { title: this.lib.name };
    }
  },
  asyncData: async function(context) {
    const { params, error, payload } = context;
    const lib = payload ? payload : await loadLibrary(context, params.id);
    return { lib };
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