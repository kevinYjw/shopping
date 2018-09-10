<template>
  <div class="addAddress">
    <div class="container">
      <h2>请填写你的个人资料</h2>
      <div class="form-group">
        <label for="userName">姓名</label>
        <input type="text" class="form-control" id="userName" placeholder="姓名" v-model="userName">
      </div>
      <div class="form-group">
        <label for="address">地址</label>
        <input type="text" class="form-control" id="address" placeholder="地址" v-model="streetName">
      </div>
      <div class="form-group">
        <label for="postCode">邮政编码</label>
        <input type="text" class="form-control" id="postCode" placeholder="邮政编码" v-model="postCode">
      </div>
      <div class="form-group">
        <label for="tel">电话</label>
        <input type="tel" class="form-control" id="tel" placeholder="电话" v-model="tel">
      </div>
      <div class="btn-wrap">
        <button class="btn" @click="addAddress">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addAddress',
  data(){
    return {
      userName: '',
      streetName: '',
      postCode: '',
      tel: ''
    }
  },
  methods:{
    addAddress(){
      if(this.userName === '' || this.streetName === '' || this.postalCode === '' || this.tel === ''){
        alert("请填写完整的个人信息")
        return
      }
      axios.post("/users/addAddress",{
        addressId:this.addressId,
        userName:this.userName,
        streetName:this.streetName,
        postCode:this.postCode,
        tel:this.tel,
      }).then((res) => {
        res = res.data
        if(res.status === '10001'){
          this.$router.push({
            path: '/'
          })
        }
        if(res.status === '0'){
          this.$router.push({
            path: '/address'
          })
        }
      })
    },
  },
  watch:{
    userName(){
      if(this.userName.length >= 7){
        this.userName = this.userName.slice(0,6)
      } 
    },
    postCode(){
      if(this.postCode.length > 6){
        this.postCode = this.postCode.slice(0,6)
      }
    },
    tel(){
      if(this.tel.length > 11){
        this.tel = this.tel.slice(0,11)
      }
    },
  },
  computed:{
    addressId(){
      let sum = []
      for(let i=0; i<6; i++){
        sum.push(Math.floor(Math.random() * 10))
      }
      return sum.join('')
    }
  }
}
</script>

<style scoped lang="stylus">
  .addAddress
    h2
      padding:30px 0
      font-weight:700
      letter-spacing:2px
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
</style>
