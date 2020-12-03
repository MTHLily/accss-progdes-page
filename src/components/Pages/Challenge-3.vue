<template>
  <div class="container">
    <h1 class="display-6 text-center">{{ title }}</h1>
    <p class="lead text-justify">
      {{ description }}
    </p>
    <div class="d-flex m-4">
      <button class="btn btn-primary w-100 mx-4" @click="getCard">
        Get Card
      </button>
      <button class="btn btn-outline-danger w-100 mx-4" @click="cards = []">
        Clear Cards
      </button>
    </div>
    <div class="card-columns bg-light p-4">
      <div class="card" v-for="(card, index) in cards" :key="card.name">
        <img
          v-if="!card.loading"
          draggable="false"
          :src="card.image_url"
          alt="Card Image"
          class="card-image-top img-fluid"
        />
        <div class="card-header" v-if="!card.loading">
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
        </div>
        <div class="card-body">
          <div v-if="card.loading" class="text-center">Loading...</div>
          <div v-else>
            <p class="lead">
              <small>{{ card.description }}</small>
            </p>
          </div>
        </div>
        <div class="card-footer" v-if="!card.loading">
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
</template>

<script>
import axios from "axios";
export default {
  props: ["title", "description"],
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    async getCard(event, search = "random") {
      console.log("HELLO", search);
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
      axios
        .get("https://db.ygoprodeck.com/api/v7/randomcard.php")
        .then(({ data }) => {
          console.log(data);
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
    },
  },
};
</script>

<style></style>
