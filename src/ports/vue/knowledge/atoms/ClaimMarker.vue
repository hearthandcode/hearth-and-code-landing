<!--
  ClaimMarker (Vue port)

  Auto-generated from: k-claim-marker
  Source: src/components/knowledge/atoms/ClaimMarker.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const index = defineProps<{ index: number }>();
  const confidence = defineProps<{ confidence?: number }>();
  const href = defineProps<{ href?: string }>();
</script>

<template>
  <div :class="['kc-k-claim-marker', 'kc-k-claim-marker--placeholder']">
    <span>ClaimMarker (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/ClaimMarker.astro -->
  </div>
</template>

<style scoped>
.kc-k-claim-marker {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
