<!--
  SeverityDot (Vue port)

  Auto-generated from: k-severity-dot
  Source: src/components/knowledge/atoms/SeverityDot.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const severity = defineProps<{ severity: string }>();
  const label = defineProps<{ label?: string }>();
  const size = defineProps<{ size: string }>();
  const pulsing = defineProps<{ pulsing: boolean }>();
</script>

<template>
  <div :class="['kc-k-severity-dot', 'kc-k-severity-dot--placeholder']">
    <span>SeverityDot (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/SeverityDot.astro -->
  </div>
</template>

<style scoped>
.kc-k-severity-dot {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
