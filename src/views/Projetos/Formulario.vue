<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" placeholder="Nome do Projeto">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store'; //Importando a função useStore própria que eu criei em store/index.ts
import IProjeto from '@/interfaces/IProjeto';
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutacoes';import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';


export default defineComponent({
  name: 'Formulario',
  props: {
    id: { type: String }
  },
  mounted() {
    if(this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: '',
      projetos: [] as IProjeto[]
    }
  },
  methods: {
    salvar() {
      if(this.id) { // Editando o projeto
        this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeDoProjeto });
      } else { //Adicionando um novo projeto
        // Adiciona o projeto no store através de uma mutation, chamada através do store.commit método
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
      this.$router.push('/projetos'); //Redireciona para a página de projetos
    },
  },
  setup() {
    const store = useStore(); //Buscando a instância do store
    const { notificar } = useNotificador(); //Usando o hook notificador criado
    
    return { 
      store, // Retornando o estado reativo do Vuex para o componente Projetos.vue
      notificar //Disponibilizando o método notificar (hook) para o componente
    };
  }
});
</script>