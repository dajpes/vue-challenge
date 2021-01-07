<template>
  <div>
    <ul v-if="pokemonListResult.length" class="suggestions">
      <PokemonSuggestionItem
        v-for="pokemon in pokemonListResult"
        :key="+pokemon.Number"
        :pokemon="pokemon"
      />
    </ul>
    <ul v-else class="suggestions">
      <li>
        <img
          src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
          alt=""
        />
        <div class="info">
          <h1 class="no-results">No results</h1>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PokemonHandler from "@/composables/Pokemons";
import PokemonSuggestionItem from "./PokemonSuggestionItem";
export default {
  setup() {
    const { pokemonListResult } = PokemonHandler();

    return { PokemonSuggestionItem, pokemonListResult };
  },
};
</script>