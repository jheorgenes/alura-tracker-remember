import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from '@/store'
import { NOTIFICAR } from "@/store/tipo-mutacoes";

/**
 * Cria um alias de tipagem chamado Notificador
 * Dentro desse type, contém uma função chamda notificar que retorna void. Esse retorno é especificado usando '=>'
 * Essa função tem seus parâmetros (tipo: TipoNotificacao, titulo: string, texto: string)
 */
type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void
}

/** 
 * Export Default (desse hook) com Arrow Function
 * 'export default' -> permite importar essa função direto sem { }.
 * '(): Notificador' -> define que essa função não recebe parâmetros e retorna um objeto do tipo Notificador
 * Exportando uma function anônima que retorna um Notificador (tipo de retorno dessa function).
 * '=> { ... }' -> arrow function do JavaScript (função anônima que mantém escopo léxico de this — embora aqui não se use this).
 * 
 * Função Interna: notificar
 * 'const notificar = (...) => { ... }' -> define uma função usando arrow function.
 * ': void' -> anotação TypeScript dizendo explicitamente que não retorna nada.
 * 'store.commit(...)' -> chama a mutação NOTIFICAR do Vuex, passando um objeto com os dados da notificação.
 * 
 * Retornando o Hook
 * Retorna um objeto compatível com o type Notificador
 * Esse objeto terá a função notificar pronta para ser usada em qualquer componente que importar esse hook.
 */
export default (): Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string): void => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo
    });
  }

  return {
    notificar
  }
}