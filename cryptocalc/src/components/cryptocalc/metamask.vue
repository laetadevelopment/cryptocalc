<template>
  <div id="metamask">
    <p>Metamask: {{ web3.isInjected }}</p>
    <p>Network: {{ web3.networkId }}</p>
    <p>Account: {{ web3.wallet }}</p>
    <p>Balance: {{ web3.balance }}</p>
  </div>
</template>

<script>
export default {
  name: 'metamask',
  computed: {
    web3() {
      return this.$store.state.web3;
    }
  }
}
</script>

<style scoped>
#metamask {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
#metamask p {
  display: inline-flex;
  align-items: center;
  margin: 0;
  color: rgb(255,255,255);
}
</style>
