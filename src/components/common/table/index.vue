<template>
  <div class="app-table">
    <div class="app-table-tools clearfix">
      <div v-if="rowSelect" class="app-table-left">
        <slot name="header-left">
          <span v-if="allSelect" style="padding-left: 14px;">
            <el-checkbox v-model="allSelected" @change="handleAllSelection">所有页</el-checkbox>
          </span>
          <span class="app-table-selected">已选<i>{{ multipleSelection.length }}</i>项</span>
        </slot>
      </div>
      <div class="app-table-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <el-table
      ref="table"
      :stripe="true"
      :data="data"
      v-bind="otherProps"
      v-on="otherListeners"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="rowSelect" type="selection" width="55" :selectable="selectable"></el-table-column>
      <slot></slot>
      <div slot="empty">暂无数据</div>
    </el-table>
    <div class="app-table-tools">
      <div class="app-table-left">
        <span class="text-gray" style="margin-right:20px">合计条数：{{ total }}条</span>
        <slot name="footer-left"></slot>
      </div>
      <div class="app-table-right">
        <el-pagination
          v-if="pagination"
          :pager-count="5"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, sizes, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
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
    selectable: {
      type: Function,
      default() {
        return function() { return true }
      }
    },
    rowSelect: {
      type: Boolean,
      default: true
    },
    selectType: {
      type: String,
      default: 'multiple'
    },
    allSelect: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      data: [],
      total: 0,
      allSelected: false,
      multipleSelection: []
    }
  },
  computed: {
    otherProps() {
      // eslint-disable-next-line no-unused-vars
      const { tableData, total, rowSelect, selectType, allSelect, pagination, ...others } = this.$attrs
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
        this.currentPage = val.current || 1
        this.pageSize = val.size || 10
        this.data = val.records || []
        this.total = val.total || 0
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
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('selectionChange', val)
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
  .el-table thead th {
    color: #333;
    font-weight: bold;
    background: #e6e7eb;
    // border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
  }
  .el-pagination {
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
      border-top: 1px solid #e3e3e3;
      border-right: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      &:last-child {
        border-right: none;
      }
      &.active{
        color: #fff;
        border-color: $color-primary;
        background: $color-primary;
      }
    }
  }
  .el-pagination__jump {
    margin-left: 0;
  }
}
</style>
