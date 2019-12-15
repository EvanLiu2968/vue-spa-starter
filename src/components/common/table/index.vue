<template>
  <div class="app-table" :class="{'app-table--hidden-header':hiddenHeader}">
    <div v-if="$slots['header-left'] || $slots['header-right']" class="app-table-tools clearfix">
      <div class="app-table-left">
        <slot name="header-left">
          <template v-if="rowSelect">
            <span v-if="allSelect" style="padding-left: 14px;">
              <el-checkbox v-model="allSelected" @change="handleAllSelection">所有页</el-checkbox>
            </span>
            <span class="app-table-selected">已选<i>{{ multipleSelection.length }}</i>项</span>
          </template>
        </slot>
      </div>
      <div class="app-table-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <el-table
      ref="table"
      :stripe="stripe"
      :data="data"
      :border="border"
      :row-key="rowKey"
      v-bind="otherProps"
      style="width: 100%"
      size="medium"
      :span-method="spanMethod"
      v-on="otherListeners"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="rowSelect" type="selection" :reserve-selection="reserveSelect" width="36" :selectable="selectable"></el-table-column>
      <slot></slot>
      <div slot="empty">暂无数据</div>
    </el-table>
    <div v-if="!hiddenFooter" class="app-table-tools">
      <div class="app-table-left">
        <span class="text-gray" style="margin-right:20px">合计条数：{{ total }}条</span>
        <slot name="footer-left"></slot>
      </div>
      <div class="app-table-right">
        <el-pagination
          v-if="pagination"
          :pager-count="5"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next, sizes, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTable',
  props: {
    tableData: {
      type: Object,
      default() {
        return {}
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    selectable: {
      type: Function,
      default() {
        return function(row, i) { return true }
      }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowSelect: {
      type: Boolean,
      default: true
    },
    reserveSelect: {
      type: Boolean,
      default: true
    },
    selectType: {
      type: String, // 'multiple' or 'single'
      default: 'multiple'
    },
    allSelect: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    hiddenHeader: {
      type: Boolean,
      default: false
    },
    hiddenFooter: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function,
      default() {
        return function() { return true }
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      data: [],
      total: 0,
      shouldClearSelection: true,
      allSelected: false,
      multipleSelection: []
    }
  },
  computed: {
    otherProps() {
      // eslint-disable-next-line no-unused-vars
      const { tableData, total, rowSelect, selectType, allSelect, pagination, stripe, border, ...others } = this.$attrs
      return others
    },
    otherListeners() {
      // eslint-disable-next-line no-unused-vars
      const { pagerChange, selectionChange, ...others } = this.$listeners
      return others
    }
  },
  watch: {
    tableData: {
      handler(val, oldVal) {
        val = val || {}
        // 控制仅在分页时保留勾选
        if (this.shouldClearSelection && this.$refs.table) {
          this.$refs.table.clearSelection()
        }
        this.shouldClearSelection = true

        this.currentPage = val.current || 1
        this.pageSize = val.size || 10
        this.data = val.records || []
        this.total = val.total || this.data.length
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    handleAllSelection(val) {
      if (val) {
        this.tableData.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    handleSelectionChange(selection, current, checked) {
      // 目前该事件没有返回current 和 checked, 无法做单选功能
      // if (this.selectType === 'single' && this.checked) {
      //   this.$refs.table.clearSelection()
      //   this.$refs.table.toggleRowSelection(current, true)
      // }
      this.multipleSelection = selection
      this.$emit('selectionChange', selection)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handlePagerChange()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handlePagerChange()
    },
    handlePagerChange() {
      const { currentPage, pageSize } = this
      this.shouldClearSelection = false
      this.$emit('pagerChange', {
        page: currentPage,
        size: pageSize
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "~THEME_VAR.scss";
$color-primary: $color-primary-secondary;
.app-table {
  position: relative;
  margin-bottom: 20px;
  &-tools {
    position: relative;
    padding: 10px 0;
    font-size: 12px;
  }
  &-selected {
    margin-left: 15px;
    &>i {
      margin: 0 2px;
      color: #ff5d5b;
      font-weight: bold;
      font-style: normal;
    }
  }
  &-left {
    display: inline-block;
    line-height: 28px;
  }
  &-right {
    float: right;
  }
  &.app-table--hidden-header {
    .el-table__header-wrapper {
      display: none;
    }
  }
  .el-table {
    border-radius: 4px;
    // thead th {
    //   border-top: 1px solid #EBEEF5;
    // }
    // &.el-table--border {
    //   thead th {
    //     border-top: none;
    //   }
    // }
    // fix： 复选框出现省略号
    .el-table-column--selection .cell {
      // overflow: hidden;
      text-overflow: clip;
      // white-space: normal;
      // word-break: break-all;
    }
  }
  .el-table thead th {
    font-weight: normal;
    background: #fafafa;
    color: $color-text-primary;
    // border-top: 1px solid #ebeef5;
  }
  .el-table td {
    color: $color-text-secondary;
  }
  .el-table__row.expanded.hover-row + tr{
    & > td {
      background: #F5F7FA !important;
    }
  }
  .el-pagination {
    font-weight: normal;
    line-height: 28px;
    .btn-prev, .btn-next {
      padding: 0 6px;
      & > span {
        height: auto;
        line-height: 28px;
      }
    }
    .btn-prev {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border: 1px solid #e3e3e3;
    }
    .btn-next {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border: 1px solid #e3e3e3;
    }
  }
  .el-pager {
    li {
      line-height: 28px;
      border-top: 1px solid #e3e3e3;
      border-right: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      &:last-child {
        border-right: none;
      }
      &.active {
        color: #fff;
        border-color: $color-primary;
        background: $color-primary;
      }
    }
  }
  .el-pagination__sizes, .el-pagination__jump {
    margin-top: -2px;
  }
  .el-pagination__jump {
    margin-left: 0;
  }
}
</style>
