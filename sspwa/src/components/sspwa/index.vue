<template>
  <div id="index">
    <appHeader @load="load" @toggle="toggle" />
    <main>
      <home v-if="showHome" @load="load" />
      <learnMore v-if="showLearnMore" @load="load" @toggle="toggle" />
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
import learnMore from './views/learnMore.vue'
import appFooter from './appFooter.vue'
import appMenu from './appMenu.vue'
import appBar from './appBar.vue'

export default {
  name: 'index',
  components: {
    appHeader,
    home,
    learnMore,
    appFooter,
    appMenu,
    appBar
  },
  data() {
    return {
      showHome: true,
      showLearnMore: false,
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
        this.showLearnMore = false;
        this.showHome = true;
        if (this.showAppMenu) {
          this.showAppMenu = false;
        }
      }
      if (page == 'learnMore') {
        this.showHome = false;
        this.showLearnMore = true;
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
  font-family: oswald, sans-serif;
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
  font-family: raleway-v20-deprecated, sans-serif;
  font-weight: 900;
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
  color: rgb(14,95,242);
  text-decoration: none;
}
a:hover {
  color: rgba(14,95,242,75%);
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
.background-animation {
  border: 3px solid rgb(14,95,242);
  background: rgba(14,95,242,90%);
  color: rgb(255,255,255);
  animation: background 10s infinite alternate;
}
.background-animation:hover {
  border: 3px solid rgb(14,95,242);
  background: rgba(14,95,242,75%);
  animation: bghover 10s infinite alternate;
}
@keyframes background {
  0% {
    border-color: rgb(14,95,242);
    background: rgba(14,95,242,90%);
  }
  25% {
    border-color: rgb(255,151,119);
    background: rgba(255,151,119,90%);
  }
  50% {
    border-color: rgb(186,220,221);
    background: rgba(186,220,221,90%);
  }
  75% {
    border-color: rgb(92,158,167);
    background: rgba(92,158,167,90%);
  }
  100% {
    border-color: rgb(62,140,132);
    background: rgba(62,140,132,90%);
  }
}
@keyframes bghover {
  0% {
    border-color: rgb(14,95,242);
    background: rgba(14,95,242,75%);
  }
  25% {
    border-color: rgb(255,151,119);
    background: rgba(255,151,119,75%);
  }
  50% {
    border-color: rgb(186,220,221);
    background: rgba(186,220,221,75%);
  }
  75% {
    border-color: rgb(92,158,167);
    background: rgba(92,158,167,75%);
  }
  100% {
    border-color: rgb(62,140,132);
    background: rgba(62,140,132,75%);
  }
}
.page {
  margin: 10px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
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
  flex-wrap: wrap;
  align-content: center;
  overflow: hidden;
}
.page-content h2 {
  font-size: 1.1em;
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
