<template>
  <el-table ref="elTableRef" :data="tableData" border v-bind="$attrs">
    <table-item
      v-for="(item, index) in columns"
      :key="index"
      :item="item"
      @filter-change="data => handleKeywordsFilterChange(data.value, data.prop)"
    ></table-item>
  </el-table>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

import TableItem from './table-item.vue'
import { ElTable } from 'element-plus'

interface IProps {
  data: any[]
  columns: any[]
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => [],
  columns: () => []
})
const filterMap = ref<any>({})

const elTableRef = ref<InstanceType<typeof ElTable>>()

// 根据关键字过滤
const tableData = computed(() => {
  return props.data.filter((item: any) => {
    return Object.keys(filterMap.value).every(key => {
      return String(item[key]).indexOf(filterMap.value[key]) > -1
    })
  })
})

/**
 * 搜索回调
 * @param {string} keywords 搜索关键字
 * @param {string} prop 表格列
 */
const handleKeywordsFilterChange = (keywords: string, prop: string) => {
  if (keywords === '' || keywords === undefined || keywords === null) {
    delete filterMap.value[prop]
  } else {
    filterMap.value[prop] = keywords
  }
}

defineExpose({
  elTableRef
})
</script>
<style scoped lang="scss"></style>
