<template>
  <div id="selector">
    <button @click="open">Currency Selector</button>
    <currencySelector v-if="showCurrencySelector" @close="close" />
  </div>
</template>

<script>
import currencySelector from './selectors/currencySelector.vue'

export default {
  name: 'selector',
  components: {
    currencySelector
  },
  data() {
    return {
      showCurrencySelector: false
    }
  },
  methods: {
    open() {
      this.showCurrencySelector = true;
    },
    close(selector) {
      if (selector == 'currencySelector') {
        this.showCurrencySelector = false;
      }
    }
  }
}
</script>

<style scoped>
#selector {
  display: flex;
  justify-content: center;
}
#selector button {
  height: 50px;
  border-radius: 50px;
}
#selector button:hover {
  color: rgb(255,255,255);
  background: rgb(0,0,0);
}
</style>
