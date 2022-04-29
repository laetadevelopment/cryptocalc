<template>
  <footer>
    <h3>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" title="MIT License">MIT License</a></h3>
    <h3>Copyright &copy; 2022 <a href="https://github.com/laetadevelopment" target="_blank" title="Laeta Development on GitHub">Laeta Development</a></h3>
  </footer>
</template>

<script>
export default {
  name: 'appFooter',
  methods: {
    toggleAppMenu() {
      this.$emit("toggle", "appMenu");
    },
    home() {
      this.$emit("load", "home");
    },
    toggleAppBar() {
      this.$emit("toggle", "appBar");
    }
  }
}
</script>

<style scoped>
footer {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 1;
}
footer h3 {
  margin: 0;
  font-size: .75em;
}
</style>
