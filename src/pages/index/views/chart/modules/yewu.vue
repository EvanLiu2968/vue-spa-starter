<template>
  <div class="chartWrap">
    <div class="chartWrap-title-tools">
      <el-select v-model="query.type" placeholder="请选择" style="width:100px" @change="fetchData">
        <el-option label="档案业务" value="1"></el-option>
        <el-option label="材料业务" value="2"></el-option>
      </el-select>
      <span
        v-for="(item, i) in recentOptions"
        :key="i"
        :class="{active: recentValue === item.value}"
        class="date-option"
        @click="handleRecentChange(item.value)">{{ item.name }}</span>
      <el-date-picker
        v-model="query.dateRange"
        :picker-options="PickerOptions"
        type="daterange"
        start-placeholder="开始"
        end-placeholder="结束"
        value-format="yyyy-MM-dd"
        @change="handleRangeChange"
        style="width:200px" />
    </div>
    <h3 class="chartWrap-title">业务统计</h3>
    <v-chart :autoresize="true" :options="chartData"/>
  </div>
</template>

<script>
import { mergeDefaultChartOption } from '@/libs/env'
import { getArchBusinessData } from '@/api/chart'
import { parseClone } from '@/libs/tool'

const defaultChartData = mergeDefaultChartOption({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: []
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '数量',
      min: 0,
      max: function(value) {
        console.log(value)
        return value.max + 10
      },
      minInterval: 1,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: []
})

export default {
  data() {
    const now = new Date()
    return {
      query: {
        type: '1',
        dateRange: [],
        startDate: '',
        endDate: ''
      },
      recentValue: 0,
      recentOptions: [
        {
          value: 7,
          name: '近7天'
        },
        {
          value: 30,
          name: '近30天'
        },
        {
          value: 365,
          name: '近1年'
        }
      ],
      chartData: {},
      PickerOptions: {
        disabledDate(date) {
          if (date <= now) {
            return false
          }
          return true
        }
      }
    }
  },
  mounted() {
    this.handleRecentChange(180)
  },
  methods: {
    handleRecentChange(val) {
      const now = new Date()
      this.query.endDate = now.format('yyyy-MM-dd')
      this.query.startDate = new Date(now - val * 1000 * 60 * 60 * 24).format('yyyy-MM-dd')
      this.recentValue = val
      this.query.dateRange = [this.query.startDate, this.query.endDate]
      this.fetchData()
    },
    handleRangeChange(val) {
      this.recentValue = 0
      if (val && val.length) {
        this.query.startDate = val[0]
        this.query.endDate = val[1]
        this.fetchData()
      }
    },
    fetchData() {
      const { type, startDate, endDate } = this.query
      getArchBusinessData({
        type,
        startDate,
        endDate
      }).then(res => {
        const data = parseClone(defaultChartData)
        if (type == '1') {
          data.legend.data = ['档案接收', '档案入库', '档案转递']
          data.series = [
            {
              name: '档案接收',
              type: 'bar',
              data: []
            },
            {
              name: '档案入库',
              type: 'bar',
              data: []
            },
            {
              name: '档案转递',
              type: 'bar',
              data: []
            }
          ]
          res.response.list.forEach(item => {
            data.xAxis[0].data.push(new Date(item.statisticsTime).format('yyyy-MM-dd'))
            data.series[0].data.push(item.fileReceive)
            data.series[1].data.push(item.fileStorage)
            data.series[2].data.push(item.fileTransfer)
          })
        } else {
          data.legend.data = ['档案接收', '档案入库', '档案转递']
          data.series = [
            {
              name: '材料接收',
              type: 'bar',
              data: []
            },
            {
              name: '材料转出',
              type: 'bar',
              data: []
            }
          ]
          res.response.list.forEach(item => {
            data.xAxis[0].data.push(new Date(item.statisticsTime).format('yyyy-MM-dd'))
            data.series[0].data.push(item.materialTransfer)
            data.series[1].data.push(item.materialOut)
          })
        }
        this.chartData = data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
.date-option {
  display: inline-block;
  padding: 0 4px;
  font-size: 12px;
  cursor: pointer;
  &.active, &:hover {
    color: $color-primary;
  }
}
</style>
