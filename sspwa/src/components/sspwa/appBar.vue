<template>
  <div id="appBar">
    <a class="github-button" href="https://github.com/laetadevelopment/sspwa/subscription" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch laetadevelopment/sspwa on GitHub">Watch</a>
    <a class="github-button" href="https://github.com/laetadevelopment/sspwa" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star the SSPWA Template on GitHub">Star</a>
    <a class="github-button" href="https://github.com/laetadevelopment/sspwa/archive/HEAD.zip" data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-download" data-size="large" aria-label="Download laetadevelopment/sspwa on GitHub">Download</a>
  </div>
</template>

<script>
export default {
  name: 'appBar',
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
      "src",
      "//buttons.github.io/buttons.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
  }
}
</script>

<style scoped>
#appBar {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  background: rgba(14,95,242,95%);
  border-top: 2px solid rgb(14,95,242);
  box-sizing: border-box;
  z-index: 2;
}
#appBar span {
  display: inline-flex;
  align-items: center;
}
</style>
