<template>
  <p>Cp:{{ cp }}</p>
</template>

<script>
export default {
  props: {
    cp: { type: Number, default: 0 },
  },
};
</script>