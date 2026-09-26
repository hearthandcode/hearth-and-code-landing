<!--
  ConceptTerm (Vue port)

  Auto-generated from: k-concept-term
  Source: src/components/knowledge/atoms/ConceptTerm.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const term = defineProps<{ term: string }>();
  const type = defineProps<{ type: string }>();
  const definition = defineProps<{ definition?: string }>();
  const href = defineProps<{ href?: string }>();
</script>

<template>
  <div :class="['kc-k-concept-term', 'kc-k-concept-term--placeholder']">
    <span>ConceptTerm (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/ConceptTerm.astro -->
  </div>
</template>

<style scoped>
.kc-k-concept-term {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
