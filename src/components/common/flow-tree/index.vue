<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal, collapsable}">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @on-expand="$emit('on-expand', $event)"
        @on-node-click="(e, data) => {$emit('on-node-click', e, data)}"
      ></org-tree-node>
    </div>
  </div>
</template>

<script>
import render from './node'
export default {
  name: 'VOrgTree',
  components: {
    OrgTreeNode: {
      render,
      functional: true
    }
  },
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        expand: 'expand',
        children: 'children'
      })
    },
    horizontal: {
      type: Boolean,
      default: true
    },
    collapsable: {
      type: Boolean,
      default: true
    },
    renderContent: {
      type: Function,
      default: null
    },
    labelWidth: {
      type: [String, Number],
      default: 'auto'
    },
    labelClassName: {
      type: [Function, String],
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
