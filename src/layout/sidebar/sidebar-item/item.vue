<template>
  <span class="menu-title">{{ title }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>
<style lang="scss">
.menu-title {
  vertical-align: middle;
  margin-left: 20px;
}
</style>
