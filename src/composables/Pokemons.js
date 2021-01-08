import { reactive, toRefs, watch } from 'vue';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

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

    await new Promise(function(resolve) {
      setTimeout(resolve, 700);
    });

    if (!pokemonState.inputSearch) return

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

  const fetchPokemons = async () => {
    try {
      const fetchPok = await fetch(URL_PATH).then((res) => res.json());
      pokemonState.pokemonList = fetchPok;
    } catch (e) {
      console.error('Error while Fetching Pokemons: ', e);
      throw new Error(e);
    }
  };

  return { searchPokemons, fetchPokemons, ...toRefs(pokemonState) };
}
