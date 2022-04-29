<template>
  <div id="sspwa">
    <div id="viewable">
      <div v-if="showInstall" id="intro">
        <h2 v-if="installApp">Install</h2>
        <img v-if="installApp" @click="install" id="logo" alt="CryptoCalc logo" src="../assets/cryptocalc-logo-intro.png">
        <h2 v-if="!installApp">Load</h2>
        <img v-if="!installApp" @click="load" id="logo" alt="CryptoCalc logo" src="../assets/cryptocalc-logo-intro.png">
      </div>
      <index v-if="loadIndex" />
    </div>
  </div>
</template>

<script>
import index from './sspwa/index.vue'

export default {
  name: 'SSPWA',
  components: {
    index
  },
  data() {
    return {
      installApp: null,
      showInstall: true,
      loadIndex: false
    }
  },
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this.installApp = e;
    });
    window.addEventListener("appinstalled", () => {
      this.installApp = null;
    });
  },
  methods: {
    async install() {
      this.installApp.prompt();
    },
    load() {
      this.showInstall = false;
      this.loadIndex = true;
    }
  }
}
</script>

<style scoped>
#sspwa {
  width: 100%;
  height: 100%;
}
#viewable {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#intro {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgb(0,154,244);
}
#intro h2 {
  margin-top: 5%;
  color: rgb(255,255,255);
}
#intro #logo {
  max-width: 50%;
  max-height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
