<template>
  <div id="app">
    <navbar :appStep="step" @change-step="step = $event" />
    <div id="stepper">
      <welcome v-if="step == 1" />
    </div>
    <step-controls :appStep="step" @change-step="step = $event" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Welcome from "./components/Pages/Welcome";
import StepControls from "./components/StepControls.vue";
export default {
  name: "App",
  components: { Navbar, Welcome, StepControls },
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
