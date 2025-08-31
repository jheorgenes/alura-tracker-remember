<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Tracker">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarModo">Ativar modo {{ textoBtn }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoAlterarModo'],
  data() {
    return {
      modoEscuro: false
    }
  },
  computed: {
    textoBtn(): string {
      return this.modoEscuro ? 'claro' : 'escuro'
    }
  },
  methods: {
    alterarModo () {
      this.modoEscuro = !this.modoEscuro;
      this.$emit('aoAlterarModo', this.modoEscuro);
    }
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>