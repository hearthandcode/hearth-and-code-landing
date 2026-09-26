<!--
  CitationRef (Vue port)

  Auto-generated from: k-citation-ref
  Source: src/components/knowledge/atoms/CitationRef.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const author = defineProps<{ author: string }>();
  const year = defineProps<{ year: string }>();
  const locator = defineProps<{ locator?: string }>();
  const href = defineProps<{ href?: string }>();
  const variant = defineProps<{ variant: string }>();
</script>

<template>
  <div :class="['kc-k-citation-ref', 'kc-k-citation-ref--placeholder']">
    <span>CitationRef (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/CitationRef.astro -->
  </div>
</template>

<style scoped>
.kc-k-citation-ref {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
