<template>
  <div class="chartWrap">
    <h3 class="chartWrap-title">查阅统计</h3>
    <v-chart :autoresize="true" :options="histogramData"/>
  </div>
</template>

<script>
import { mergeDefaultChartOption } from '@/libs/env'

export default {
  data() {
    return {
      histogramData: mergeDefaultChartOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['查阅申请', '审批申请', '授权申请', '在线查阅']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '查阅申请',
            type: 'bar',
            data: [23, 25, 76, 135]
          },
          {
            name: '审批申请',
            type: 'bar',
            data: [24, 53, 97, 105]
          },
          {
            name: '授权申请',
            type: 'bar',
            data: [9, 20, 43, 54]
          },
          {
            name: '在线查阅',
            type: 'bar',
            data: [53, 36, 74, 86]
          }
        ]
      })
    }
  },
  mounted() {
    //
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
