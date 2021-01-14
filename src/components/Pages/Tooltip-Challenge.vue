<template>
  <div class="container">
    <h1 class="display-6 text-center">Tooltips</h1>
    <p class="lead text-justify">
      A tooltip is an element that appears whenever you hover over another
      element in the page.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item">Criteria</li>
        <li class="list-group-item">
          A tooltip appears when the text is hovered over
          <span class="float-right">2 pts</span>
        </li>
        <li class="list-group-item">
          Javascriptless Implementation<span class="float-right">3 pts</span>
        </li>
      </ul>
    </div>

    <div class="row bg-light p-4">
      <div class="col">
        <div class="custom-tooltip">
          <span class="lead">
            Example 1
          </span>
          <span class="tip">This is a tooltip</span>
        </div>
      </div>
      <div class="col">
        <div class="custom-tooltip">
          <span class="lead ">
            Example 2
          </span>
          <!-- <span class="tip">This is another tooltip</span> -->
          <span class="tip">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            sunt at ducimus nam sequi minima labore ullam sed odit facilis
            pariatur id laboriosam quam, neque corrupti, modi est,
            exercitationem natus?
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.custom-tooltip {
  position: relative;
}

span.tip:after {
  position: absolute;
  content: "";
  bottom: -0.5rem;
  left: 10%;
  transform: translateX(50%);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  width: 0.5rem;
  background: black;
  height: 0.5rem;
}

.custom-tooltip span.tip {
  display: none;
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: auto;
  height: auto;
  background: black;
  border-radius: 10px;
  color: white;
  padding: 0.3rem;
}

.custom-tooltip > *:hover + span.tip {
  display: inline-block;
}
</style>
