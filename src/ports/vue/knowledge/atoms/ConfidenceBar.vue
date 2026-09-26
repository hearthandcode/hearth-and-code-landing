<!--
  ConfidenceBar (Vue port)

  Auto-generated from: k-confidence-bar
  Source: src/components/knowledge/atoms/ConfidenceBar.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const value = defineProps<{ value: number }>();
  const max = defineProps<{ max: number }>();
  const variant = defineProps<{ variant: string }>();
  const showValue = defineProps<{ showValue: boolean }>();
</script>

<template>
  <div :class="['kc-k-confidence-bar', 'kc-k-confidence-bar--placeholder']">
    <span>ConfidenceBar (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/ConfidenceBar.astro -->
  </div>
</template>

<style scoped>
.kc-k-confidence-bar {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
