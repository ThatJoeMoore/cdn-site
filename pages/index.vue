<template>
  <div class="main">
    <byu-hero-banner id="hero" image-source="img/eiffel-tower.jpg" class="full-screen light-image">
      <span slot="headline">Web Community CDN</span>
      <span slot="intro-text">Fast, secure, easy delivery of BYU Web resources.</span>
      <nuxt-link slot="read-more" to="/directory">Explore</nuxt-link>
    </byu-hero-banner>
    <div class="content-wrapper">

    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/main.scss';
  .content-wrapper {
    @include main-page-contents();
  }
  @media (max-width: 500px) {
    [slot=headline] {
      font-size: 40px;
      line-height: normal;
    }
  }
</style>

<script>
export default {
  layout: 'no-constrained-width',
  head() {
    return {
      style: [
        {type: 'stylesheet', type: 'text/css', href: 'https://cdn.byu.edu/byu-hero-banner/latest/byu-hero-banner.min.css'},
      ],
      script: [
        {async: true, src: 'https://cdn.byu.edu/byu-hero-banner/latest/byu-hero-banner.min.js'},
      ],
    }
  }
}
</script>
