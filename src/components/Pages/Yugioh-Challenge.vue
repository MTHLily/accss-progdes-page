<template>
  <div class="container">
    <h1 class="display-6 text-center">Yu-Gi-Oh! Card API</h1>
    <p class="lead text-justify">
      <a href="https://db.ygoprodeck.com/api-guide/">YGOPRODECK</a> provides an
      API endpoint that allows for easy access to most, if not all Yu-Gi-Oh!
      cards currently available. Make use of this api to make a collection of
      cards. You can either search for the cards, or take a random card from the
      api. You can reorder the cards by dragging and dropping them on top of
      each other.
    </p>
    <div class="d-flex justify-content-center m-4">
      <ul class="list-group  w-50">
        <li class="list-group-item bg-light">Criteria</li>
        <li class="list-group-item">
          Get a random card. <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Search for and add a card by its exact name.
          <span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Display a list of search suggestions when typing for the name.<span
            class="float-right"
            >3 pts</span
          >
        </li>
        <li class="list-group-item">
          Display a loading message while retrieving data from the API
          endpoint.<span class="float-right">1 pt</span>
        </li>
        <li class="list-group-item">
          Notify the user when there is no card of that name.<span
            class="float-right"
            >1 pt</span
          >
        </li>
        <li class="list-group-item">
          Display the card details. Differentiate monster cards, spell cards and
          trap cards. <span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Use drag and drop to reorder the list of cards.
          <span class="float-right">3 pts</span>
        </li>
        <li class="list-group-item">
          Remove a card individually or clear them all at once.
          <span class="float-right">2 pts</span>
        </li>
      </ul>
    </div>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Card name..."
        v-model="search"
        @input="getSuggestions"
      />
      <div class="suggestions">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            :class="suggestion.hover ? 'active' : ''"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="search = suggestion.suggestion"
            @mouseover="suggestion.hover = true"
            @mouseleave="suggestion.hover = false"
          >
            {{ suggestion.suggestion }}
          </li>
        </ul>
      </div>
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          @click="getCard($event, search)"
        >
          Add
        </button>
      </div>
    </div>

    <div class="d-flex m-4">
      <button class="btn btn-primary w-100 mx-4" @click="getCard">
        Get Random Card
      </button>
      <button class="btn btn-outline-danger w-100 mx-4" @click="cards = []">
        Clear Cards
      </button>
    </div>
    <div class="card-grid bg-light p-4">
      <div class="h-100" v-for="(card, index) in cards" :key="card.name">
        <div
          class="card"
          draggable="true"
          style="width: 15rem;"
          @dragstart="cardStartDrag($event, index)"
          @drop="cardOnDrop($event, index)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div
            v-if="!card.loading"
            style="background: url('https://picsum.photos/421/614'); height: 21.7rem;"
          >
            <img
              draggable="false"
              :src="card.image_url"
              alt="Card Image"
              class="card-image-top img-fluid"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ card.name }}
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="cards.splice(index, 1)"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </h5>
            <div v-if="card.loading" class="text-center">Loading...</div>
            <div v-else>
              <p>
                <small>{{ card.description }}</small>
              </p>
            </div>
          </div>
          <div class="card-footer flex-grow-1" v-if="!card.loading">
            <div v-if="card.type == 'Spell Card' || card.type == 'Trap Card'">
              {{ card.type }}
            </div>
            <div class="d-flex justify-content-between" v-else>
              <span>{{ card.atk }} ATK {{ card.def }} DEF </span>
              <span>
                {{ card.attribute }}
              </span>
            </div>
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
  data() {
    return {
      cards: [],
      search: "",
      timeout: false,
      suggestions: [
        {
          hover: false,
          suggestion: "Search within for the heart of cards.",
        },
      ],
    };
  },
  methods: {
    async getCard(event, search = "random") {
      let card = {
        name: null,
        type: null,
        description: null,
        image_url: "...",
        atk: null,
        def: null,
        attribute: null,
        loading: true,
      };
      this.cards.push(card);
      if (search == "random")
        axios
          .get("https://db.ygoprodeck.com/api/v7/randomcard.php")
          .then(({ data }) => {
            let attr;
            switch (data.attribute) {
              case "DARK":
                attr = "闇";
                break;
              case "DIVINE":
                attr = "神";
                break;
              case "EARTH":
                attr = "地";
                break;
              case "FIRE":
                attr = "炎";
                break;
              case "LIGHT":
                attr = "光";
                break;
              case "WATER":
                attr = "水";
                break;
              case "WIND":
                attr = "風";
                break;
              default:
                attr = null;
            }

            card.name = data.name;
            card.type = data.type;
            card.description = data.desc;
            card.image_url = data.card_images[0].image_url;
            card.atk = data.atk;
            card.def = data.def;
            card.attribute = attr;
            card.loading = false;
          });
      else {
        console.log("Searching...");
        axios
          .get(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${this.search}`
          )
          .then(({ data }) => {
            console.log(data.data[0]);
            let attr;
            switch (data.data[0].attribute) {
              case "DARK":
                attr = "闇";
                break;
              case "DIVINE":
                attr = "神";
                break;
              case "EARTH":
                attr = "地";
                break;
              case "FIRE":
                attr = "炎";
                break;
              case "LIGHT":
                attr = "光";
                break;
              case "WATER":
                attr = "水";
                break;
              case "WIND":
                attr = "風";
                break;
              default:
                attr = null;
            }

            card.name = data.data[0].name;
            card.type = data.data[0].type;
            card.description = data.data[0].desc;
            card.image_url = data.data[0].card_images[0].image_url;
            card.atk = data.data[0].atk;
            card.def = data.data[0].def;
            card.attribute = attr;
            card.loading = false;
          })
          .catch(() => {
            this.cards.splice(this.cards.length - 1, 1);
          });
      }
    },
    findCard(name) {
      this.cards.forEach((c) => {
        if (c.name == name) return c;
      });
      return null;
    },
    cardStartDrag(event, ind) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("dragInd", ind);
    },
    cardOnDrop(event, ind) {
      const dragInd = event.dataTransfer.getData("dragInd");
      const dropInd = ind;

      this.cards.splice(dropInd, 0, this.cards.splice(dragInd, 1)[0]);
    },
    getSuggestions() {
      if (this.timeout) return;

      setTimeout(() => {
        axios
          .get(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${this.search}`
          )
          .then(({ data }) => {
            this.suggestions = [];
            console.log(data.data);
            for (let x = 0; x < 10 && x < data.data.length; x++)
              this.suggestions.push({
                hover: false,
                suggestion: data.data[x].name,
              });
          })
          .catch(() => {
            this.suggestions = [
              {
                hover: false,
                suggestion:
                  "The heart of the cards have rejected you. What you seek cannot be found.",
              },
            ];
          }),
          (this.timeout = false);
      }, 3000);
      this.suggestions = [
        {
          hover: false,
          suggestion:
            "The heart of the cards are calling out, please wait warmly...",
        },
      ];
      this.timeout = true;
    },
  },
};
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem 1rem;
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
.input-group input:focus + .suggestions {
  display: block;
}

.suggestions:hover {
  display: block;
}

.suggestions .list-group .list-group-item {
  cursor: pointer;
}
</style>
