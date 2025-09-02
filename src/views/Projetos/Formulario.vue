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

<!-- <script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store'; //Importando a função useStore própria que eu criei em store/index.ts
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';


export default defineComponent({
  name: 'Formulario',
  props: {
    id: { type: String }
  },
  setup(props) {
    const router = useRouter(); //Obtendo acesso a lista de rotas (Pra não usar o this.$router)
    const store = useStore(); //Buscando a instância do store
    const { notificar } = useNotificador(); //Usando o hook notificador criado

    const nomeDoProjeto = ref(""); //Propriedade reativa

    if(props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
      router.push('/projetos'); //Redireciona para a página de projetos
    }

    const salvar = () => {
      if(props.id) { // Editando o projeto
        store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
          .then(() => lidarComSucesso());
      } else {
        // Dispara a action para cadastrar um projeto (que fará um POST na API incluíndo o nome de projeto)
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    }
    
    return { 
      nomeDoProjeto,
      salvar
    };
  }
});
</script> -->

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store'; //Importando a função useStore própria que eu criei em store/index.ts
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

const props = defineProps<{ id: string }>();
const router = useRouter(); //Obtendo acesso a lista de rotas (Pra não usar o this.$router)
const store = useStore(); //Buscando a instância do store
const { notificar } = useNotificador(); //Usando o hook notificador criado

const nomeDoProjeto = ref(""); //Propriedade reativa

if(props.id) {
  const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
  nomeDoProjeto.value = projeto?.nome || '';
}

const lidarComSucesso = () => {
  nomeDoProjeto.value = '';
  notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso');
  router.push('/projetos'); //Redireciona para a página de projetos
}

const salvar = async () => {
  if(props.id) { // Editando o projeto
    await store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value });
    lidarComSucesso();
  } else {
    // Dispara a action para cadastrar um projeto (que fará um POST na API incluíndo o nome de projeto)
    await store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
    lidarComSucesso();
  }
}
</script>