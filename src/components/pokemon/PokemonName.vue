<template>
  <h1>
    <span class="">{{ name }}</span>
    <p>
        {{inputSearch}}
    </p>
  </h1>
</template>

<script>
import PokemonHandler from "@/composables/Pokemons";
export default {
  props: {
    name: { type: String, required: true },
  },
  setup() {
    const { inputSearch } = PokemonHandler();
    return {inputSearch};
  },
};
</script>


