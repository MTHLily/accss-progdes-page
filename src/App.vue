<template>
  <div id="app">
    <navbar
      :appStep="step"
      @change-step="step = $event"
      :noChallenges="challenges.length"
    />
    <div id="stepper">
      <div v-for="(challenge, index) in challenges" :key="index">
        <component :is="challenge" v-if="step == index + 1" />
      </div>
    </div>
    <!-- <welcome v-if="step == 1" />
      <tooltip-challenge v-if="step == 2" />
      <model-binding-boolean-challenge v-if="step == 3" />
      <datatable-challenge v-if="step == 4" />
      <yugioh-challenge v-if="step == 5" />
      <movie-modal-challenge v-if="step == 6" /> -->
    <step-controls :appStep="step" @change-step="step = $event" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Welcome from "./components/Pages/Welcome";
import StepControls from "./components/StepControls.vue";
import ModelBindingBooleanChallenge from "./components/Pages/Model-Binding-Boolean-Challenge.vue";
import DatatableChallenge from "./components/Pages/Datatable-Challenge.vue";
import TooltipChallenge from "./components/Pages/Tooltip-Challenge.vue";
import YugiohChallenge from "./components/Pages/Yugioh-Challenge.vue";
import MovieModalChallenge from "./components/Pages/Movie-Modal-Challenge.vue";
import CharacterSwapper from "./components/Pages/Character-Swapper.vue";
import ScheduleMaker from "./components/Pages/Schedule-Maker.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Welcome,
    StepControls,
    ModelBindingBooleanChallenge,
    DatatableChallenge,
    TooltipChallenge,
    YugiohChallenge,
    MovieModalChallenge,
    CharacterSwapper,
    ScheduleMaker,
  },
  data() {
    return {
      step: 6,

      challenges: [
        Welcome,
        TooltipChallenge,
        ModelBindingBooleanChallenge,
        CharacterSwapper,
        DatatableChallenge,
        ScheduleMaker,
        YugiohChallenge,
        MovieModalChallenge,
      ],
    };
  },
};
</script>
<style lang="sass">
@import "~bootstrap/scss/bootstrap"
</style>
