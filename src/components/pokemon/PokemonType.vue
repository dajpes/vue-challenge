<template>
  <span :class="`type ${pokemonState.type}`">{{ pokemonType }}</span>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  props: {
    pokemonType: { type: String, default: "Normal" },
  },
  setup(props) {
    const pokemonState = reactive({
      type: computed(() => props.pokemonType.toLowerCase()),
    });
    return { pokemonState };
  },
};
</script>
