<!--
  LicenseIcon (Vue port)

  Auto-generated from: k-license
  Source: src/components/knowledge/atoms/LicenseIcon.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const license = defineProps<{ license: string }>();
  const href = defineProps<{ href?: string }>();
</script>

<template>
  <div :class="['kc-k-license', 'kc-k-license--placeholder']">
    <span>LicenseIcon (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/LicenseIcon.astro -->
  </div>
</template>

<style scoped>
.kc-k-license {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
