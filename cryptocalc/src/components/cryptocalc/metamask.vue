<template>
  <div id="metamask">
    <div v-if="!metamask.installed" class="metamask-install">
      <button class="background-animation" @click="install"><img alt="Install MetaMask" src="../../assets/metamask-fox.svg">Install MetaMask Wallet</button>
    </div>
    <div v-if="metamask.installed && !metamask.address" class="metamask-installed">
      <button class="background-animation" @click="connect"><img alt="Login with MetaMask" src="../../assets/metamask-fox.svg">Connect MetaMask Wallet</button>
    </div>
    <div v-if="metamask.address" class="metamask-connected">
      <p>Address: {{ metamask.address.substring(0, 5) }}...{{ metamask.address.slice(-4) }}</p>
      <p>Network: {{ metamask.network }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'metamask',
  computed: {
    metamask() {
      return this.$store.state.metamask;
    }
  },
  methods: {
    install(event) {
      event.target.disabled = true;
      this.$store.dispatch('installMetamask');
    },
    connect() {
      this.$store.dispatch('connectMetamask');
    }
  },
  mounted() {
    this.$store.dispatch('setMetamask');
  }
}
</script>

<style scoped>
#metamask {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
}
#metamask div {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
#metamask button {
  width: 250px;
  height: 50px;
  max-height: 100%;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
}
#metamask button img {
  max-height: 90%;
}
.metamask-connected {
  width: 100%;
  justify-content: space-around;
}
#metamask p {
  display: inline-flex;
  align-items: center;
  margin: 0;
  color: rgb(255,255,255);
}
</style>
