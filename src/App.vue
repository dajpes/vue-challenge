<template>
  <div>
    <label for="maxCP" class="max-cp">
      <input type="checkbox" id="maxCP" v-model="maxPoints" />
      <small>Maximum Combat Points</small>
    </label>
    <input
      type="text"
      class="input"
      placeholder="Pokemon or type"
      v-model="inputSearch"
      @input="searchPokemons"
    />
    <div v-if="searchingPokemons" class="loader"></div>

    <PokemonSuggestion />
  </div>
</template>

<script>
// import { reactive } from "vue";
import PokemonSuggestion from "./components/pokemon/PokemonSuggestion.vue";
import PokemonHandler from "./composables/Pokemons";

export default {
  setup() {
    const {
      searchPokemons,
      pokemonListResult,
      maxPoints,
      searchingPokemons,
      inputSearch,
      fetchPokemons,
    } = PokemonHandler();

    fetchPokemons();

    return {
      PokemonSuggestion,
      searchingPokemons,
      pokemonListResult,
      maxPoints,
      inputSearch,
      searchPokemons,
    };
  },
};
</script>