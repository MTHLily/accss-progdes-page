<template>
  <div id="app">
    <navbar :appStep="step" @change-step="step = $event" />
    <div id="stepper">
      <welcome v-if="step == 1" />
      <tooltip-challenge v-if="step == 2" />
      <model-binding-boolean-challenge v-if="step == 3" />
      <!-- <challenge-1 v-if="step == 3" /> -->
      <datatable-challenge v-if="step == 4" />
      <yugioh-challenge
        v-if="step == 5"
        :title="challenges.third.title"
        :description="challenges.third.description"
      />
      <movie-modal-challenge
        v-if="step == 6"
        :title="challenges.fourth.title"
        :description="challenges.fourth.description"
      />
    </div>
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
  },
  data() {
    return {
      step: 5,
      challenges: {
        first: {
          title: "Challenge 1",
          description:
            "The goal is simple: bind a variable to multiple inputs. The following inputs all modify the same boolean variable, and they also display the current state of the variable. The paragraph below changes its text according to the value of the boolean.",
        },
        second: {
          title: "Challenge 2",
          description:
            "Create a table that displays an array of students. You can add a student, however, you may not add one with bad data ( no course, no name and year level out of bounds (1-5) ). You can also remove students from the list. If you click the headers for name, course or year, it will sort the table. Clicking once will set the sorting mode to that header. Clicking beyond that toggles whether the data is sorted in ascending or descending order. When you add a student, the table is automatically sorted.",
        },
        third: {
          title: "Challenge 3",
          description:
            "Collect cards. You can search for cards, and you will be suggested possible cards. On the press of the button, you may add a random card to your deck. You can remove your cards as well as arrange them by dragging and dropping cards on each other. On dropping, the dragged card is placed before the dropped card. Get your cards from this website: https://db.ygoprodeck.com/api-guide/",
        },
        fourth: {
          title: "Challenge 4",
          description: "http://www.omdbapi.com/",
        },
      },
    };
  },
};
</script>
<style lang="sass">
@import "~bootstrap/scss/bootstrap"
</style>
