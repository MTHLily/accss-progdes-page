<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary m-4">
    <a class="navbar-brand" href="#">ACCSS Programming-Design Competition</a>

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
      <!-- <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Challenges:</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 2">1</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="step = 1">Welcome</a>
      </li> -->
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["appStep"],
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
        {
          step: 2,
          text: "1",
          link: true,
        },
        {
          step: 3,
          text: "2",
          link: true,
        },
        {
          step: 4,
          text: "3",
          link: true,
        },
        {
          step: 5,
          text: "4",
          link: true,
        },
        {
          step: 6,
          text: "5",
          link: true,
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
