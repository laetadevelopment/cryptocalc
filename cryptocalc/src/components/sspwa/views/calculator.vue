<template>
  <div v-if="showCalculator" id="calculator" class="page">
    <div class="page-title">
      <h1 ref="title">Currency Conversion Calculator</h1>
    </div>
    <div class="page-content" ref="content">
      <h3>What currency would you like to start with?</h3>
    </div>
    <div class="page-cta" ref="cta">
      <button class="background-animation" @click="view">View on GitHub</button>
      <button class="background-animation" @click="load">Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data() {
    return {
      showCalculator: true
    }
  },
  methods: {
    // TODO: refactor this method to be dynamic and enlarge font as well
    overflow() {
      if (this.$refs.title.scrollHeight > this.$refs.title.clientHeight) {
        this.$refs.title.style.fontSize = "4vw";
        if (this.$refs.title.scrollHeight > this.$refs.title.clientHeight) {
          this.$refs.title.style.fontSize = "3vw";
          if (this.$refs.title.scrollHeight > this.$refs.title.clientHeight) {
            this.$refs.title.style.fontSize = "2vw";
            if (this.$refs.title.scrollHeight > this.$refs.title.clientHeight) {
              this.$refs.title.style.fontSize = "1vw";
            }
          }
        }
      }
      if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
        this.$refs.content.style.fontSize = ".8em";
        if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
          this.$refs.content.style.fontSize = ".7em";
          if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
            this.$refs.content.style.fontSize = ".6em";
            if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
              this.$refs.content.style.fontSize = ".5em";
            }
          }
        }
      }
    },
    view() {
      window.open('https://github.com/laetadevelopment/cryptocalc','_blank');
    },
    load() {
      this.$emit("load", "home");
    }
  },
  mounted() {
    this.overflow();
    window.addEventListener("resize", this.overflow);
  }
}
</script>
