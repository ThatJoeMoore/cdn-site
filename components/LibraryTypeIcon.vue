<template>
    <v-icon :size="size">{{icon}}</v-icon>
</template>

<script>
const typeIcons = {
  "web-component": "extension",
  javascript: "power",
  stylesheet: "palette",
  font: "text_fields",
  images: "image",
  unknown: "help_outline"
};
export default {
  props: ["type", "size"],
  computed: {
    icon: function() {
        return typeIcons[this.type];
    }
  }
};
</script>