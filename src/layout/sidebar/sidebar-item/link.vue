<template>
  <!-- TODO 内置组件component v-bind绑定对象时，component组件失效 -->
  <component :is="linkProps(to).is" :to="linkProps(to).to">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
interface Props {
  to: string
}
const props = defineProps<Props>()

const linkProps = (url: string) => {
  if (isExternal(url)) {
    return {
      is: 'a',
      href: url,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    is: 'router-link',
    to: url
  }
}
</script>
