<!--
  TimestampAtom (Vue port)

  Auto-generated from: k-timestamp
  Source: src/components/knowledge/atoms/TimestampAtom.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const iso = defineProps<{ iso: string }>();
  const relative = defineProps<{ relative?: string }>();
  const variant = defineProps<{ variant: string }>();
</script>

<template>
  <div :class="['kc-k-timestamp', 'kc-k-timestamp--placeholder']">
    <span>TimestampAtom (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/TimestampAtom.astro -->
  </div>
</template>

<style scoped>
.kc-k-timestamp {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
