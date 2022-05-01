<template>
  <div id="index">
    <appHeader @load="load" @toggle="toggle" />
    <main>
      <home v-if="showHome" @load="load" />
      <calculator v-if="showCalculator" @load="load" />
    </main>
    <appMenu v-if="showAppMenu" @load="load" @toggle="toggle" />
    <appBar v-if="showAppBar" />
    <appFooter />
  </div>
</template>

<script>
import appHeader from './appHeader.vue'
import home from './views/home.vue'
// import app views to load in main element
import calculator from './views/calculator.vue'
import appFooter from './appFooter.vue'
import appMenu from './appMenu.vue'
import appBar from './appBar.vue'

export default {
  name: 'index',
  components: {
    appHeader,
    home,
    calculator,
    appFooter,
    appMenu,
    appBar
  },
  data() {
    return {
      showHome: true,
      showCalculator: false,
      showAppMenu: false,
      showAppBar: true
    }
  },
  methods: {
    // TODO: refactor component toggle logic and make experience more interactive
    toggle(component) {
      if (component == 'appMenu') {
        if (!this.showAppMenu) {
          this.showAppMenu = true;
        } else {
          this.showAppMenu = false;
        }
      }
      if (component == 'appBar') {
        if (!this.showAppBar) {
          this.showAppBar = true;
        } else {
          this.showAppBar = false;
        }
      }
    },
    // TODO: refactor page loading logic and make experience more interactive
    load(page) {
      if (page == 'home') {
        this.showHome = true;
        this.showCalculator = false;
        if (this.showAppMenu) {
          this.showAppMenu = false;
        }
      }
      if (page == 'calculator') {
        this.showHome = false;
        this.showCalculator = true;
        if (this.showAppMenu) {
          this.showAppMenu = false;
        }
      }
    }
  }
}
</script>

<style>
#index {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: proxima-soft, sans-serif;
  font-weight: 400;
  font-style: normal;
}
main {
  width: 100%;
  height: 75%;
  overflow: hidden;
  display: flex;
}
h1, h2, h3 {
  font-family: pt-sans-pro-narrow, sans-serif;
  font-weight: 700;
  font-style: normal;
  margin: 0;
  margin-bottom: 10px;
}
p {
  line-height: 1.2;
  margin: 0;
  margin-bottom: 10px;
}
a {
  color: rgb(0,154,244);
  text-decoration: none;
}
a:hover {
  color: rgba(0,154,244,75%);
}
/* TODO: add icons to the navigation buttons */
button {
  width: 150px;
  border-radius: 10px;
  border: 3px solid rgb(0,0,0);
  background: transparent;
  color: rgb(0,0,0);
  font-weight: bold;
  cursor: pointer;
}
input {
  width: 150px;
  padding: 5px 10px;
  border-radius: 10px;
  border: 3px solid rgb(0,0,0);
  box-sizing: border-box;
  background: transparent;
  color: rgb(0,0,0);
  font-weight: bold;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.background-animation {
  border: 3px solid rgb(0,154,244);
  background: rgba(0,154,244,90%);
  color: rgb(255,255,255);
  animation: background 10s infinite alternate;
}
.background-animation:hover {
  border: 3px solid rgb(0,154,244);
  background: rgba(0,154,244,75%);
  animation: bghover 10s infinite alternate;
}
@keyframes background {
  0% {
    border-color: rgb(0,154,244);
    background: rgba(0,154,244,90%);
  }
  25% {
    border-color: rgb(4,118,217);
    background: rgba(4,118,217,90%);
  }
  50% {
    border-color: rgb(138,227,221);
    background: rgba(138,227,221,90%);
  }
  75% {
    border-color: rgb(255,210,4);
    background: rgba(255,210,4,90%);
  }
  100% {
    border-color: rgb(62,140,132);
    background: rgba(62,140,132,90%);
  }
}
@keyframes bghover {
  0% {
    border-color: rgb(0,154,244);
    background: rgba(0,154,244,75%);
  }
  25% {
    border-color: rgb(4,118,217);
    background: rgba(4,118,217,75%);
  }
  50% {
    border-color: rgb(138,227,221);
    background: rgba(138,227,221,75%);
  }
  75% {
    border-color: rgb(255,210,4);
    background: rgba(255,210,4,75%);
  }
  100% {
    border-color: rgb(62,140,132);
    background: rgba(62,140,132,75%);
  }
}
.page {
  width: 100%;
  margin: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.page-title {
  height: 12.5%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.page-title h1 {
  margin: 0;
  font-size: 4.75vw;
}
.page-content {
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.page-content h2 {
  font-size: 1.5em;
}
.page-content h3 {
  font-size: 1.2em;
}
.page-content p {
  font-size: 1em;
}
.page-cta {
  width: 100%;
  height: 12.5%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.page-cta button {
  max-width: 47.5%;
  max-height: 100%;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
