<!--
  StatusPill (Vue port)

  Auto-generated from: k-status-pill
  Source: src/components/knowledge/atoms/StatusPill.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const status = defineProps<{ status: string }>();
  const label = defineProps<{ label?: string }>();
  const size = defineProps<{ size: string }>();
</script>

<template>
  <div :class="['kc-k-status-pill', 'kc-k-status-pill--placeholder']">
    <span>StatusPill (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/StatusPill.astro -->
  </div>
</template>

<style scoped>
.kc-k-status-pill {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
