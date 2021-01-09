<template>
  <div class="container">
    <h1 class="display-6 text-center">Input Model Binding (Boolean)</h1>
    <p class="lead text-justify">
      The goal is simple: bind a variable to multiple inputs. The following
      inputs all modify the same boolean variable, and they also display the
      current state of the variable. The paragraph below changes its text
      according to the value of the boolean.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item">Criteria</li>
        <li class="list-group-item">
          Model Binding to Buttons <span class="float-right">1 pts</span>
        </li>
        <li class="list-group-item">
          Model Binding to Selects <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Model Binding to Radio Buttons <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Conditional content of the paragraph
          <span class="float-right">1 pts</span>
        </li>
        <li class="list-group-item">
          Use of Bootstrap 4 Components<span class="float-right">1 pt</span>
        </li>
      </ul>
    </div>
    <div class="input-group mb-4">
      <div class="input-group-prepend">
        <button class="btn btn-primary" @click="toggle = true">True</button>
        <button class="btn btn-danger" @click="toggle = false">False</button>
      </div>
      <select v-model="toggle" class="custom-select">
        <option :value="true">True</option>
        <option :value="false">False</option>
      </select>
      <div class="input-group-append">
        <div class="input-group-text">
          <input
            type="radio"
            id="challenge_1_toggle_true"
            :value="true"
            name="challenge_1_toggle"
            v-model="toggle"
          />
          <label class="form-check-label" for="challenge_1_toggle_true"
            >True</label
          >
        </div>
        <div class="input-group-text">
          <input
            type="radio"
            id="challenge_1_toggle_false"
            :value="false"
            name="challenge_1_toggle"
            v-model="toggle"
          />
          <label class="form-check-label" for="challenge_1_toggle_false"
            >False</label
          >
        </div>
      </div>
    </div>
    <p class="lead bg-light p-4" v-if="toggle">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi delectus
      explicabo natus iste, minus qui quisquam vitae ullam recusandae, quibusdam
      architecto id nesciunt necessitatibus iure quas eum distinctio cum
      similique.
    </p>
    <p class="lead bg-light p-4" v-else>
      The value must be true to display the intended text.
    </p>
  </div>
</template>

<script>
export default {
  props: ["title", "description"],
  data() {
    return {
      toggle: false,
    };
  },
};
</script>
