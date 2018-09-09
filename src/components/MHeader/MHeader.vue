<template>
  <div class="header">
    <div class="container">
      <div class="navbar">
        <div class="navbar-left pull-left">简易商城</div>
        <div class="navbar-right pull-right">
        <div class="menu">
          <div class="menu-item menu-name" v-show="nickName">欢迎你 {{nickName}}</div>
          <div class="menu-item menu-enter" @click="enter" v-show="!nickName">登入</div>
          <div class="menu-item" v-show="nickName" @click="logOut">退出</div>
          <div class="menu-item menu-shoppong-cart" @click="enterCart" v-show="nickName">
            <span class="iconfont">&#xe607;</span>
          </div>
        </div>
        </div>
      </div>
      <transition name="login">
        <div class="md-enter" v-show="loginModalFlag">
          <div class="md-enter-inner">
            <div class="top">
              <div class="title">登入</div>
              <button class="close" @click="close"><span class="iconfont">&#xe659;</span></button>
            </div>
            <div class="content">
              <div class="error-info">
                <span class="error" v-show="errorTip">{{errorText}}</span>
              </div>
              <div class="userinfo">
                <ul>
                  <li>
                    <span class="iconfont">&#xe62e;</span>
                    <input type="text" name="username" placeholder="用户名" autocomplete="off" v-model="userName" @keyup.enter="login">
                  </li>
                  <li>
                    <span class="iconfont">&#xe61a;</span>
                    <input type="text" name="password" placeholder="密码" autocomplete="off" v-model="userPassword" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login">
                <button class="login-btn" @click="login">登入</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="overlay" v-show="loginModalFlag"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MHeader',
  data(){
    return {
      loginModalFlag:false, //登入框显示隐藏
      errorTip:false,  //提示信息显示隐藏
      errorText:'用户名或密码错误',
      userName:'',
      userPassword:'',
      nickName: ''
    }
  },
  methods:{
    enter(){ //登入框显示
      this.loginModalFlag = true
    },
    close(){ //登入框隐藏
      this.loginModalFlag = false
      this.errorTip = false
    },
    login(){ //登入
      if(this.userName === '' || this.userPassword === ''){
        this.errorTip = true
        this.errorText = '用户名或密码不能为空'
        return
      }
      axios.post("/users/login",{
        userName:this.userName,
        password:this.userPassword
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          this.errorTip = false
          this.loginModalFlag = false
          this.nickName = res.result.userName
        }else{
          this.errorText = '用户名或密码错误'
          this.errorTip = true
        }
      })
    },
    logOut(){ //退出登入
      axios.post("/users/logout").then((res) => {
        res = res.data
        if(res.status === '0'){
          this.nickName = ''
        }
      })
    },
    checkLogin(){
      axios.get("/users/checkLogin").then((res) => {
        res = res.data
        if(res.status === '0'){
          this.nickName = res.result
        }
      })
    },
    enterCart(){
      this.$router.push({
        path: '/cart'
      })
    }
  },
  mounted(){
    this.checkLogin()
  }
}
</script>

<style scoped lang="stylus">
  .header
    width:100%
    height:70px
    background:#fff
    font-size:16px
    font-family:moderat,sans-serif
    .navbar
      width:100%
      height:70px
      max-width:1280px
      margin:0 auto
      .navbar-left
        line-height:70px
        font-size:3rem
        color:#eb6100
        letter-spacing:3px
        font-weight:600
        cursor:pointer
      .navbar-right
        height:70px
        display:flex
        align-items:center
        .menu
          .menu-item
            display:inline-block
            padding-left:5px
            font-size:18px
            letter-spacing:2px
            cursor:pointer
            font-weight:500
          .menu-name
            font-size:14px
            font-weight:600
          .menu-shoppong-cart
            span
              font-size:25px
    .md-enter
      position:fixed
      left:50%
      top:50%
      transform:translate(-50%,-50%)
      width:535px
      height:auto
      z-index:10
      background:#fff
      .md-enter-inner
        padding:60px 50px
        .top
          .title
            position:absolute
            top:14px
            line-height:24px
            padding:8px 0
            color:#333
            font-size:18px
            font-weight:400
          .close
            position:absolute
            top:4px
            right:4px
            width:34px
            height:34px
            span
              font-size:24px
        .content
          .error-info
            display:block
            font-size:12px
            color:#d31723
            padding:0 0 7px 2px
            line-height:16px
            text-align:left
          .userinfo
            min-width:5.5em
            li
              position:relative
              height:42px
              line-height:42px
              background:none
              margin-bottom:15px
              font-size:14px
              overflow:hidden
              border:1px solid #ccc
              span
                display:inline-block
                width:10px
                height:29px
                margin:0 8px
              input
                width:270px
                font-size:14px
                background:none
                border:none
          .login
            margin-top:30px
            .login-btn
              width:100%
              height:38px
              line-height:38px
              background:#009de6
              color:#fff
              font-size:18px
              text-align:center
              &:hover
                background:#61b1ef
      &.login-enter-active,&.login-leave-active
        transition:all 0.3s
      &.login-enter,&.login-leave-to
        transform:translate3d(100%,0,0)
    .overlay
      position:fixed
      top:0
      left:0
      width:100%
      height:100%
      background:rgba(0,0,0,0.5)
      z-index:8      
</style>
