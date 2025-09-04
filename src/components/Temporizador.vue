<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>start</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Cronometro from './Cronometro.vue';

const emit = defineEmits<{
  (e: 'aoFinalizarTarefa', tempoEmSegundos: number): void
}>();

const cronometroRodando = ref(false);
const tempoEmSegundos = ref(0);
const cronometro = ref(0);

function iniciar() {
  cronometroRodando.value = true;
  cronometro.value = setInterval(() => {
    tempoEmSegundos.value++;
  }, 1000);
}

function finalizar() {
  emit('aoFinalizarTarefa', tempoEmSegundos.value);
  tempoEmSegundos.value = 0;
  cronometroRodando.value = false;
  clearInterval(cronometro.value);
}
</script>