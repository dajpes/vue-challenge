<template>
  <li>
    <img :src="pokemon.img" :alt="pokemon.About" />
    <div className="info">
        {{pokemon.Types}}
      <h1>
        <span style="margin-left: 10px">MaxCp:{{ pokemon.MaxCP || "0" }}</span>
      </h1>
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
export default {
  props: {
    pokemon: { type: Object, required: true },
  },
  setup() {
    return { PokemonType };
  },
};
</script>