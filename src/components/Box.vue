<template>
  <div class="box has-text-weight-bold" :style="estilos">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

// Quando existe um objeto ou array, o correto é utilizar reactive
// O método ref é só para valores primitivos
const estilos = reactive({
  background: '#FAF0CA'
});
</script>