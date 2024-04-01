<template>
  <template v-if="item.meta && !item.meta.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.meta?.noShowingChildren) &&
        !item.meta?.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path)">
          <i v-if="onlyOneChild.meta?.icon || item.meta?.icon" class="menu-icon">
            <lyf-icon :icon-class="onlyOneChild.meta?.icon || item.meta?.icon"></lyf-icon>
          </i>
          <template #title>
            <item :title="onlyOneChild.meta?.title || item.meta?.title" />
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" deprecated>
      <template #title>
        <i v-if="item.meta && item.meta.icon" class="menu-icon">
          <lyf-icon :icon-class="item.meta.icon"></lyf-icon>
        </i>
        <item v-if="item.meta" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>
<script lang="ts">
export default {
  name: 'SidebarItem'
}
</script>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import path from 'path-browserify'
import Item from './item.vue'
import AppLink from './link.vue'
import LyfIcon from '@/components/lyf-icon/index.vue'

interface Props {
  item: RouteRecordRaw
  basePath: string
}

const props = defineProps<Props>()

const { basePath } = toRefs(props)

let onlyOneChild = ref<RouteRecordRaw>({} as RouteRecordRaw)

/**
 * 是否只有一个显示的子节点
 * @param {RouteRecordRaw[]} children
 * @param {RouteRecordRaw} parent
 * @return {boolean}
 */
const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
  const showingChildren = children.filter(item => {
    if (!item.meta || item.meta.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '' }
    if (!onlyOneChild.value.meta) {
      onlyOneChild.value.meta = {}
    }
    onlyOneChild.value.meta.noShowingChildren = true

    return true
  }

  return false
}
/**
 * 解析Path
 * @param {string} routePath
 * @return {string}
 */
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(basePath.value)) {
    return basePath.value
  }
  return path.resolve(basePath.value, routePath)
}
</script>
<style scoped lang="scss">
.menu-icon {
  font-size: 20px;
  vertical-align: middle;
}
</style>
