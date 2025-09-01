<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje :|
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button class="delete" aria-label="close" @click="fecharModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
          </div>
        </section>
        <footer class="modal-card-foot buttons">
          <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { computed, onMounted, ref } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

const tarefaSelecionada = ref<ITarefa | null>();

const store = useStore();
// Fazendo o dispatch direto quando o setup é chamado
// store.dispatch(OBTER_TAREFAS);
// store.dispatch(OBTER_PROJETOS);

// lifecycle (apenas quando montar o componente no dom é que busca)
onMounted(async () => {
  await store.dispatch(OBTER_TAREFAS);
  await store.dispatch(OBTER_PROJETOS);
})

const semTarefas = computed(() => tarefas.value.length === 0);
const tarefas = computed(() => store.state.tarefa.tarefas);

function salvarTarefa(tarefa: ITarefa): void {
  store.dispatch(CADASTRAR_TAREFA, tarefa);
}

function selecionarTarefa(tarefa: ITarefa) {
  tarefaSelecionada.value = tarefa;
}

function fecharModal() {
  tarefaSelecionada.value = null;
}

async function alterarTarefa() {
  if(tarefaSelecionada.value) {
    await store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value);
    fecharModal();
  }
}
</script>
