import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import http from "@/http"
import ITarefa from "@/interfaces/ITarefa";

/**
 * Definição do estado global da aplicação
 * - Aqui definimos todos os estados que serão
 *   gerenciados pelo Vuex.
 */
interface Estado {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

/**
 * Sempre que formos usar o store em um componente Vue,
 * precisamos usar uma chave de injeção (InjectionKey)
 * para informar o tipo do estado desse store.
 */
export const key: InjectionKey<Store<Estado>> = Symbol();

/**
 * Criação do store do Vuex
 */
export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: []
  },
  mutations: {
    // Projetos
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(p => p.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(p => p.id != id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos; //Inserindo na lista os projetos obtidos do axios
    },
    // Tarefas
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas; //Inserindo na lista os projetos obtidos do axios
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
    // Notificações
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      // Removendo a notificação que foi adicionada
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
      }, 3000);
    }
  },
  actions: {
    // Projetos
    [OBTER_PROJETOS]({ commit }) { //Extraíndo apenas o método commit dos parametros disponíveis das mutations
      http.get('projetos')
          .then(resposta => commit(DEFINIR_PROJETOS, resposta.data)); //Chamando a mutation para injetar a lista de projetos recuperada
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
         nome: nomeDoProjeto
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) { //Esse commit reaproveita o estado local para disparar uma nova mutation
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
    // Tarefas
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
          .then(resposta => commit(DEFINIR_TAREFAS, resposta.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  }
});

/**
 * Criando uma forma própria de exportação do useStore Vuex com a chave, 
 * pra não ficar importando várias propriedades do vuex toda hora que quiser utilizá-lo.
 * @returns Retorna o store do Vuex com o tipo do estado
 */
export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}