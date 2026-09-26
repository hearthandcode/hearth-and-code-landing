<!--
  ProvenanceMarker (Vue port)

  Auto-generated from: k-provenance-marker
  Source: src/components/knowledge/atoms/ProvenanceMarker.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const kind = defineProps<{ kind: string }>();
  const source = defineProps<{ source?: string }>();
</script>

<template>
  <div :class="['kc-k-provenance-marker', 'kc-k-provenance-marker--placeholder']">
    <span>ProvenanceMarker (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/ProvenanceMarker.astro -->
  </div>
</template>

<style scoped>
.kc-k-provenance-marker {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
