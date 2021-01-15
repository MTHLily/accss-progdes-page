<template>
  <div class="container">
    <h1 class="display-6 text-center">Movie API</h1>
    <p class="lead text-justify">
      <a href="https://www.omdbapi.com/">omdbAPI</a> is an API that provides
      information about movies. It requires the use of an API key, which you can
      obtain with your email account. Use it to search for and display
      information about the movie. Additionally, you can also choose to give
      your own personal rating on the movie. Make use of client storage storage
      to have your ratings persist between visits.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group w-50">
        <li class="list-group-item bg-light">Criteria</li>
        <li class="list-group-item">
          Authorize the API endpoint by using your own API key.
          <span class="float-right">1 pts</span>
        </li>
        <li class="list-group-item">
          Search for a movie and display the results.<span class="float-right"
            >3 pts</span
          >
        </li>
        <li class="list-group-item">
          If there is an error in the search, display it to the user.<span
            class="float-right"
            >2 pts</span
          >
        </li>
        <li class="list-group-item">
          Upon selecting a movie from the search results, display its
          information.<span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Display the information inside a modal.<span class="float-right"
            >3 pts</span
          >
        </li>
        <li class="list-group-item">
          Give your personal rating on a movie.<span class="float-right"
            >2 pts</span
          >
        </li>
        <li class="list-group-item">
          Store your personal ratings client-side and retrieve it everytime you
          load the page.<span class="float-right">2 pts</span>
        </li>
      </ul>
    </div>

    <div class="modal show" :style="showMovieModal ? 'display: block;' : ''">
      <div class="modal-dialog modal-xl">
        <div class="modal-content" @click.stop>
          <div class="modal-body" v-if="selectedMovie == null">
            Retrieving details...
          </div>
          <div class="modal-body mx-3" v-else>
            <div class="row">
              <div class="col col-3">
                <div class="row">
                  <img :src="selectedMovie.Poster" class="img-fluid" />
                </div>
                <div class="row text-center">
                  <h1 class="display-6">
                    {{ `${selectedMovie.Title} (${selectedMovie.Year})` }}
                  </h1>
                </div>
              </div>
              <div class="col col-9">
                <div class="row">
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Director</span>
                    </div>
                    <textarea
                      type="text"
                      readonly
                      class="form-control h-100"
                      :value="selectedMovie.Director"
                    />
                  </div>
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Writer</span>
                    </div>
                    <textarea
                      type="text"
                      readonly
                      class="form-control"
                      :value="selectedMovie.Writer"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Rating</span>
                    </div>
                    <textarea
                      type="text"
                      readonly
                      class="form-control"
                      :value="selectedMovie.Rated"
                    />
                  </div>
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Genre(s)</span>
                    </div>
                    <textarea
                      type="text"
                      readonly
                      class="form-control"
                      :value="selectedMovie.Genre"
                    />
                  </div>
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Runtime</span>
                    </div>
                    <textarea
                      type="text"
                      readonly
                      class="form-control"
                      :value="selectedMovie.Runtime"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="input-group mb-3 col">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Plot</span>
                    </div>
                    <textarea
                      type="text"
                      class="form-control text-justify"
                      :value="selectedMovie.Plot"
                      readonly
                      rows="5"
                    />
                  </div>
                </div>
                <div class="row">
                  <h4 class="ml-1">Critic Ratings:</h4>
                </div>
                <div class="row">
                  <div
                    class="form-group mb-3 col"
                    v-for="rating in selectedMovie.Ratings"
                    :key="rating.value"
                  >
                    <label :for="`rating-${rating.Source}`">
                      {{ rating.Source }}
                    </label>
                    <textarea
                      type="text"
                      :id="`rating-${rating.Source}`"
                      class="form-control text-justify"
                      :value="rating.Value"
                      readonly
                      rows="1"
                    />
                  </div>
                </div>
                <div class="row justify-content-center">
                  <h4 class="mx-1">Your Rating:</h4>
                </div>
                <div class="row justify-content-center">
                  <div
                    v-for="(score, index) in [1, 2, 3, 4, 5]"
                    :key="index"
                    @mouseenter="hoverRating = score"
                    @mouseleave="hoverRating = personalRatings[selectedImbdId]"
                    class="star"
                    @click="rate(score)"
                    :class="score <= hoverRating ? 'star-hover' : ''"
                  >
                    ★
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="backdrop" @click="showMovieModal = false"></div>
        </div>
      </div>
    </div>
    <div class="jumbotron m-4">
      <input
        type="text"
        class="form-control"
        v-model="apiKey"
        placeholder="API Key"
      />
      <div class="suggestion-container">
        <input
          type="text"
          class="form-control"
          v-model="searchMovie"
          placeholder="Search for a movie"
          @input="searchMovies"
        />
        <div>
          <div class="progress" v-if="timeout">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated w-100"
              role="progressbar"
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              Searching...
            </div>
          </div>
          <div v-if="!!error" class="alert alert-danger mt-4 text-center">
            {{ error }}
          </div>
          <div
            class="d-flex justify-content-around mt-4"
            v-for="(row, ind) in searchResultsRow"
            :key="ind"
          >
            <button
              class="btn btn-outline-primary w-25 mx-2 my-2"
              v-for="(result, mInd) in row"
              :key="mInd"
              @click="showMovieInfo(result.id)"
            >
              {{ result.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["title", "description"],

  mounted() {
    if (localStorage.getItem("moviePersonalRating"))
      this.personalRatings = JSON.parse(
        localStorage.getItem("moviePersonalRating")
      );
  },

  computed: {
    searchResultsRow() {
      if (this.results.length == 0) return [];

      return this.results.reduce(
        (result, _, i) =>
          i % 3 ? result : [...result, this.results.slice(i, i + 3)],
        []
      );
    },
  },

  data() {
    return {
      apiKey: "40f30081",
      timeout: false,
      error: "",
      searchMovie: "",
      selectedMovie: null,
      selectedImbdId: null,
      showMovieModal: false,
      results: [],
      hoverRating: 0,
      personalRatings: {},
    };
  },

  methods: {
    searchMovies() {
      if (this.timeout) return;

      setTimeout(() => {
        axios
          .get("https://www.omdbapi.com/", {
            params: {
              apikey: this.apiKey,
              s: this.searchMovie,
            },
          })
          .then(({ data }) => {
            try {
              this.results = data.Search.filter(
                (movie) => movie.Type == "movie"
              ).map((movie) => {
                return {
                  name: `${movie.Title} (${movie.Year})`,
                  id: movie.imdbID,
                };
              });
            } catch {
              this.error = data.Error;
              this.results = [];
            }
          });
        this.timeout = false;
      }, 3000);

      this.results = [];
      this.error = "";
      this.timeout = true;
    },
    showMovieInfo(imdbId) {
      this.showMovieModal = true;
      this.selectedMovie = null;
      this.selectedImbdId = imdbId;
      if (this.personalRatings[imdbId] != null)
        this.hoverRating = this.personalRatings[imdbId];
      else this.hoverRating = 0;
      axios
        .get("https://www.omdbapi.com/", {
          params: {
            apikey: this.apiKey,
            plot: "full",
            i: imdbId,
          },
        })
        .then(({ data }) => {
          this.selectedMovie = data;
        });
    },

    rate(score) {
      this.personalRatings[this.selectedImbdId] = score;
      localStorage.setItem(
        "moviePersonalRating",
        JSON.stringify(this.personalRatings)
      );
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
}

textarea[readonly] {
  background-color: white;
}

.star {
  font-size: 2rem;
  cursor: pointer;
}

.star-hover {
  color: gold;
}
</style>
