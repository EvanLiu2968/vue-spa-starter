<template>
  <div>
    <el-tree
      ref="tree"
      :data="treeData"
      :expand-on-click-node="true"
      v-show="!loading"
      show-checkbox
      default-expand-all
      @check-change="handleCheckChange"
      node-key="recId">
      <span slot-scope="{ node, data }" :class="{ active: selectedData && selectedData.recId === data.recId }">
        <span>{{ data.permissionName }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'

import { listToArrayTree } from '@/libs/listTransTree'
import { getAdminPermissionList } from '@/api/admin'

export default {
  directives: { Clickoutside },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array,
      default() {
        return []
      }
    },
    defaultLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      treeData: [],
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
    value(val, oldVal) {
      this.setChecks(val)
    }
  },
  mounted() {
    this.resetClientRect()
    getAdminPermissionList().then(res => {
      const list = res.response.map(r => {
        r.id = r.recId
        return r
      })
      this.treeData = listToArrayTree(list, 0)
      this.setChecks(this.value)
    })
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.$emit('input', checkedKeys)
    },
    setChecks(val) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(val)
      })
    },
    resetClientRect() {
      const reference = this.$refs.reference
      this.$nextTick(() => {
        if (reference && reference.$el) {
          this.inputWidth = reference.$el.getBoundingClientRect().width
        }
      })
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
      // 清除X
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
