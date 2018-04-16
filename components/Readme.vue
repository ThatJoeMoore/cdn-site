<template>
<div class="readme__root" v-html="rendered"></div>
</template>

<style>
  /* @import url('~/node_modules/highlight.js/styles/atom-one-light.css'); */
  @import url('~/node_modules/highlight.js/styles/github.css');

  /* .usage__root {
    --border-color: #5f7c9b;
    position: relative;
    border-left: 8px solid var(--border-color);
    padding: 0;
    margin: 1em;
    box-shadow: -1px 0px 0px 0px var(--border-color), 0px 0px 0px 1px #dbdbdb;
  }

  .usage__root > pre {
    margin: 0;
  }
  .usage__copy {
    --border-color: #5f7c9b;
    position: absolute;
    top: 0;
    right: 0;

    /* background-color: #c5c5c5; */
    /* background-color: var(--border-color);
    color: white;
    border: none;
    font-size: .85em;
    padding: 0.25em 0.5em;
    text-transform: capitalize;
  }
  .usage__copy:hover {
    background-color: #dbdbdb;
    color: #002e5d;
  } */
</style>

<script>
import axios from 'axios';

import * as MarkdownIt from 'markdown-it';
import * as mdHighlight from 'markdown-it-highlightjs';

const md = new MarkdownIt()
  .use(mdHighlight);

export default {
  props: ["markdown"],
  computed: {
    rendered() {
      const raw = this.markdown;
      if (!raw) {
        return '';
      }
      return md.render(raw);
    }
  }
};
</script>