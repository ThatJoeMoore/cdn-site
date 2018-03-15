<template>
    <div>
        {{ libraries }}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    head: {
        title: 'Directory',
    },
    async asyncData({req}) {
        const manifest = await axios('https://cdn.byu.edu/manifest.json');
        return {
            manifest: manifest.data
        }
    },
    computed: {
        libraries: function() {
            return Object.entries(this.manifest.libraries);
        }
    }
}
</script>