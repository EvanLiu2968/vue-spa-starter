
<template>
  <component :is="linkProps.is" v-bind="linkProps">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/libs/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    linkProps() {
      const url = this.to
      if (isExternal(url)) {
        console.log(url)
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
  }
}
</script>
