<template>
  <section>
    <strong class="display">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// O Vue 3 trouxe o helper withDefaults para permitir informar um valor default
const props = withDefaults(
  defineProps<{ tempoEmSegundos?: number }>(),
  { tempoEmSegundos: 0 }
);

const tempoDecorrido = computed(() => {
  return new Date(props.tempoEmSegundos * 1000)
    .toISOString()
    .substring(11, 19)
});
</script>

<style scoped>
.display {
  color: var(--texto-primario);
}
</style>