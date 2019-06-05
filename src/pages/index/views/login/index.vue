<template>
  <div class="login-container">
    <div :style="{ backgroundImage: `url(${themeOptions.bg})`}" class="login-bg"></div>
    <h1 :class="theme" class="title"><img :src="themeOptions.logo">后台管理系统</h1>
    <div class="login-form-wrap">
      <div class="login-form-bg"></div>
      <!-- <img :src="themeOptions.login" class="login-form-logo" > -->
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
            :type="pwdType"
            v-model="loginForm.adminPwd"
            auto-complete="on"
            placeholder="密码"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <i :class="pwdType === 'password' ? 'el-icon-sys-eye1' : 'el-icon-sys-eye'" />
          </span>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-list">
      <a class="app-item" href="/submitBrowse">
        <i class="el-icon-sys-shenqing"></i>
        <p>申请查、借阅</p>
      </a>
      <a class="app-item" href="/browse">
        <i class="el-icon-sys-chayueyuanjuan"></i>
        <p>查阅档案</p>
      </a>
      <a class="app-item" href="/submitMaterial">
        <i class="el-icon-sys-danganguanli"></i>
        <p>上报材料</p>
      </a>
    </div>
    <!-- <p v-if="theme !== 'SouthTalent'" class="copyright">©2003 - 2019 TaleBase. All Rights Reserved. 倍智版权所有</p> -->
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      // eslint-disable-next-line no-undef
      theme: THEME,
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
  computed: {
    themeOptions() {
      return {
        login: `/static/images/${this.theme}/login.png`,
        logo: `/static/images/${this.theme}/logo.png`,
        bg: `/static/images/${this.theme}/bg.jpg`
      }
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
  background-color: #fff;
  .login-bg {
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -960px;
    width: 1920px;
    height: 60%;
    z-index: -10;
    zoom: 1;
    background-color: #fff;
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
    display: inline-block;
    padding-left: 60px;
    font-size: 38px;
    color: #4667d5;
    left: 50%;
    margin-left: -200px;
    font-weight: bold;
    img {
      position: absolute;
      top: -6px;
      left: 0;
    }
    &.SouthTalent {
      color: #333;
      top: 16%;
      padding-left: 100px;
      .subtitle {
        margin-bottom: 8px;
        font-size: 24px;
        font-weight: normal;
      }
      img {
        top: -4px;
      }
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
    top: 50%;
    width: 100%;
    margin-top: 300px;
    margin-bottom: 10px;
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
