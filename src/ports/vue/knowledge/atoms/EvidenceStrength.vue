<!--
  EvidenceStrength (Vue port)

  Auto-generated from: k-evidence-strength
  Source: src/components/knowledge/atoms/EvidenceStrength.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const tier = defineProps<{ tier: string }>();
  const showLabel = defineProps<{ showLabel: boolean }>();
</script>

<template>
  <div :class="['kc-k-evidence-strength', 'kc-k-evidence-strength--placeholder']">
    <span>EvidenceStrength (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/EvidenceStrength.astro -->
  </div>
</template>

<style scoped>
.kc-k-evidence-strength {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
