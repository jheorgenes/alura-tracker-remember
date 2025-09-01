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
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';


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
        this.store.dispatch(ALTERAR_PROJETO, { 
          id: this.id, 
          nome: this.nomeDoProjeto 
        }).then(() => this.lidarComSucesso());
      } else {
        // Dispara a action para cadastrar um projeto (que fará um POST na API incluíndo o nome de projeto)
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => {
            this.lidarComSucesso();
          });
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
      this.$router.push('/projetos'); //Redireciona para a página de projetos
    }
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