<template>
  <div class="container">
    <h1 class="display-6 text-center">Input Model Binding</h1>
    <p class="lead text-justify">
      The goal is simple: bind a variable to multiple inputs. In this challenge,
      you have two variables: a boolean and a string.
    </p>
    <p class="lead text-justify">
      The inputs above are bound to the boolean. The values of the inputs are
      bound to that boolean variable. If the boolean is false, their value is
      also false. If the boolean value changes due to the input, the values of
      the other inputs are also changed.
    </p>
    <p class="lead text-justify">
      The middle section is a conditional element. If the boolean is false, then
      it will render some text. If the boolean is true, then it will render the
      string.
    </p>
    <p class="lead text-justify">
      The last section is a textbox which is bound to the string variable.
      Whatever changes you make to the text in the textbox, it will also reflect
      in the string variable.
    </p>

    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item bg-light">Criteria</li>
        <li class="list-group-item">
          Model Binding to Buttons <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Model Binding to Selects <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Model Binding to Radio Buttons <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Conditional content of the paragraph
          <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Model Binding to Textbox
          <span class="float-right">2pts</span>
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
      {{ paragraphText }}
    </p>
    <p class="lead bg-light p-4" v-else>
      The value must be true to display the intended text.
    </p>
    <div class="row mt-2 mx-1">
      <textarea
        cols="30"
        rows="3"
        class="form-control"
        v-model="paragraphText"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description"],
  data() {
    return {
      paragraphText:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero dicta modi illum fugit, exercitationem, temporibus odit aperiam eligendi veniam laudantium facere voluptatibus blanditiis optio sunt nostrum obcaecati quae sit unde?",
      toggle: false,
    };
  },
};
</script>
