<!--
  LanguageTag (Vue port)

  Auto-generated from: k-language-tag
  Source: src/components/knowledge/atoms/LanguageTag.astro

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->

<script setup lang="ts">
  const language = defineProps<{ language: string }>();
  const variant = defineProps<{ variant: string }>();
</script>

<template>
  <div :class="['kc-k-language-tag', 'kc-k-language-tag--placeholder']">
    <span>LanguageTag (Vue port)</span>
    <!-- TODO: port rendering logic from src/components/knowledge/atoms/LanguageTag.astro -->
  </div>
</template>

<style scoped>
.kc-k-language-tag {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
