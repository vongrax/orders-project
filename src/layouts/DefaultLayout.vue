<template>
  <div class="container">
    <base-header />
    <div class="layout-content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseHeader from '@/components/BaseHeader.vue';
</script>
<style scoped>
.container {
  min-height: 100vh;
  max-width: 1440px;
  box-sizing: border-box;
  margin: 0 auto;
}

.layout-content {
  margin: 45px;
}
</style>
