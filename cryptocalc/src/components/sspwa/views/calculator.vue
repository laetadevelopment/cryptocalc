<template>
  <div v-if="showCalculator" id="calculator" class="page">
    <div class="page-title">
      <h1 ref="title">Currency Conversion Calculator</h1>
    </div>
    <div v-if="showStarting" class="page-content" ref="content">
      <div class="conversion-starting" @change="overflow">
        <h3>What currency would you like to start with?</h3>
        <selector :key="selectorKey" name="starting" @show="show" @currency="starting" @amount="amount" />
      </div>
      <div v-if="showEnding" class="conversion-ending" @change="overflow">
        <h3>What currency would you like to convert to?</h3>
        <selector :key="selectorKey" name="ending" @show="show" @currency="ending" />
      </div>
      <div v-if="showFee" class="conversion-fee" @change="overflow">
        <h3>Is there a conversion fee? (optional)</h3>
        <selector :key="selectorKey" name="fee" @show="show" @currency="feeCurrency" @fee="fee" />
      </div>
      <div v-if="showCalculate" class="calculate-buttons" @change="overflow">
        <button @click="add" disabled>Add Conversion</button>
        <button class="background-animation" @click="calculate">Calculate</button>
      </div>
      <div v-if="showCalculated" class="calculated" @change="overflow">
        <h3>{{ conversion }} is {{ conversionAmount }} {{ endingCurrency }}</h3>
        <div class="calculated-buttons">
          <button class="background-animation" @click="save" disabled>Save Conversion</button>
          <button @click="reset">New Conversion</button>
        </div>
      </div>
    </div>
    <div class="page-cta" ref="cta">
      <button class="background-animation" @click="view">View on GitHub</button>
      <button class="background-animation" @click="load">Home</button>
    </div>
  </div>
</template>

<script>
import selector from '../../cryptocalc/selector.vue'

export default {
  name: 'calculator',
  components: {
    selector
  },
  props: {
    name: String
  },
  data() {
    return {
      showCalculator: true,
      showStarting: true,
      selectorKey: 0,
      startingCurrency: null,
      startingAmount: 0,
      showEnding: false,
      endingCurrency: null,
      showFee: false,
      conversionFeeCurrency: null,
      conversionFee: 0,
      showCalculate: false,
      showCalculated: false,
      conversion: null,
      conversionAmount: 0
    }
  },
  watch: {
    $data: {
      handler: function() {
        this.overflow();
      },
      deep: true
    }
  },
  methods: {
    // TODO: refactor this method to be dynamic and enlarge font as well
    overflow() {
      console.log("check overflow");
      var buttons = this.$refs.content.getElementsByTagName("button");
      var inputs = this.$refs.content.getElementsByTagName("input");
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
        console.log(this.$refs.content.scrollHeight, this.$refs.content.clientHeight);
        if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
          this.$refs.content.style.fontSize = ".8em";
          for (var i = 0; i < buttons.length; i++) {
            console.log(buttons[i]);
            if (buttons[i]) {
              buttons[i].style.height = "40px";
              buttons[i].style.borderRadius = "40px";
            }
          }
          for (var i = 0; i < buttons.length; i++) {
            if (inputs[i]) {
              inputs[i].style.height = "40px";
              inputs[i].style.borderRadius = "40px";
            }
          }
          if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
            this.$refs.content.style.fontSize = ".7em";
            for (var i = 0; i < buttons.length; i++) {
              if (buttons[i]) {
                buttons[i].style.height = "35px";
                buttons[i].style.borderRadius = "35px";
              }
            }
            for (var i = 0; i < buttons.length; i++) {
              if (inputs[i]) {
                inputs[i].style.height = "35px";
                inputs[i].style.borderRadius = "35px";
              }
            }
            if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
              this.$refs.content.style.fontSize = ".6em";
              for (var i = 0; i < buttons.length; i++) {
                if (buttons[i]) {
                  buttons[i].style.height = "30px";
                  buttons[i].style.borderRadius = "30px";
                }
              }
              for (var i = 0; i < buttons.length; i++) {
                if (inputs[i]) {
                  inputs[i].style.height = "30px";
                  inputs[i].style.borderRadius = "30px";
                }
              }
              if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
                this.$refs.content.style.fontSize = ".5em";
                for (var i = 0; i < buttons.length; i++) {
                  if (buttons[i]) {
                    buttons[i].style.height = "25px";
                    buttons[i].style.borderRadius = "25px";
                  }
                }
                for (var i = 0; i < buttons.length; i++) {
                  if (inputs[i]) {
                    inputs[i].style.height = "25px";
                    inputs[i].style.borderRadius = "25px";
                  }
                }
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
      this.$emit("load", "home");
    },
    show(name) {
      if (name == "ending") {
        this.showEnding = true;
      }
      if (name == "calculate") {
        this.showCalculate = true;
      }
      if (name == "fee") {
        this.showFee = true;
        this.conversionFeeCurrency = null;
        this.conversionFee = 0;
        this.showCalculate = true;
      }
    },
    starting(currency) {
      this.startingCurrency = currency;
    },
    amount(amount) {
      this.startingAmount = amount;
      if (this.showCalculated) {
        this.calculate();
      }
    },
    ending(currency) {
      this.endingCurrency = currency;
    },
    feeCurrency(currency) {
      this.conversionFeeCurrency = currency;
      this.showCalculated = false;
    },
    fee(fee) {
      this.conversionFee = fee;
      if (this.showCalculated) {
        this.calculate();
      }
    },
    calculate() {
      this.conversion = this.startingAmount + ' ' + this.startingCurrency + ' to ' + this.endingCurrency;
      if (this.conversionFeeCurrency) {
        this.conversion = this.conversion + ' with a ' + this.conversionFee + ' ' + this.conversionFeeCurrency + ' fee';
      }
      this.conversionAmount = this.calculateConversion(this.startingAmount, this.startingCurrency, this.endingCurrency);
      this.showCalculate = false;
      this.showCalculated = true;
    },
    calculateConversion(amount, from, to) {
      this.$store.dispatch({
        type: 'currencyConversion',
        from: from
      });
      return (this.$store.state.contract.conversion * amount);
    },
    add() {
      // TODO: add logic to add another conversion to conversion chain
      this.reset();
    },
    save() {
      // TODO: add logic to save conversion chains via conversions microservice
      this.reset();
    },
    reset() {
      this.selectorKey += 1;
      this.showEnding = false;
      this.showFee = false;
      this.showCalculate = false;
      this.showCalculated = false;
    }
  },
  mounted() {
    this.overflow();
    window.addEventListener("resize", this.overflow);
  }
}
</script>

<style scoped>
#calculator h3 {
  text-align: center;
}
.calculate-buttons {
  display: flex;
  justify-content: center;
}
.calculate-buttons button {
  height: 45px;
  border-radius: 45px;
  margin: 5px;
  color: rgb(255,255,255);
  background: rgb(0,0,0);
}
.calculate-buttons button:hover {
  color: rgb(0,0,0);
  background: rgb(255,255,255);
}
.calculate-buttons .background-animation:hover {
  color: rgb(255,255,255);
}
.calculated button {
  height: 45px;
  border-radius: 45px;
  margin: 5px;
  color: rgb(255,255,255);
  background: rgb(0,0,0);
}
.calculated button:hover {
  color: rgb(0,0,0);
  background: rgb(255,255,255);
}
.calculated .background-animation:hover {
  color: rgb(255,255,255);
}
</style>
