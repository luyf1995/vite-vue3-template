<template>
  <div class="filter-layout">
    <div class="search-contianer">
      <slot name="search"></slot>
    </div>
    <div class="button-contianer">
      <slot name="button"></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.filter-layout {
  display: flex;
  justify-content: space-between;
  width: 100%;

  :deep(.el-form) {
    .el-form-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .el-select {
      min-width: 140px;
    }
  }
}
</style>
