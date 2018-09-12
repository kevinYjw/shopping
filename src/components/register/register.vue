<template>
  <div class="register">
    <div class="container">
      <h2>请填写你的个人资料</h2>
      <div class="form-group">
        <label for="userName">用户名</label>
        <input type="text" class="form-control" id="userName" placeholder="用户名" v-model="userName">
        <p class="warnning" v-show="userNameWarn">{{userNameWarn}}</p>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" id="password" placeholder="密码" v-model="password">
        <p class="warnning" v-show="passwordWarn">{{passwordWarn}}</p>
      </div>
      <div class="form-group">
        <label for="Name">姓名</label>
        <input type="text" class="form-control" id="Name" placeholder="姓名" v-model="Name">
        <p class="warnning" v-show="NameWarn">{{NameWarn}}</p>
      </div>
      <div class="form-group">
        <label for="postCode">邮政编码</label>
        <input type="text" class="form-control" id="postCode" placeholder="邮政编码" v-model="postCode">
        <p class="warnning" v-show="postCodeWarn">{{postCodeWarn}}</p>
      </div>
      <div class="form-group">
        <label for="tel">电话</label>
        <input type="tel" class="form-control" id="tel" placeholder="电话" v-model="tel">
        <p class="warnning" v-show="telWarn">{{telWarn}}</p>
      </div>
      <div class="form-group">
        <label for="address">配送地址</label>
        <input type="text" class="form-control" id="address" placeholder="配送地址" v-model="address">
        <p class="warnning" v-show="addressWarn">{{addressWarn}}</p>
      </div>
      <div class="btn-wrap">
        <button class="btn" @click="register" 
        :class="{'btn-no':!warnning}"
        >注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data(){
    return {
      userName:'',
      password:'',
      address:'',
      Name:'',
      tel:'',
      postCode:'',
      userNameWarn:'密码必须是3 ~ 13位数字字母',
      passwordWarn:'密码必须是6 ~ 15位数字字母',
      addressWarn:'长度小于30个字符',
      NameWarn:'姓名为3 ~ 8位字符',
      telWarn:'电话长度为11位以下',
      postCodeWarn:'邮编长度为6位'
    }
  },
  computed:{
    warnning(){
      if(this.userNameWarn === '' && this.passwordWarn === '' && this.addressWarn === '' &&
         this.NameWarn === '' && this.telWarn === '' && this.postCodeWarn === ''){
        return true
      } else {
        return false
      }
    }
  },
  methods:{
    register(){
      if(!this.warnning){
        return 
      }
      axios.post('/users/register',{
        userName:this.userName,
        password:this.password,
        Name:this.Name,
        tel:this.tel,
        postCode:this.postCode,
        address:this.address
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          alert("注册成功，请重新登入!")
          this.$router.push({
            'path':'/'
          })
        }
      })
    }
  },
  watch:{
    userName(){
      if(/^[\w]{3,13}$/.test(this.userName)){
        this.userNameWarn = ''
      } else {
        this.userNameWarn = '密码必须是3 ~ 13位数字字母'
      }
    },
    password(){
      if(/^[\w]{6,15}$/.test(this.password)){
        this.passwordWarn = ''
      } else {
        this.passwordWarn = '密码必须是6 ~ 15位数字字母'
      }
    },
    address(){
      if(this.address.length < 30){
        this.addressWarn = ''
      } else {
        this.addressWarn = '长度小于30个字符'
      }
    },
    Name(){
      if(/^[\w]{3,8}$/.test(this.Name)){
        this.NameWarn = ''
      } else {
        this.NameWarn = '姓名为3 ~ 8位字符'
      }
    },
    tel(){
      if(this.tel.length <= 11 && /^[\d]{1,11}$/.test(this.tel)){
        this.telWarn = ''
      } else {
        this.telWarn = '电话长度为11位以下'
      }
    },
    postCode(){
      if(/^[\d]{6}$/.test(this.postCode)){
        this.postCodeWarn = ''
      } else {
        this.postCodeWarn = '邮编长度为6位'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .register
    h2
      padding:30px 0
      font-weight:700
      letter-spacing:2px
    .warnning
      color:#f00
      font-weight:400
      font-size:18px
      padding:5px 2px
    .btn-wrap
      margin-top:20px
      text-align:right
      .btn
        display:inline-block
        min-width:200px
        text-align:center
        background:#d1434a
        color:#fff
        letter-spacing:.25em
        font-weight:700
        height:40px
      .btn-no
        background:#000
        color:#fff
</style>
