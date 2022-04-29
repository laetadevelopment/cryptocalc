<template>
  <div id="appMenu">
    <button class="background-animation" @click="home">Home</button>
    <button class="background-animation" @click="learnMore">Learn More</button>
    <button class="background-animation" @click="view">View on GitHub</button>
  </div>
</template>

<script>
export default {
  name: 'appMenu',
  methods: {
    home() {
      this.$emit("toggle", "appMenu");
      this.$emit("load", "home");
    },
    learnMore() {
      this.$emit("toggle", "appMenu");
      this.$emit("load", "learnMore");
    },
    view() {
      this.$emit("toggle", "appMenu");
      window.open('https://github.com/laetadevelopment/sspwa','_blank');
    }
  }
}
</script>

<style scoped>
#appMenu {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 15%;
  background: rgba(0,0,0,90%);
  border-top: 2px solid rgb(0,0,0);
  box-sizing: border-box;
}
#appMenu button {
  height: 50px;
  max-width: 30%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
