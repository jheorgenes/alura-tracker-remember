import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

/**
 * Definição do estado global da aplicação
 * - Aqui definimos todos os estados que serão
 *   gerenciados pelo Vuex.
 */
export interface Estado {
  notificacoes: INotificacao[],
  projeto: EstadoProjeto,
  tarefa: EstadoTarefa,
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
    notificacoes: [],
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: []
    },
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      // Removendo a notificação que foi adicionada
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
      }, 3000);
    }
  },
  modules: {
    projeto,
    tarefa
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