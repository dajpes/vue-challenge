import { reactive, toRefs, watch } from 'vue';
import { FETCH } from '../config/constants';
const pokemonState = reactive({
  pokemonList: [],
  maxPoints: false,
  searchingPokemons: false,
  inputSearch: '',
  pokemonListResult: [],
});

export default function() {
  const searchPokemons = async () => {
    if (!pokemonState.inputSearch) {
      pokemonState.searchingPokemons = false;
      pokemonState.pokemonListResult.length = 0;
      return;
    }
    pokemonState.searchingPokemons = true;

    //The line below works as a "delay" for every pokemon search
    await new Promise(function(resolve) {
      setTimeout(resolve, 700);
    });

    if (!pokemonState.inputSearch) return;

    const getPokemons = pokemonState.pokemonList.filter(
      ({ Name: pokemonName, Types: types }) => {
        const searchPokemonByType = types.filter((type) =>
          type.toLowerCase().startsWith(pokemonState.inputSearch.toLowerCase()),
        );
        return (
          pokemonName
            .toLowerCase()
            .includes(pokemonState.inputSearch.toLowerCase()) ||
          searchPokemonByType.length
        );
      },
    );
    pokemonState.pokemonListResult =
      getPokemons.length > 3 ? getPokemons.slice(0, 4) : getPokemons;
    pokemonState.searchingPokemons = false;
  };

  watch(
    () => pokemonState.maxPoints,
    (maxPonts) => {
      if (!pokemonState.pokemonListResult.length) return;

      if (maxPonts) {
        pokemonState.pokemonListResult = pokemonState.pokemonListResult.sort(
          (prev, next) => prev.MaxCP - next.MaxCP,
        );
      } else {
        pokemonState.pokemonListResult = pokemonState.pokemonListResult.sort(
          (prev, next) => next.MaxCP - prev.MaxCP,
        );
      }
    },
  );

  const fetchAndStorePokemons = async () => {
    const fetchResponse = await fetch(FETCH.POKEMON_FETCH.value);
    pokemonState.pokemonList = await fetchResponse.json();
  };


  return { searchPokemons, fetchAndStorePokemons, ...toRefs(pokemonState) };
}
