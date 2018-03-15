<template>
  <div class="main-wrapper">
    <byu-header>
      <span slot="site-title">Web Community CDN</span>
      <span slot="site-title" class="subtitle">Serving Files So You Don't Have To</span>
      <byu-menu slot="nav" active-selector=".nuxt-link-active">
        <nuxt-link to="/">Home</nuxt-link>
      </byu-menu>
    </byu-header>
    <slot></slot>
    <byu-footer></byu-footer>
  </div>
</template>

<style>
  .main-wrapper {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
</style>
