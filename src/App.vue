<template>
  <div>
    <label for="maxCP" class="max-cp">
      <input type="checkbox" id="maxCP" v-model="maxPoints" @change="bbb" />
      <small>Maximum Combat Points</small>
    </label>
    <input
      type="text"
      class="input"
      placeholder="Pokemon or type"
      v-model="inputSearch"
      @input="searchPokemons"
    />
    <!-- {loading && <div class="loader"></div>} -->

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
      inputSearch,
      fetchPokemons,
    } = PokemonHandler();

    fetchPokemons();

    return {
      PokemonSuggestion,
      pokemonListResult,
      maxPoints,
      inputSearch,
      searchPokemons,
    };
  },
};
</script>