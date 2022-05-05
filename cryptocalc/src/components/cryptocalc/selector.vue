<template>
  <div id="selector">
    <button v-if="!currencySelected" @click="open">Currency Selector</button>
    <button v-if="currencySelected" @click="open" ref="currency">{{ currency }}</button>
    <input v-if="showCurrencyAmount" type="number" placeholder="Amount" @change="setAmount" />
    <input v-if="showConversionFee" type="number" placeholder="Fee" @change="setFee" />
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
      amount: 0,
      showConversionFee: false,
      fee: 0
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
        // TODO: add validation to currency amount input
        this.$emit("show", "ending");
        this.$emit("currency", this.currency);
      }
      if (this.name == "ending") {
        this.currency = currency;
        this.currencySelected = true;
        this.$emit("show", "calculate");
        this.$emit("currency", this.currency);
      }
      if (this.name == "fee") {
        this.currency = currency;
        this.currencySelected = true;
        this.showConversionFee = true;
        this.$emit("show", "calculate");
        this.$emit("currency", this.currency);
      }
    },
    setAmount() {
      this.amount = event.target.value;
      this.$emit("amount", this.amount);
    },
    setFee() {
      this.fee = event.target.value;
      this.$emit("fee", this.fee);
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
