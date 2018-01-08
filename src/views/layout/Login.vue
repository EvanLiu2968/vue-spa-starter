<template>
<div>
  <header class="login-header">
    <div class="">
      <div class="pull-left" style=" overflow:hidden;">
        <h1 class="logo">
          <img src='static/images/logo.png' />
          vue2开源组件库【603开源计划】
        </h1>
      </div>
      <div class="pull-right" style="padding:10px">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" >平台简介</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" >帮助中心</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div class="login-body" id="particlesJS" >
    <div class="login-box">
      <div class="login-title">系统登录</div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 输入用户名和密码即可登录。</p>
      </el-form>
    </div>
  </div>
  <footer class="login-footer" style="background-color: #fff;">
    <p class="text-center">github：<a href="https://github.com/EvanLiu2968" target="_blank">https://github.com/EvanLiu2968</a></p>
    <p class="text-center">gmail：<a href="mailto:evanliu2968@gmail.com" target="_blank">evanliu2968@gmail.com</a></p>
    <p class="text-center">建议使用1366*768分辨率/谷歌浏览器或360浏览器、QQ浏览器等访问达到最佳效果</p>
  </footer>
</div>
</template>

<script>
import particlesJS from 'assets/js/particles.js';
import Home from './Home.vue';
  export default {
    data: function(){
      return {
        loginForm: {
          username: '',
          password: '',
          captcha: ''
        },
        loginFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitLoginForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('updateUserinfo','/');
          } else {
            this.$message.error('请输入正确的用户名和密码!');
            return false;
          }
        });
      }
    },
    beforeMount(){
      //window.location.href="/oauth2/login";//不做登录处理
      // if(this.$route.query.action=='loginout'){
      //   window.location.href=window.location.origin;
      // }
    },
    mounted(){
      //https://github.com/VincentGarreau/particles.js
      particlesJS("particlesJS",{
        "particles": {
          "number": {
            "value": 30,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle", // "circle", "edge" or "triangle"
            "stroke": {
              "width": 0,
              "color": "#fff"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.8,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.3,
              "sync": true
            }
          },
          "size": {
            "value": 6,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": true
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 200,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 2
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    }
  }
</script>

<style scoped>
.logo{
  line-height:60px;
  font-size:24px;
  color:#8492A6;
}
.logo>img{
  float:left;
  height:60px;width:60px;
}
.login-header{
  position:absolute;
  top:0;
  width:100%;
  height:60px;
  background-color:#fff;
  padding:0 50px;
}
.login-footer{
  position:absolute;
  bottom:0;
  width:100%;
  height:100px;
  padding:10px 25px;
}
.login-footer p{
  color:#818a91;
  font-size:14px;
  line-height:20px;
  margin-bottom:8px;
}
.login-body{
  position:absolute;
  top:60px;
  bottom:100px;
  width:100%;
  background-color:#20A0FF;
}
.login-box{
  position: absolute;
  display:inline-block;
  top:50%;
  left:50%;
  margin-left:-180px;
  margin-top:-140px;
  width:360px;
  border-radius:6px;
  background: #fff;
}
.login-box form{
  padding:20px 40px;
}
.login-title{
  padding:15px;
  margin-bottom:15px;
  text-align: center;
  font-size:20px;
  color:#fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color:#E35B5A;
}
.login-btn{
  text-align: center;
}
.login-btn button{
  width:100%;
  height:36px;
}
.nav{

}
.nav .nav-item{
  float:left;
  padding:10px;
}
.nav .nav-link{
  font-size:14px;
  line-height:20px;
  color:rgba(0,0,0,.5);
  cursor:pointer;
}
.nav .nav-link:hover{
  color:rgba(0,0,0,.8);
}
</style>