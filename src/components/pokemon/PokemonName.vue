<template>
  <h1>
    <span v-html="highLightName()"></span>
  </h1>
</template>

<script>
import PokemonHandler from "@/composables/Pokemons";
export default {
  props: {
    name: { type: String, required: true },
  },
  setup(props) {
    const { inputSearch } = PokemonHandler();
    const highLightName = () => {
      const searchPattern = new RegExp(inputSearch.value, "ig");
      const foundName = props.name.search(searchPattern) !== -1;
      return !foundName
        ? props.name
        : props.name.replace(
            searchPattern,
            '<span class="hl">' + inputSearch.value + "</span>"
          );
    };

    return { inputSearch, highLightName };
  },
};
</script>


