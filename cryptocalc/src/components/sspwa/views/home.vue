<template>
  <div v-if="showHome" id="home" class="page">
    <div class="page-title">
      <h1 ref="title">Currency Converter DApp</h1>
    </div>
    <div class="page-content" ref="content">
      <h2>The mission of the CryptoCalc DApp is to create a decentralized, open source DApp that allows you to convert any currency (digital or fiat).</h2>
      <p>CryptoCalc is a MIT-licensed open source project built with the <a title="SSPWA Template" href="https://sspw.app" target="_blank">SSPWA Template</a> using Vue.js, Solidity smart contracts, and Golang microservices. End the frustration over how long it takes to convert one currency to another. The process can be excruciatingly slow when you are researching digital or crypto currencies, especially when you must start with one currency and convert it to multiple currencies before getting to the final currency. The CryptoCalc DApp will do that for you on the fly!</p>
      <p>Enter your starting currency and amount to get started. Easily create a chain of currency conversions and calculate the final amount in any currency you choose. You can even add gas fees when converting one crypto or fiat currency to another. Use this app to quickly calculate the profit of potential investment opportunities. You will even be able to add stock trades on the NYSE to your chain of conversions.</p>
    </div>
    <div class="page-cta" ref="cta">
      <button class="background-animation" @click="view">View on GitHub</button>
      <button class="background-animation" @click="load">Calculator</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      showHome: true
    }
  },
  methods: {
    // TODO: refactor this method to be dynamic and enlarge font as well
    overflow() {
      if (this.$refs.title) {
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
      }
      if (this.$refs.content) {
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
      }
    },
    view() {
      window.open('https://github.com/laetadevelopment/cryptocalc','_blank');
    },
    load() {
      this.$emit("load", "calculator");
    }
  },
  mounted() {
    this.overflow();
    window.addEventListener("resize", this.overflow);
  }
}
</script>
