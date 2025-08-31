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

<script lang="ts">
import { key } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  methods: {
    salvarTarefa(tempoEmSegundos: number): void {
      this.$emit('aoSalvarTarefa', { 
        duracaoEmSegundos: tempoEmSegundos, 
        descricao: this.descricao, 
        projeto: this.projetos.find(proj => proj.id == this.idProjeto) 
      });
      this.descricao = '';
    }
  },

  /** 
  * Retorna os projetos do estado global para serem utilizados no componente (como se fosse propriedades do data).
  * Isso permite que o componente reaja a mudanças na store.
  * Pra isso é necessário utilizar o computed, que cria uma propriedade reativa.
  * Assim, quando o estado global mudar, a propriedade projetos também mudará automaticamente.
  */
  setup() {
    
    const store = useStore(key); // Importa a store do Vuex usando a key definida
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
});
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