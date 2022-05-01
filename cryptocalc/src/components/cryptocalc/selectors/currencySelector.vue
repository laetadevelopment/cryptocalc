<template>
  <div id="currencySelector">
    <h2>Currency Selector</h2>
    <div class="currency-buttons">
      <button>USD</button>
      <button>AVAX</button>
      <button>TIME</button>
      <button>MEMO</button>
    </div>
    <button class="background-animation" @click="close">Close</button>
  </div>
</template>

<script>
export default {
  name: 'currencySelector',
  methods: {
    close() {
      this.$emit("close", "currencySelector");
    }
  }
}
</script>

<style scoped>
#currencySelector {
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 15%;
  background: rgba(0,0,0,99%);
  border-top: 2px solid rgb(0,0,0);
  box-sizing: border-box;
}
#currencySelector h2 {
  font-size: 1.5em;
  color: rgb(255,255,255);
}
.currency-buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.currency-buttons button {
  color: rgb(255,255,255);
  border-color: rgb(255,255,255);
}
.currency-buttons button:hover {
  color: rgb(0,0,0);
  background: rgb(255,255,255);
}
#currencySelector button {
  height: 50px;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
