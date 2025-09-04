<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="corpo"></slot>
      </section>
      <footer class="modal-card-foot buttons">
        <slot name="rodape"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  mostrar: boolean
}>();
</script>