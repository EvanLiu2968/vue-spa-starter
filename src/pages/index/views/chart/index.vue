<template>
  <div class="dashboard-container">
    <div>
      <el-row :gutter="50" >
        <el-col :span="24" style="margin-bottom: 30px">
          <chart-dangan></chart-dangan>
        </el-col>
        <!-- <el-col :span="24" style="margin-bottom: 30px">
          <chart-chayue></chart-chayue>
        </el-col> -->
      </el-row>
      <el-row :gutter="50" style="margin-bottom: 30px">
        <el-col :span="12">
          <chart-yewu></chart-yewu>
        </el-col>
        <el-col :span="12">
          <chart-kucun></chart-kucun>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ChartDangan from './modules/dangan'
import ChartChayue from './modules/chayue'
import ChartYewu from './modules/yewu'
import ChartKucun from './modules/kucun'

export default {
  components: {
    ChartDangan,
    ChartChayue,
    ChartKucun,
    ChartYewu
  },
  data() {
    return {}
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
