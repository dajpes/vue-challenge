<template>
  <li>
    <img :src="pokemon.img" :alt="pokemon.About" />
    <div class="info">
      <PokemonName :name="pokemon.Name" />
      <p>Cp:{{ pokemon.MaxCP || "0" }}</p>
      <PokemonType
        v-for="type in pokemon.Types"
        :key="`${type}_${pokemon.Number}`"
        :pokemonType="type"
      />
    </div>
  </li>
</template>

<script>
import PokemonType from "./PokemonType";
import PokemonName from "./PokemonName";
export default {
  props: {
    pokemon: { type: Object, required: true },
  },
  setup() {
    return { PokemonType, PokemonName };
  },
};
</script>