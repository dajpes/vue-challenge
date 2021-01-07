<template>
  <div>
    <label for="maxCP" class="max-cp">
      <input type="checkbox" id="maxCP" v-model="pokemonState.maxPoints" />
      <small>Maximum Combat Points</small>
    </label>
    <input
      type="text"
      className="input"
      placeholder="Pokemon or type"
      v-model="pokemonState.inputSearch"
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
    const pokemonState = reactive({
      pokemonList: [],
      maxPoints: false,
      inputSearch: "",
      pokemonListResult: [],
    });

    const searchPokemons = () => {
      console.log("Me esta escribiendo");
      // console.log('Me esta escribiendo',pokemonState.pokemonList);

      const getPokemons = pokemonState.pokemonList.filter(
        ({ Name: pokemonName, Types: types }) => {
          // console.log("El poke t: ", type,[...type]);
          // pokemon.Name.toLowerCase().includes(pokemon.toLowerCase())
          const searchPokemonByType = types.map((type) =>
            type.toLowerCase().startsWith(pokemonState.inputSearch)
          );
          // return pokemonName.toLowerCase().includes(pokemonState.inputSearch)
          return (
            pokemonName.toLowerCase().includes(pokemonState.inputSearch) ||
            searchPokemonByType.length
          );
        }
      );
      pokemonState.pokemonListResult =
        getPokemons.length > 3 ? getPokemons.slice(0, 4) : getPokemons;
      console.log("Veamoooos el result", pokemonState.pokemonListResult);
    };

    const fetchPokemons = async () => {
      try {
        const fetchPok = await fetch(URL_PATH).then((res) => res.json());
        pokemonState.pokemonList = fetchPok;
      } catch (e) {
        console.log("Error while Fetching Pokemons: ", e);
        throw e;
      }
    };

    fetchPokemons();

    return {
      PokemonSuggestion,
      pokemonState,
      searchPokemons,
    };
  },
};
</script>