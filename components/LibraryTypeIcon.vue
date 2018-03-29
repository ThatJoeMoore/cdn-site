<template>
    <v-icon :size="size">{{icon}}</v-icon>
</template>

<script>
const typeIcons = {
  "web-component": "code",
  javascript: "mdi-language-javascript",
  stylesheet: "palette",
  font: "text_fields",
  images: "collections",
  unknown: "help_outline"
};
export default {
  props: ["type", "size"],
  computed: {
    icon: function() {
        return typeIcons[this.type] || 'help_outline';
    }
  },
};
</script>