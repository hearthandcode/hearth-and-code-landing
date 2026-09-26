<!--
  DOILink (Vue port)

  Auto-generated from: k-doi-link
  Source: src/components/knowledge/atoms/DOILink.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const doi = defineProps<{ doi: string }>();
  const short = defineProps<{ short: boolean }>();
</script>

<template>
  <div :class="['kc-k-doi-link', 'kc-k-doi-link--placeholder']">
    <span>DOILink (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/DOILink.astro -->
  </div>
</template>

<style scoped>
.kc-k-doi-link {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
