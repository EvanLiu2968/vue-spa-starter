<template>
  <div class="header">
    <span class="btn-collapse" @click="toggleSidebarCollapse"><i class="el-icon-custom-liebiao2"></i></span>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="user-logo" :src="userInfo.avatar">
          {{userInfo.nickname}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="message">我的消息</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed:{
      userInfo(){
        return this.$store.getters.getUserInfo;
      }
    },
    methods:{
      handleCommand(command) {
        if(command == 'logout'){
          this.$store.commit('logout');
        }
      },
      toggleSidebarCollapse(){
        this.$store.commit('toggleCollapse');
      }
    }
  }
</script>
<style lang="less" scoped>
  .header {
    position: relative;
    height: 50px;
    font-size: 22px;
    line-height: 50px;
  }
  .btn-collapse{
    float:left;
    margin-right:20px;
    line-height:50px;
    cursor:pointer;
  }
  .user-info {
    float: right;
    font-size: 16px;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    // color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:5px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
