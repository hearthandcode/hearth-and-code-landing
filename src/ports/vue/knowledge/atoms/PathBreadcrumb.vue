<!--
  PathBreadcrumb (Vue port)

  Auto-generated from: k-path-segment
  Source: src/components/knowledge/atoms/PathBreadcrumb.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const segment = defineProps<{ segment: string }>();
  const href = defineProps<{ href?: string }>();
  const icon = defineProps<{ icon: string }>();
</script>

<template>
  <div :class="['kc-k-path-segment', 'kc-k-path-segment--placeholder']">
    <span>PathBreadcrumb (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/PathBreadcrumb.astro -->
  </div>
</template>

<style scoped>
.kc-k-path-segment {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
