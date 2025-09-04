<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <!-- Aqui vai a view correspondente -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Projetos'
})
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>