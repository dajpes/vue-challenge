<template>
  <div>
    <label for="maxCP" class="max-cp">
      <input type="checkbox" id="maxCP" v-model="pokemon.maxPoints" />
      <small>Maximum Combat Points</small>
    </label>
    <input
      type="text"
      className="input"
      placeholder="Pokemon or type"
      v-model="pokemon.input"
      @input="searchPokemons"
    />
    <!-- {loading && <div className="loader"></div>} -->
    <!-- <Suggestions pokemonSuggestions={pokemonList} querySearch={pokemon} /> -->
    <PokemonSuggestion />
  </div>
</template>

<script>
import PokemonSuggestion from "./components/pokemon/PokemonSuggestion.vue";
import { reactive } from "vue";


const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

export default {
  setup() {
    const pokemon = reactive({
      pokemonList: [],
      maxPoints: false,
      input: "",
    });


    const searchPokemons = () => {
      console.log('Me esta escribiendo');
    };

    const fetchPokemons =  () => {
      const fetchPok = fetch(URL_PATH).then(res=>res.json())
      pokemon.pokemonList = fetchPok
    };

    fetchPokemons();


    return {
      PokemonSuggestion,
      pokemon,
      searchPokemons
    };
  },
};
</script>