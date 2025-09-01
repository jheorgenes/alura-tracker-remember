<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoFinalizarTarefa="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed, ref } from 'vue';
import Temporizador from './Temporizador.vue';

const emit = defineEmits<{
  (e: 'aoSalvarTarefa', payload: {
    duracaoEmSegundos: number,
    descricao: string,
    projeto: { id: string; nome: string } | undefined
  }): void
}>();

const store = useStore();
const descricao = ref("");
const idProjeto = ref("");
const projetos = computed(() => store.state.projeto.projetos);

function salvarTarefa(tempoEmSegundos: number): void {
  // Chamando o método emit (antes chamado como this.$emit em options API)
  emit('aoSalvarTarefa', { 
    duracaoEmSegundos: tempoEmSegundos, 
    descricao: descricao.value, 
    projeto: projetos.value.find(proj => proj.id == idProjeto.value) 
  });
  descricao.value = '';
}
</script>

<style scoped>
.button {
  margin-left: 8px;
}
.box {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>