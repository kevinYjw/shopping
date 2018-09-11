<template>
  <div class="address">
    <div class="container">
      <check-nav :cur="1"></check-nav>
      <div class="check-title">配送 地址</div>
      <div class="addr-list-wrap">
        <div class="add-list">
          <ul class="clearfix">
            <li 
            :class="{'check':checkIndex === index}" 
            v-for="(item,index) in addressListFilter" 
            :index="index"
            @click="checkIndex = index;selectedAddress = item.addressId">
              <dl>
                <dt>{{item.userName}}</dt>
                <dd class="address-text">{{item.streetName}}</dd>
                <dd class="tel">{{item.tel}}</dd>
              </dl>
              <div class="addr-Default" v-show="item.isDefault">默认选中</div>
              <div 
              class="addr-Default" 
              v-show="!item.isDefault && checkIndex === index" 
              @click="setDefault(item.addressId)">设置默认</div>
              <div class="addr-del" v-show="addressList.length > 1" @click="removeAddress(item.addressId)"><span class="iconfont">&#xe609;</span></div>
            </li>
            <li class="addr-new" @click="addAddress">
              <div class="add-new-inner">
                <span class="iconfont">&#xe6a9;</span>
                <p>添加新的地址</p>
              </div>
            </li>
          </ul>
          <div class="unfold" @click="expand">展开<span class="iconfont" v-html="addressImg"></span></div>
        </div>
      </div>
      <div class="check-title">运输 方式</div>
      <div class="addr-list-wrap">
        <div class="add-list">
          <ul class="clearfix">
            <li class="check">
              <dl>
                <dt>标准运输</dt>
                <dd class="address-text">免费</dd>
              </dl>
              <div class="addr-text">一旦发货，订单将在1-7个工作日内到达目的地</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="next-btn-wrap">
        <button class="btn" @click="next">下一步</button>
      </div>
      <warn-model v-show="isMdShow">
        <template slot="title">
          <p class="title">是否删除该地址</p>
        </template>
        <template slot="btn">
          <div class="btn-wrap">
            <button class="btn-close" @click="Warnclose">是</button>
            <button class="btn-close" @click="enterCart">否</button>
          </div>
        </template>
      </warn-model>
      <div class="overlay" v-show="isMdShow"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import CheckNav from 'components/checkNav/checkNav'
import WarnModel from 'components/WarnModel/WarnModel'

export default {
  name: 'Address',
  components:{
    CheckNav,
    WarnModel
  },
  data(){
    return {
      addressList:[],
      checkIndex:0,
      limit:3, //地址一次显示多少条
      isMdShow:false, //提示框是否显示
      addressId:'',
      selectedAddress:''
    }
  },
  methods:{
    init(){
      axios.get('/users/addressList').then((res) => {
        res = res.data
        if(res.status === '10001'){
          this.$router.push({
            path: '/'
          })
        }
        if(res.status === '0'){
          this.addressList = res.result
          this.addressList.forEach((item) => {
            if(item.isDefault === true){
              this.selectedAddress = item.addressId
            }
          })
        }
      })
    },
    expand(){ //地址栏展开
      if(this.limit === 3){
        this.limit = this.addressList.length
      } else {
        this.limit = 3
      }
    },
    setDefault(id){ //设置默认地址
      axios.post('/users/setDefault',{
        addressId:id
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          alert("地址默认设置成功")
          this.init()
        }
        if(res.status === '2'){
          alert("配送地址未设置")
        }
      })
    },
    removeAddress(addressId){
      this.isMdShow = true
      this.addressId = addressId
    },
    enterCart(){
      this.isMdShow = false
    },
    Warnclose(){
      axios.post('/users/delAddress',{
        addressId:this.addressId
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          this.enterCart()
          this.init()
        }
      })
    },
    addAddress(){
      this.$router.push({
        path:'/addAddress'
      })
    },
    next(){ //下一步
      this.$router.push({
        path: '/orderConfirm',
        query:{
          'addressId':this.selectedAddress
        }
      })
    }
  },
  computed:{
    addressListFilter(){
      return this.addressList.slice(0,this.limit)
    },
    addressImg(){
      if(this.limit === this.addressList.length){
        return '&#xe733;'
      } else {
        return '&#xe735;'
      }
    },
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped lang="stylus">
  .address
    padding:10px 0 50px
    .check-title
      color:#333
      padding:20px
      font-size:20px
      letter-spacing:.35em
      font-weight:700
    .addr-list-wrap
      .unfold
        text-align:center
        padding:10px 0
        color:#ee7a23
        cursor:pointer
      li
        position:relative
        float:left
        width:23.5%
        height:162px
        margin:0 1.5% 1.5% 0
        padding:20px 20px 40px
        background:#fff
        border:2px solid #e9e9e9
        overflow:hidden
        cursor:pointer
        &.check
          border-color:#ee7a23
        &:hover
          border-color:#ee7a23
        dl
          dt
            line-height:1em
            padding:0 25px 10px 0
            white-space:nowrap
            overflow:hidden
            font-size:16px
          dd
            margin-bottom:10px
            line-height:1.4
          .address-text
            height:2em
            overflow:hidden
          .tel
            color:#605f5f
            line-height:1.2
        .addr-del
          position:absolute
          bottom:17px
          right:20px
          width:20px
          height:20px
          span
            font-size:20px
            cursor:pointer
        .addr-Default
          position:absolute
          bottom:18px
          left:20px
          color:#ee7a23
        .addr-text
          position:absolute
          bottom:18px
          left:20px
          color:#999
      .addr-new
        color:#605f5f
        text-align:center
        .add-new-inner
          span
            display:inline-block
            font-size:80px
            height:80px
          p
            letter-spacing:3px
    .next-btn-wrap
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
    .overlay
      position:fixed
      top:0
      left:0
      width:100%
      height:100%
      background:rgba(0,0,0,0.5)
      z-index:8
</style>
