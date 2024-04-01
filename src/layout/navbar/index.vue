<template>
  <div class="navbar">
    <div class="navbar__left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="navbar__right">
      <fullscreen></fullscreen>
      <user></user>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Fullscreen from './fullscreen/index.vue'
import User from './user/index.vue'
import Breadcrumb from './breadcrumb/index.vue'
</script>
<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 48px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
