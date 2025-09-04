<template>
  <button class="button" @click="clicado" :disabled="desabilitado">
    <span class="icon">
      <i class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script setup lang="ts">

defineProps<{
  texto: string
  icone: string
  desabilitado?: boolean
}>();

const emit = defineEmits<{ (e: 'clicado'): void }>();

function clicado(): void {
  emit('clicado');
}
</script>