<template>
  <div v-if="showLearnMore" id="learnMore" class="page">
    <div class="page-title">
      <h1 ref="title">Learn More About SSPWA</h1>
    </div>
    <div class="page-content" ref="content">
      <p>To add to the movie experience a SSPWA will allow you to interact with the elements on the screen. When you watch a movie you do not interact with the actors. That would make the experience dynamic and more like a video game. The SSPWA template aims to give you a foundation to build highly interactive app experiences that your users can load and use on any of their devices in a moments notice.</p>
      <p>Unlike a traditional PWA (Progressive Web App) or web application in general, the elements on the screen will never exist outside of the screen view. This makes a modern, component based framework like Vue.js ideal to build and manage your SSPWAs. End the endless scrolling of apps and websites today and build the ultimate movie/game/app hybrid of the future!</p>
      <p>Please reach out directly through GitHub with any questions, comments, or bug reports.</p>
    </div>
    <div class="page-cta" ref="cta">
      <button class="background-animation" @click="view">View on GitHub</button>
      <button class="background-animation" @click="load">Go Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'learnMore',
  data() {
    return {
      showLearnMore: true
    }
  },
  methods: {
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
      window.open('https://github.com/laetadevelopment/sspwa','_blank');
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
