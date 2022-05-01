<template>
  <div id="selector">
    <button v-if="!currencySelected" @click="open">Currency Selector</button>
    <button v-if="currencySelected" @click="open" ref="currency">{{currency}}</button>
    <input v-if="showCurrencyAmount" type="number" placeholder="Amount" />
    <input v-if="showConversionFees" type="number" placeholder="Fees" />
    <currencySelector v-if="showCurrencySelector" @close="close" @select="select" />
  </div>
</template>

<script>
import currencySelector from './selectors/currencySelector.vue'

export default {
  name: 'selector',
  components: {
    currencySelector
  },
  props: ['name'],
  data() {
    return {
      currency: null,
      currencySelected: false,
      showCurrencySelector: false,
      showCurrencyAmount: false,
      showConversionFees: false
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
    },
    select(currency) {
      if (this.name == "starting") {
        this.currency = currency;
        this.currencySelected = true;
        this.showCurrencyAmount = true;
        this.$emit("show", "ending");
      }
      if (this.name == "ending") {
        this.currency = currency;
        this.currencySelected = true;
        this.showConversionFees = true;
        this.$emit("show", "calculate");
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
  margin: 10px;
}
#selector button:hover {
  color: rgb(255,255,255);
  background: rgb(0,0,0);
}
#selector input {
  height: 50px;
  border-radius: 50px;
  margin: 10px;
  text-align: center;
}
</style>
