import { reactive, toRefs } from 'vue';

const URL_PATH =
  'https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json';

const pokemonState = reactive({
  pokemonList: [],
  maxPoints: false,
  inputSearch: '',
  pokemonListResult: [],
});

export default function() {
  const searchPokemons = () => {
    console.log('Me esta escribiendo');
    if (pokemonState.inputSearch === '') {
      pokemonState.pokemonListResult.length = 0;
      return;
    }
    const getPokemons = pokemonState.pokemonList.filter(
      ({ Name: pokemonName, Types: types }) => {
        // console.log("El poke t: ", type,[...type]);
        // pokemon.Name.toLowerCase().includes(pokemon.toLowerCase())
        const searchPokemonByType = types.map((type) =>
          type.toLowerCase().startsWith(pokemonState.inputSearch),
        );
        // return pokemonName.toLowerCase().includes(pokemonState.inputSearch)
        return (
          pokemonName.toLowerCase().includes(pokemonState.inputSearch) ||
          searchPokemonByType.length
        );
      },
    );
    pokemonState.pokemonListResult =
      getPokemons.length > 3 ? getPokemons.slice(0, 4) : getPokemons;
  };

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
