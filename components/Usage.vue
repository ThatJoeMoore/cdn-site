<template>
<div class="usage__root">
  <!-- <iframe :srcdoc="markup" sandbox="allow-scripts allow-same-origin"></iframe> -->
  <pre><code class="hljs xml" v-html="highlighted"></code></pre>
  <button ref="copy" class="usage__copy" @click="onCopy">{{copyText}}</button>
  </div>
</template>

<style>
  /* @import url('~/node_modules/highlight.js/styles/atom-one-light.css'); */
  @import url('~/node_modules/highlight.js/styles/github.css');

  .usage__root {
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
    background-color: var(--border-color);
    color: white;
    border: none;
    font-size: .85em;
    padding: 0.25em 0.5em;
    text-transform: capitalize;
  }
  .usage__copy:hover {
    background-color: #dbdbdb;
    color: #002e5d;
  }
</style>

<script>
import highlight from '~/plugins/highlight.js';

export default {
  props: ["head", "body"],
  data() {
    return  {
      copyText: 'Copy'
    };
  },
  computed: {
    markup() {
      let markup = '<html>';
      if (this.head) {
        markup += '<head>\n' + indent(this.head) + '\n</head>\n';
      }
      if (this.body) {
        markup += '<body>\n' + indent(this.body) + '\n</body>\n';
      }
      return markup + '</html>';
    },
    highlighted() {
      return highlight.highlight('html', this.markup).value;
    }
  },
  methods: {
    async onCopy() {
      await this.$copyText(this.markup);
      this.copyText = 'Copied!';
      setTimeout(() => this.copyText = 'Copy', 2000);
    }
  }
};

function indent(string, spaces = 2) {
  return string.split('\n').map(line => ' '.repeat(spaces) + line).join('\n');
}
</script>