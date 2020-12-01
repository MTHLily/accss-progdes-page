<template>
  <div id="app">
    <navbar :appStep="step" @change-step="step = $event" />
    <div id="stepper">
      <welcome v-if="step == 1" />
      <challenge-1 v-if="step == 2" />
      <challenge-2 v-if="step == 3" />
    </div>
    <step-controls :appStep="step" @change-step="step = $event" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Welcome from "./components/Pages/Welcome";
import StepControls from "./components/StepControls.vue";
import Challenge1 from "./components/Pages/Challenge-1.vue";
import Challenge2 from "./components/Pages/Challenge-2.vue";
export default {
  name: "App",
  components: { Navbar, Welcome, StepControls, Challenge1, Challenge2 },
  data() {
    return {
      step: 1,
    };
  },
};
</script>
<style lang="sass">
@import "~bootstrap/scss/bootstrap"
</style>
