<template>
  <div class="ninecell-wrap" ref="chart" :class="`legend-align-${legendAlign}`">
    <div class="coord-wrap coord-xAxis" :style="{width: 3*chartOptions.coord.x+30+'px', paddingLeft: '10px'}">
      <div v-for="(item, i) in chartOptions.xAxis.data" :key="i" class="coord-column" :style="{width: chartOptions.coord.x+'px'}">
        <span>{{ item }}</span>
      </div>
      <div class="coord-xAxis-name">
        <span>{{ chartOptions.xAxis.name }}</span>
      </div>
    </div>
    <div class="coord-wrap coord-yAxis" :style="{height: 3*chartOptions.coord.y+20+'px'}">
      <div v-for="(item, i) in chartOptions.yAxis.data" :key="i" class="coord-column" :style="{height: chartOptions.coord.y+'px', bottom: i*chartOptions.coord.y+10+'px'}">
        <span :style="{height: chartOptions.coord.y+'px'}">{{ item }}</span>
      </div>
      <div class="coord-yAxis-name">
        <span>{{ chartOptions.yAxis.name }}</span>
      </div>
    </div>
    <!-- 九宫格 -->
    <el-row :gutter="2" class="ninecell">
      <el-col :span="8" v-for="(item, i) in chartOptions.data" :key="i" class="cell">
        <div class="cell-content" :style="{height: cellHeight+'px'}">
          <slot :data="item"></slot>
          <!-- <span><slot :data="item"></slot></span> -->
        </div>
      </el-col>
    </el-row>
    <!-- 图例 -->
    <div class="legend-wrap" :class="`legend-align-${legendAlign}`">
      <div v-for="(item, i) in chartOptions.legend.data" :key="i" class="legend-item">
        <span class="legend-mark" :style="{backgroundColor: chartOptions.color[i]}"></span>
        <span class="legend-text">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'

function getDefaultData() {
  return new Array(9).fill({})
}

export default {
  name: 'ChartNinecell',
  props: {
    cellHeight: {
      type: Number,
      default: 100
    },
    legendAlign: {
      type: String,
      default: 'right'
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      chartOptions: {
        color: ['#4767D6', '#6684EC', '#83C7FF', '#C5E0FA', '#D6D6D6'],
        legend: {
          data: ['明星+', '明星', '金牛', '蚌珠', '瘦狗']
        },
        coord: {
          x: 0,
          y: 0
        },
        xAxis: {
          name: '潜力',
          data: ['待发展', '成熟', '优势']
        },
        yAxis: {
          name: '绩效',
          data: ['待提升', '达标', '优秀']
        },
        data: getDefaultData()
      }
    }
  },
  watch: {
    options: {
      handler(val) {
        if (!val) return
        if (val.data && val.data.length !== 9) {
          console.warn('chart-ninecell需要设置9个数据')
          return
        }
        const chartOptions = Object.assign({}, this.chartOptions, this.options)
        // console.log(chartOptions)
        this.chartOptions = chartOptions
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      const $cell = this.$refs.chart.getElementsByClassName('cell')[0]
      const { offsetWidth, offsetHeight } = $cell
      this.chartOptions.coord.x = offsetWidth
      this.chartOptions.coord.y = offsetHeight + 3
    }, 100, { leading: true })
    addListener(this.$refs.chart, this.__resizeHandler)
    this.__resizeHandler()
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.__resizeHandler)
  },
  methods: {
    // 从上到下从左到右依次为 0-9 （按正常DOM顺序排列）
    setData(i = 0, data = {}) {
      // this.chartOptions.data[i] = data
      this.$set(this.chartOptions.data, i, data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~THEME_VAR.scss";
.ninecell-wrap {
  position: relative;
  padding: 32px;
  &.legend-align-right {
    padding-right: 80px;
  }
  &.legend-align-bottom {
    padding-bottom: 80px;
    .coord-xAxis {
      margin-bottom: 48px;
    }
    .coord-yAxis {
      margin-bottom: 72px;
    }
  }
}
.coord-xAxis, .coord-yAxis {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: #a6a6a6;
}
.coord-xAxis {
  height: 25px;
  margin-left: 24px;
  border-top: 1px solid #a6a6a6;
  .coord-column {
    &>span{
      line-height: 20px;
    }
  }
  .coord-xAxis-name {
    position: absolute;
    width: 16px;
    bottom: 12px;
    right: -20px;
  }
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 22px;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-top: 1px solid #a6a6a6;
    border-right: 1px solid #a6a6a6;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    // background: #a6a6a6;
  }
}
.coord-yAxis {
  width: 24px;
  text-align: left;
  margin-bottom: 25px;
  border-right: 1px solid #a6a6a6;
  .coord-column {
    position: absolute;
    &>span{
      vertical-align:middle;
      display:table-cell;
    }
  }
  .coord-yAxis-name {
    position: absolute;
    width: 32px;
    top: -20px;
    left: 10px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-top: 1px solid #a6a6a6;
    border-right: 1px solid #a6a6a6;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    // background: #a6a6a6;
  }
}
.coord-column {
  display: inline-block;
  text-align: center;
  white-space: pre-wrap;
}
.legend-wrap {
  position: absolute;
  font-size: 12px;
  color: #a6a6a6;
  .legend-item {
    margin-bottom: 10px;
    text-align: center;
  }
  .legend-mark {
    width: 20px;
    height: 10px;
    margin-bottom: 4px;
  }
  .legend-text {
    display: block;
    text-align: center;
  }
  &.legend-align-right {
    top: 0;
    right: 0;
    .legend-mark {
      margin-left: 4px;
    }
  }
  &.legend-align-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    .legend-item {
      display: inline-block;
      padding: 0 6px;
    }
  }
}
.ninecell {
  position: relative;
  // 一梯队
  .cell:nth-child(3) .cell-content {
    background: #4767D6;
  }
  // 二梯队
  .cell:nth-child(2) .cell-content, .cell:nth-child(6) .cell-content{
    background: #6684EC;
  }
  // 三梯队
  .cell:nth-child(1) .cell-content, .cell:nth-child(4) .cell-content, .cell:nth-child(5) .cell-content{
    background: #83C7FF;
  }
  // 四梯队
  .cell:nth-child(8) .cell-content, .cell:nth-child(9) .cell-content{
    background: #C5E0FA;
  }
  // 五梯队
  .cell:nth-child(7) .cell-content{
    background: #D6D6D6;
  }
  .cell {
    margin-bottom: 2px;
  }
  .cell-content {
    width: 1000px;
    text-align: center;
    color: #fff;
    vertical-align:middle;
    display:table-cell;
  }
}

</style>

