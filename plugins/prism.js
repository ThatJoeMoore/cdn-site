import Vue from 'vue';

import Clipboard from 'clipboard/dist/clipboard.min';

import 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar.js'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';

import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/themes/prism-coy.css';

import Prism from 'vue-prismjs';

Vue.component('prism-block', Prism);
