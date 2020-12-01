<template>
  <div class="d-flex m-4">
    <button
      class="btn btn-outline-danger mx-4 w-100"
      :disabled="step == 1"
      @click="step--"
    >
      Previous
    </button>
    <button class="btn btn-outline-success mx-4 w-100" @click="step++">
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: ["appStep"],
  computed: {
    step: {
      get() {
        return this.appStep;
      },
      set(val) {
        return this.$emit("change-step", val);
      },
    },
  },
};
</script>

<style></style>
