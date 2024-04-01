<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.app-main {
  overflow: auto;
  padding: 10px;
  background-color: #f0f2f5;
  flex: 1;
}
</style>
