<template>
  <div>
    <div class="table">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="日志分类">
          <el-select v-model="queryForm.logType" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="info" value="info"></el-option>
            <el-option label="warn" value="warn"></el-option>
            <el-option label="error" value="error"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日志时间">
          <el-date-picker v-model="queryForm.logTime" type="daterange" placeholder="选择日期范围"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作用户">
          <el-input v-model="queryForm.user" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="logType" label="日志类型" width="80" >
        </el-table-column>
        <el-table-column prop="logTime" label="日志时间" width="250" >
        </el-table-column>
        <el-table-column prop="user" label="操作用户" width="100">
        </el-table-column>
        <el-table-column prop="logDesc" label="日志描述" min-width="160">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Check from '../../assets/js/validate.js'
  export default {
    data() {
      var validatePwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.form.newPwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        queryForm:{
          logType:'',
          logTime:'',
          user:''
        },
        tableData: [],
        resData:[
          {
            logType:'info',
            logTime:'2017-04-01T20:34:47.323+02:00',
            user:'admin',
            logDesc:'Request userList complated in 0.320 seconds'
          },
          {
            logType:'info',
            logTime:'2017-04-01T20:35:12.323+02:00',
            user:'admin',
            logDesc:'Request URL "/home"'
          }
        ],
        pagination:{
          currentPage:1,
          pageSize:10,
          total:0
        }
      }
    },
    methods: {
      search(){
        let params=this.queryForm;
        let headers={
          "Accept":"application/json;charset=utf-8"
        };
        // this.axios.get('/api/japi/toh?key=e676ca1db545a88c1a22c7da35253776&v=1.0',{params:params,headers:headers}).then( (res) => {
          // this.resData = res.data.result;
          this.pagination.currentPage=1;
          this.pagination.total=this.resData.length;
          this.paginate();
        // });
      },
      paginate(){
        let pageSize=this.pagination.pageSize;
        let currentPage=this.pagination.currentPage;
        this.tableData=this.resData.slice((currentPage-1)*pageSize,currentPage*pageSize);
      },
      handleSizeChange(size){
        this.pagination.pageSize=size;
        this.paginate();
      },
      handleCurrentChange(current){
        this.pagination.currentPage=current;
        this.paginate();
      }
    },
    beforeMount(){
      this.search();
    }
  }
</script>