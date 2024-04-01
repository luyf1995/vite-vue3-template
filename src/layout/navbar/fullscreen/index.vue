<template>
  <div class="fullscreen-container">
    <lyf-icon v-if="!isFullscreen" icon-class="icon-quanping" class="full-icon" @click="handleFullscreen"></lyf-icon>
    <lyf-icon
      v-if="isFullscreen"
      icon-class="icon-quxiaoquanping"
      class="full-icon"
      @click="handleFullscreen"
    ></lyf-icon>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

import screenfull from 'screenfull'
import LyfIcon from '@/components/lyf-icon/index.vue'
import { ElMessage } from 'element-plus'

const isFullscreen = ref(false)

/**
 * 全屏/取消全屏
 * @param {Boolean} isFullscreen 是否全屏
 */
const handleFullscreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: '浏览器不支持全屏',
      type: 'warning'
    })
  } else {
    screenfull.toggle()
  }
}

/**
 * 全屏/取消全屏change回调
 */
const fullscreenChange = () => {
  if (screenfull.isEnabled) {
    isFullscreen.value = screenfull.isFullscreen
  }
}
onMounted(() => screenfull.isEnabled && screenfull.on('change', fullscreenChange))
onUnmounted(() => screenfull.isEnabled && screenfull.off('change', fullscreenChange))
</script>
<style scoped lang="scss">
.full-icon {
  font-size: 22px;
  cursor: pointer;
}
</style>
