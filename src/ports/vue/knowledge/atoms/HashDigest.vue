<!--
  HashDigest (Vue port)

  Auto-generated from: k-hash-digest
  Source: src/components/knowledge/atoms/HashDigest.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const hash = defineProps<{ hash: string }>();
  const algorithm = defineProps<{ algorithm: string }>();
  const prefix = defineProps<{ prefix: boolean }>();
</script>

<template>
  <div :class="['kc-k-hash-digest', 'kc-k-hash-digest--placeholder']">
    <span>HashDigest (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/HashDigest.astro -->
  </div>
</template>

<style scoped>
.kc-k-hash-digest {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
