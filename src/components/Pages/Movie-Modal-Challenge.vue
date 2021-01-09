<template>
  <div class="container">
    <div class="backdrop" v-if="showMovieModal" @click="showMovieModal = false">
      <div class="modal show">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-body" v-if="selectedMovie == null">
              Retrieving details...
            </div>
            <div class="modal-body mx-3" v-else>
              <div class="row">
                <div class="col col-3">
                  <div class="row">
                    <img :src="selectedMovie.Poster" class="img-fluid" />
                  </div>
                  <div class="row">
                    {{ `${selectedMovie.Title} (${selectedMovie.Year})` }}
                  </div>
                </div>
                <div class="col col-9">
                  World
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="display-6 text-center">{{ title }}</h1>
    <p class="lead text-justify">
      {{ description }}
    </p>

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
          <div class="jumbotron" v-if="timeout">Searching...</div>
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

  mounted() {},

  computed: {
    searchResultsRow() {
      // var cols = 3,
      //   cnt = 0,
      //   results = [],
      //   row = [];

      // this.results.forEach((result) => {
      //   if (cnt == 0) row = [];
      //   if (cnt == cols) {
      //     console.log("NEW ROW");
      //     cnt = 0;
      //     results.push(row);
      //   }

      //   row.push(result);
      //   cnt++;
      // });

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
      searchMovie: "",
      selectedMovie: null,
      showMovieModal: false,
      results: [],
    };
  },

  methods: {
    searchMovies() {
      if (this.timeout) return;

      setTimeout(() => {
        axios
          .get("http://www.omdbapi.com/", {
            params: {
              apikey: this.apiKey,
              s: this.searchMovie,
            },
          })
          .then(({ data }) => {
            try {
              this.results = data.Search.map((movie) => {
                return {
                  name: `${movie.Title} (${movie.Year})`,
                  id: movie.imdbID,
                };
              });
            } catch {
              this.results = [];
            }
          });
        this.timeout = false;
      }, 3000);

      this.timeout = true;
    },
    showMovieInfo(imdbId) {
      this.showMovieModal = true;
      this.selectedMovie = null;
      axios
        .get("http://www.omdbapi.com/", {
          params: {
            apikey: this.apiKey,
            i: imdbId,
          },
        })
        .then(({ data }) => {
          this.selectedMovie = data;
        });
    },
  },
};
</script>

<style scoped>
.suggestion-container {
  position: relative;
}

.suggestions {
  display: none;
  position: absolute;
  width: 100%;
  /* height: 10rem; */
  max-height: 10rem;
  overflow-y: auto;
  /* bottom: -10rem; */
  top: 2.3rem;
  z-index: 10;
  border: 1px solid lightgray;
  border-radius: 0 0 6px 6px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.suggestions::-webkit-scrollbar {
  display: none;
}

/* .input-group:focus-within .suggestions { */
input:focus + .suggestions {
  display: block;
}

.suggestions:hover {
  display: block;
}

.suggestions .list-group .list-group-item {
  cursor: pointer;
}

.modal {
  display: block;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
}
</style>
