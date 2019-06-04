<template>
  <div class="chartWrap">
    <h3 class="chartWrap-title">
      档案统计
      <el-button type="text" @click="treeVisible= true">展示全部</el-button>
    </h3>
    <el-row>
      <el-col :span="16">
        <div class="scrollBar" style="height: 300px">
          <flow-tree
            :data="treeData"
            :render-content="renderContent"
            @on-node-click="handleNodeClick"
          ></flow-tree>
        </div>
      </el-col>
      <el-col :span="8"><v-chart :autoresize="true" :options="chartData"/></el-col>
    </el-row>
    <el-dialog :visible.sync="treeVisible" title="档案统计" width="80%">
      <div>
        <flow-tree
          :data="fullTreeData"
          :render-content="renderContent"
        ></flow-tree>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mergeDefaultChartOption } from '@/libs/env'
import { listToArrayTree } from '@/libs/listTransTree'
import ChartProgress from './progress.vue'
import {
  getStaffDepartList
} from '@/api/staff'
import FlowTree from '@/components/common/flow-tree'

import variables from 'THEME_VAR.scss'

export default {
  components: {
    ChartProgress,
    FlowTree
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      theme: THEME,
      treeVisible: false,
      currentData: null,
      fullTreeData: {},
      treeData: {},
      chartData: mergeDefaultChartOption({
        color: [variables.colorPrimary, '#c2c6c7'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}人 ({d}%)'
        },
        legend: {
          // orient: 'horizontal',
          // x: 'left',
          data: []
        },
        series: [
          {
            name: '档案统计',
            type: 'pie',
            // radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}人',
                position: 'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: []
          }
        ]
      })
    }
  },
  mounted() {
    this.initChartData()
  },
  methods: {
    renderContent(h, data) {
      const { currentData } = this
      return (
        <span class={'chart-tree-label' + ((currentData && currentData.id === data.id) ? ' active' : '')}>
          <span style={{ marginBottom: '4px' }}>{data.label}{
            <span>(<span class={data.storageCount < data.staffAdminCount ? 'red' : ''}>{data.storageCount}人</span>/{data.staffAdminCount}人)</span>
          }</span>
          {data.staffAdminCount > 0 && <ChartProgress text-inside={true} stroke-width={12} percentage={parseInt(data.storageCount / data.staffAdminCount * 100)}></ChartProgress>}
        </span>
      )
    },
    handleNodeClick(e, data) {
      // console.log(data)
      this.handleOrgChange(data)
      this.currentData = data
    },
    handleOrgChange(data) {
      const chartData = this.chartData
      chartData.legend.data = ['完成人数', '未完成人数']
      chartData.series[0].data = [
        {
          value: data.storageCount,
          name: '完成人数'
        },
        {
          value: data.unfinishStaffAdminCount,
          name: '未完成人数'
        }
      ]
      chartData.series[0].name = data.label
      this.chartData = chartData
    },
    initChartData() {
      getStaffDepartList().then(res => {
        const list = res.response
        const arr = list.map(item => {
          return {
            id: item.recId,
            recId: item.recId,
            parentId: item.parentId,
            unfinishStaffAdminCount: item.unfinishStaffAdminCount,
            storageCount: item.staffAdminCount - item.unfinishStaffAdminCount,
            staffAdminCount: item.staffAdminCount,
            value: item.recId,
            expand: true,
            label: item.departName
          }
        })
        this.treeData = listToArrayTree(arr, 0, 'recId', 'parentId', 2)
        console.log(this.treeData)
        this.fullTreeData = listToArrayTree(arr, 0, 'recId', 'parentId', 10)
        this.handleNodeClick(null, this.treeData[0])
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "~THEME_VAR.scss";
.chart-tree-label {
  cursor: pointer;
  &.active {
    color: $color-primary;
    // background: $color-primary-light;
  }
  .red {
    color: $fontRed;
  }
  .el-progress-bar__outer {
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: #c2c6c7;
  }
  .el-progress-bar__inner {
    background-color: $color-primary;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
