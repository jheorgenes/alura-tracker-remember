import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";

/**
 * Definição do estado global da aplicação
 * - Aqui definimos todos os estados que serão
 *   gerenciados pelo Vuex.
 */
interface Estado {
  projetos: IProjeto[]
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
    notificacoes: []
  },
  mutations: {
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
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      // Removendo a notificação que foi adicionada
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id);
      }, 3000);
    }
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