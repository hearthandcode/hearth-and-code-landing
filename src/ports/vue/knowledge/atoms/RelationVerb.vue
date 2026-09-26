<!--
  RelationVerb (Vue port)

  Auto-generated from: k-relation-verb
  Source: src/components/knowledge/atoms/RelationVerb.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const verb = defineProps<{ verb: string }>();
  const direction = defineProps<{ direction: string }>();
</script>

<template>
  <div :class="['kc-k-relation-verb', 'kc-k-relation-verb--placeholder']">
    <span>RelationVerb (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/RelationVerb.astro -->
  </div>
</template>

<style scoped>
.kc-k-relation-verb {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
