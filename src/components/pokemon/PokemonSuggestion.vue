<template>
  <div>
    <ul v-if="pokemonListResult.length" className="suggestions">
      <PokemonSuggestionItem
        v-for="pokemon in pokemonListResult"
        :key="+pokemon.Number"
        :pokemon="pokemon"
      />
    </ul>
    <ul v-else>
      <li>
        <img
          src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png"
          alt=""
        />
        <div className="info">
          <h1 className="no-results">No results</h1>
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