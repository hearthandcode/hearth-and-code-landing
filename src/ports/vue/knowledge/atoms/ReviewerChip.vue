<!--
  ReviewerChip (Vue port)

  Auto-generated from: k-reviewer-chip
  Source: src/components/knowledge/atoms/ReviewerChip.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const name = defineProps<{ name: string }>();
  const initials = defineProps<{ initials?: string }>();
  const role = defineProps<{ role?: string }>();
  const decision = defineProps<{ decision?: string }>();
</script>

<template>
  <div :class="['kc-k-reviewer-chip', 'kc-k-reviewer-chip--placeholder']">
    <span>ReviewerChip (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/ReviewerChip.astro -->
  </div>
</template>

<style scoped>
.kc-k-reviewer-chip {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
