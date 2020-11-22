<template>
  <div class="app-container">
    <router-view name="header" />
    <router-view />
  </div>
</template>


<style lang="postcss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import '../styles/blocks/*.pcss';
body {
  color: #414c63;
}
</style>

