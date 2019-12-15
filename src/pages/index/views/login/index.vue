<template>
  <div class="login-container">
    <div class="login-bg"></div>
    <h1 class="title">
      <img src="/images/logo-text.png">
      <!-- 后台管理系统 -->
    </h1>
    <div class="login-form-wrap">
      <div class="login-form-bg"></div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item prop="adminAccount">
          <span class="svg-container">
            <i class="el-icon-sys-user" />
          </span>
          <el-input v-model="loginForm.adminAccount" name="username" type="text" auto-complete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="adminPwd">
          <span class="svg-container">
            <i class="el-icon-sys-icon-lock" />
          </span>
          <el-input
            v-model="loginForm.adminPwd"
            :type="pwdType"
            auto-complete="on"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i :class="pwdType === 'password' ? 'el-icon-sys-eye1' : 'el-icon-sys-eye'" />
          </span>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="copyright">© 2014 - {{ new Date().getFullYear() }} EvanLiu2968. All Rights Reserved.</p>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        adminAccount: '',
        adminPwd: ''
      },
      loginRules: {
        adminAccount: [{ required: true, message: '请输入帐号' }],
        adminPwd: [{ required: true, message: '请输入密码' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "~THEME_VAR.scss";
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 100%;
    input {
      background: transparent;
      border: 1px solid #d8d8d8;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 34px;
      color: #666;
      height: 40px;
    }
  }
  .el-button {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  .svg-container {
    position: absolute;
    left: 0;
    padding: 6px 5px 6px 15px;
    color: #666;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    user-select: none;
  }
  .el-form-item {
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~THEME_VAR.scss";
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #e0e2ea;
  .login-bg {
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -960px;
    width: 1920px;
    height: 60%;
    z-index: -10;
    zoom: 1;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
  @media only screen and (min-width: 1920px) {
    .login-bg {
      left: 0;
      margin-left: 0;
      width: 100%;
    }
  }
  .title {
    position: absolute;
    top: 20%;
    width: 100%;
    font-size: 36px;
    color: $color-primary;
    font-weight: bold;
    img {
      display: block;
      margin: 0 auto;
      height: 40px;
      width: auto;
    }
  }
  .login-form-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 12px;
    border-radius: 4px;
    width: 500px;
    margin: -100px auto 50px -250px;
    overflow: hidden;
    box-shadow: 0 4px 10px 8px rgba(0, 0, 0, 0.1), 0 0 10px 4px rgba(0, 0, 0, 0.1);
    .login-form-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.3);
    }
    .login-form-logo {
      position: absolute;
      top: 0;
      left: 0;
      width: 110px;
      height: auto;
    }
    .login-form {
      padding: 34px 88px;
      background: #fff;
      box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05), 0 0 4px 4px rgba(0, 0, 0, 0.05);
    }
  }
  .copyright {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: 40px;
    text-align: center;
    color: #999;
  }
}
.app-list {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: 200px;
  margin-bottom: 10px;
  text-align: center;
  .app-item {
    display: inline-block;
    width: 90px;
    color: #888;
    i {
      color: #fff;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 30px;
      line-height: 50px;
      background: #ccc;
    }
    p {
      font-size: 14px;
      line-height: 32px;
    }
    &:hover {
      color: $fontBlue;
      i {
        color: $fontBlue;
        background: $color-primary-light;
      }
    }
  }
}
</style>
