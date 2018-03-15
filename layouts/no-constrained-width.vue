<template>
  <PageWrapper>
    <div class="unconstrained-content-wrapper">
      <nuxt />
    </div>
  </PageWrapper>
</template>

<style lang="scss">
  .unconstrained-content-wrapper {
    flex-grow: 1;
  }
</style>


<script>
import PageWrapper from '~/components/PageWrapper.vue';

export default {
  components: {
    PageWrapper
  },
}

</script>
