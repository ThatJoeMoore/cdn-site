import Vue from 'vue';
import {
  Vuetify,
  VCard,
  VList,
  VBtn,
  VBtnToggle,
  VIcon,
} from 'vuetify';
import { Ripple } from 'vuetify/es5/directives/index.js';

Vue.use(Vuetify, {
  components: {
    VCard,
    VList,
    VBtn,
    VIcon,
    VBtnToggle,
  },
  directives: {
    Ripple
  },
  theme: {
    primary: '#002e5d',
    accent: '#5f7c9b',
    secondary: '#666666',
    info: '#0D47A1',
    warning: '#ffb300',
    error: '#b3041a',
    success: '#66b200'
  }
});