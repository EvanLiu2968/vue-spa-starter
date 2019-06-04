<template>
  <el-dropdown ref="dropdown" class="el-select" :class="[selectSize ? 'el-select--' + selectSize : '']" trigger="click" placement="bottom-start" @visible-change="toggleMenu">
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      placeholder="请选择"
      :readonly="true"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false">
      <template slot="suffix" >
        <i v-if="!selectedLabel" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-else :class="['el-select__caret', 'el-input__icon', 'el-icon-circle-close']" @click="handleClearClick"></i>
      </template>
    </el-input>
    <el-dropdown-menu slot="dropdown" :style="{minWidth:inputWidth+'px'}">
      <el-scrollbar
        wrap-class="el-select-dropdown__wrap"
        view-class="el-select-dropdown__list"
        ref="scrollbar">
        <el-tree
          ref="tree"
          :data="tree.data"
          :node-key="tree.key"
          :expand-on-click-node="true"
          default-expand-all
          v-show="!loading"
          @node-click="(data, node) => handleSelect(data, node)">
          <template slot-scope="{ node, data }">
            <slot :node="node" :data="data"></slot>
          </template>
        </el-tree>
        <template v-if="loading && emptyText">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-scrollbar>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import DropdownMenu from './src/dropdown-menu.vue'

export default {
  directives: { Clickoutside },
  components: {
    DropdownMenu
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number],
    defaultLabel: {
      type: String,
      default: ''
    },
    tree: {
      type: Object,
      default() {
        return {
          key: 'recId',
          data: []
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      selectedNode: null,
      selectedData: null,
      inputWidth: 0,
      visible: false
    }
  },
  computed: {
    selectSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    iconClass() {
      return this.visible ? 'arrow-up is-reverse' : 'arrow-up'
    },
    selectedLabel() {
      return this.selectedData ? this.selectedData.departName : this.defaultLabel
    },
    emptyText() {
      if (this.loading) {
        return '加载中'
      }
      return '没有数据'
    }
  },
  watch: {
    defaultLabel(val, oldVal) {
      this.query = val
    }
  },
  mounted() {
    this.resetClientRect()
  },
  methods: {
    resetClientRect() {
      const reference = this.$refs.reference
      this.$nextTick(() => {
        if (reference && reference.$el) {
          this.inputWidth = reference.$el.getBoundingClientRect().width
        }
      })
    },
    handleSelect(data, node) {
      if (data.parentId !== 0) {
        this.selectedNode = node
        this.selectedData = data
        this.$emit('input', data.recId)
        this.$refs.dropdown.visible = false
      }
    },
    toggleMenu() {
      this.visible = !this.visible
      if (this.visible) {
        (this.$refs.input || this.$refs.reference).focus()
      }
    },
    handleBlur() {
      this.visible = false
      this.$refs.reference.blur()
      setTimeout(() => {
        this.$emit('blur', event)
      }, 50)
    },

    handleClearClick(event) {
      this.selectedNode = null
      this.selectedData = null
      this.$emit('input', undefined)
    },

    handleClose() {
      this.visible = false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
.active {
  color: $color-primary;
}
</style>
