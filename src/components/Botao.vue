<template>
  <button class="button" @click="clicado" :disabled="desabilitado">
    <span class="icon">
      <i class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Botao',
  props: {
    texto: {
      type: String,
      required: true
    },
    icone: {
      type: String,
      required: true
    },
    desabilitado: {
      type: Boolean
    }
  },
  emits: ['clicado'],
  methods: {
    clicado(): void {
      this.$emit('clicado');
    }
  }
});
</script>