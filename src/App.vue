<template>
  <div id="app">
    <navbar :appStep="step" @change-step="step = $event" />
    <div id="stepper">
      <welcome v-if="step == 1" />
      <challenge-1
        v-if="step == 2"
        :title="challenges.first.title"
        :description="challenges.first.description"
      />
      <challenge-2
        v-if="step == 3"
        :title="challenges.second.title"
        :description="challenges.second.description"
      />
      <challenge-3
        v-if="step == 4"
        :title="challenges.third.title"
        :description="challenges.third.description"
      />
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
import Challenge3 from "./components/Pages/Challenge-3.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Welcome,
    StepControls,
    Challenge1,
    Challenge2,
    Challenge3,
  },
  data() {
    return {
      step: 1,
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
      },
    };
  },
};
</script>
<style lang="sass">
@import "~bootstrap/scss/bootstrap"
</style>
