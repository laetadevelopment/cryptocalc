<template>
  <div v-if="showCalculator" id="calculator" class="page">
    <div class="page-title">
      <h1 ref="title">Currency Conversion Calculator</h1>
    </div>
    <div v-if="showStarting" class="page-content" ref="content">
      <div class="conversion-starting">
        <h3>What currency would you like to start with?</h3>
        <selector :key="startingKey" name="starting" @show="show" />
      </div>
      <div v-if="showEnding" class="conversion-ending">
        <h3>What currency would you like to convert to?</h3>
        <selector :key="endingKey" name="ending" @show="show" />
      </div>
      <div v-if="showCalculate" class="calculate-buttons">
        <button @click="add">Add Conversion</button>
        <button class="background-animation" @click="calculate">Calculate</button>
      </div>
      <div v-if="showCalculated" class="calculated">
        <h3>You will end up with...</h3>
        <div class="calculated-buttons">
          <button class="background-animation" @click="save">Save Conversion</button>
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
      startingKey: 0,
      showEnding: false,
      endingKey: 0,
      showCalculate: false,
      showCalculated: false
    }
  },
  methods: {
    // TODO: refactor this method to be dynamic and enlarge font as well
    overflow() {
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
      if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
        this.$refs.content.style.fontSize = ".8em";
        if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
          this.$refs.content.style.fontSize = ".7em";
          if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
            this.$refs.content.style.fontSize = ".6em";
            if (this.$refs.content.scrollHeight > this.$refs.content.clientHeight) {
              this.$refs.content.style.fontSize = ".5em";
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
    },
    calculate() {
      // TODO: add logic to get current currency values via oracles and calculate conversion
      this.showCalculate = false;
      this.showCalculated = true;
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
      this.startingKey += 1;
      this.endingKey += 1;
      this.showEnding = false;
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
.calculate-buttons button {
  height: 50px;
  border-radius: 50px;
  margin: 10px;
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
  height: 50px;
  border-radius: 50px;
  margin: 10px;
}
.calculated button:hover {
  color: rgb(255,255,255);
  background: rgb(0,0,0);
}
</style>
