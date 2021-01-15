<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary m-4">
    <a class="navbar-brand" href="#">AdDU JSCode</a>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item p-2" v-for="item in navbarItems" :key="item.text">
        <a
          href="#"
          class="nav-link"
          :class="
            item.text == 'Challenges:' && step > 1
              ? 'active'
              : item.step == step
              ? 'active'
              : ''
          "
          @click="step = item.step"
        >
          {{ item.text }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["appStep", "noChallenges"],
  mounted() {
    for (var x = 1; x < this.noChallenges; x++) {
      this.navbarItems.push({
        step: 1 + x,
        text: x,
      });
    }
  },
  data() {
    return {
      navbarItems: [
        {
          step: 1,
          text: "Welcome",
          link: true,
        },
        {
          step: 2,
          text: "Challenges:",
          link: false,
        },
      ],
    };
  },
  computed: {
    step: {
      get() {
        return this.appStep;
      },
      set(val) {
        this.$emit("change-step", val);
      },
    },
  },
};
</script>

<style></style>
