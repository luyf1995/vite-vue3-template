<template>
  <div class="tag-visited">
    <el-scrollbar>
      <ul class="tag-list">
        <li
          v-for="(item, index) in tagVisitedList"
          :key="index"
          class="tag-item"
          :class="{ active: isCurrentTag(item.path) }"
          @click="handleLinkTo(item.path)"
        >
          <i v-if="isCurrentTag(item.path)" class="circle-icon"></i>
          <span class="tag-name">{{ item.meta && item.meta.title }}</span>
          <i v-if="tagVisitedList.length > 1" class="close-icon" @click.stop="handleDeleteTagVisited(item)">
            <lyf-icon icon-class="icon-close-bold"></lyf-icon>
          </i>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useAppStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'

import LyfIcon from '@/components/lyf-icon/index.vue'

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const tagVisitedList = computed(() => appStore.tagVisitedList)

/**
 * 路由跳转
 * @param {string} path
 */
const handleLinkTo = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}
/**
 * 增加页签
 * @param {Object} tagVisited
 */
const hanelAddTagVisited = tagVisited => {
  if (tagVisited.meta && tagVisited.meta.noTagRecord) {
    return
  }
  appStore.addTagVisited(tagVisited)
}
/**
 * 删除页签
 * @param {Object} tagVisited
 */
const handleDeleteTagVisited = tagVisited => {
  appStore.deleteTagVisited(tagVisited)

  // 如果删除的是当前激活的active，去自动跳转到最后一个tag

  if (isCurrentTag(tagVisited.path)) {
    router.push(tagVisitedList.value.slice(-1)[0])
  }
}

/**
 * 是否是当前路由对应的tag
 * @param {string} path
 * @return {boolean}
 */
const isCurrentTag = (path: string) => {
  return route.path === path
}

// 监听路由的变化，记录页签
watch(
  route,
  value => {
    hanelAddTagVisited(value)
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.tag-visited {
  padding: 0 20px;
  height: 32px;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 10%),
    0 1px 2px 0 rgb(0 0 0 / 6%);

  :deep(.el-scrollbar__view) {
    height: 100%;

    .tag-list {
      display: flex;
      align-items: center;
      height: 100%;

      .tag-item {
        display: flex;
        align-items: center;
        padding: 2px 6px;
        height: 25px;
        color: #4b5563;
        border: 1px solid rgb(229 231 235);
        cursor: pointer;

        & ~ .tag-item {
          margin-left: 8px;
        }

        &.active {
          color: #fff;
          background-color: $--color-primary;
        }

        .circle-icon {
          display: inline-block;
          margin-right: 5px;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 50%;
        }

        .tag-name {
          margin-right: 6px;
        }

        .close-icon {
          width: 12px;
          height: 12px;
          font-size: 12px;
          border-radius: 50%;

          svg {
            vertical-align: super;
          }

          &:hover {
            background-color: #d1d5db;

            svg {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
