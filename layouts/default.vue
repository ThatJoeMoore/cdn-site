<template>
  <PageWrapper>
    <div class="content-wrapper">
      <nuxt />
    </div>
  </PageWrapper>
</template>

<style lang="scss">
  @import '../assets/main.scss';
  .content-wrapper {
    @include main-page-contents();
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
