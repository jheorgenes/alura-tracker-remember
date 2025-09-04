<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </Box>
</template>

<script setup lang="ts">
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import ITarefa from '@/interfaces/ITarefa';

// props
const props = defineProps<{ tarefa: ITarefa }>();

// emits
// Também poderia ser feito assim: const emit = defineEmits(['aoTarefaClicada'])
// Mas ao fazer isso, é possível passar qualquer coisa na prop emitida
const emit = defineEmits<{
  (e: 'aoTarefaClicada', tarefa: ITarefa): void
}>();

function tarefaClicada() {
  emit('aoTarefaClicada', props.tarefa);
}
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>