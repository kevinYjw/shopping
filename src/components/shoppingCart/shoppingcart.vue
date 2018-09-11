<template>
  <div class="shopCart">
    <div class="container">
      <div class="title">
        <h2>MY CART</h2>
      </div>
      <div class="item-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>名称</li>
              <li>单价</li>
              <li>数量</li>
              <li>总价</li>
              <li>删除</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="(item,index) in cartList" :index='index'>
              <div class="cart-tab-1">
                <div class="check">
                  <span class="iconfont" :class="{'not':item.checked === '1'}" @click="editCart('checked',item)">&#xe611;</span>
                </div>
                <div class="pic"><img :src="`static/${item.productImage}`"></div>
                <div class="title">{{item.productName}}</div>
              </div>
              <div class="cart-tab-2">{{item.salePrice}}</div>
              <div class="cart-tab-3">
                <div class="quantify-wrap">
                  <div class="quantify">
                    <span class="input-sub" @click="editCart('sub',item)">-</span>
                    <span class="select-ipt">{{item.productNum}}</span>
                    <span class="input-add" @click="editCart('add',item)">+</span>
                  </div>
                </div>
              </div>
              <div class="cart-tab-4">{{'￥' + (item.salePrice * item.productNum)}}</div>
              <div class="cart-tab-5">
                <div class="opration" @click="deleteModel(item)"><span class="iconfont">&#xe609;</span></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-foot-wrap clearfix">
        <div class="cart-foot-1">
          <div class="check">
            <span class="iconfont icon" :class="{'not':checkAllFlag}" @click="toggleCheckAll">&#xe611;</span>
            <span class="price">商品总价</span>
          </div>
        </div>
        <div class="cart-foot-r">
          <div class="total">
            金额：<span class="price">{{`￥${totalPrice}`}}</span>
          </div>
          <div class="btn-wind" :class="{'dis':checkedCount===0}" @click="checkOut">结算</div>
        </div>
      </div>
      <warn-model v-show="deleteFlag">
        <template slot="title">
          <p class="title">是否删除该商品</p>
        </template>
        <template slot="btn">
          <div class="btn-wrap">
            <button class="btn-close" @click="Warnclose">是</button>
            <button class="btn-close" @click="enterCart">否</button>
          </div>
        </template>
      </warn-model>
      <div class="overlay" v-show="deleteFlag"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import WarnModel from 'src/components/WarnModel/WarnModel'
import {mapMutations} from 'vuex'

export default {
  name: 'ShoppingCart',
  data(){
    return {
      cartList:[],
      deleteFlag:false, //删除框显示隐藏
      productId:'',
      delItem:''
    }
  },
  computed:{
    checkAllFlag(){ //全选是否被选中
      return this.checkedCount === this.cartList.length
    },
    checkedCount(){
      let i = 0
      this.cartList.forEach((item) => {
        if(item.checked === '1'){
          i++
        }
      })
      return i
    },
    totalPrice(){ //总价格
      let money = 0
      this.cartList.forEach((item) => {
        if(item.checked === '1'){
          money += (parseInt(item.productNum) * parseFloat(item.salePrice))
        }
      })
      return money
    }
  },
  methods:{
    init(){ //获取购物车信息
      axios.get("/users/cartList").then((res) => {
        res = res.data
        if(res.status === '10001'){
          this.$router.push({
            path:'/'
          })
        }
        if(res.status === '0'){
          this.cartList = res.result
        }
      })
    },
    deleteModel(item){ //删除框显示
      this.deleteFlag = true
      this.delItem = item
      this.productId = item.productId
    },
    Warnclose(){
      axios.post('/users/cartDel',{
        productId:this.productId
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          this.enterCart()
          let delCount = parseInt(this.delItem.productNum)
          this.setCartCount(-delCount)
          this.init()
        }
      })
    },
    enterCart(){
      this.deleteFlag = false
    },
    editCart(flag,item){ //数量改变
      if(flag === 'add'){
        if(item.productNum > 99){
          return
        }
        item.productNum++
      } else if(flag === 'sub'){
        if(item.productNum <= 0){
          return
        }
        item.productNum--
      } else if(flag === 'checked'){
        item.checked = item.checked === '1' ? '0' : '1'
      }
      axios.post('/users/cartEdit',{
        productId:item.productId,
        productNum:item.productNum,
        checked:item.checked
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          let count = flag === 'add' ? 1 : -1
          this.setCartCount(count)
        }
      })
    },
    toggleCheckAll(){ //全选是否选中
      let flag = !this.checkAllFlag
      this.cartList.forEach((item) => {
        item.checked = flag ? '1' : '0'
      })
      axios.post('/users/editCheckAll',{
        checkAllFlag:flag
      }).then((res) => {
        res = res.data
        if(res.status === '0'){
          console.log(res.result)
        }
      })
    },
    checkOut(){ //结算
      if(this.checkedCount >0){
        this.$router.push({
          path:'/Address'
        })
      }
    },
    ...mapMutations({
      setCartCount:'SET_CARTCOUNT'
    })
  },
  components:{
    WarnModel
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped lang="stylus">
  .shopCart
    .title
      h2
        padding:40px 0 20px
        font-size:22px
        letter-spacing:.25em
        font-weight:700
    .item-wrap
      .cart-item
        display:table
        width:100%
        .cart-item-head
          display:table-header-group
          width:100%
          ul
            display:table-row
            width:100%
            li
              display:table-cell
              height:40px
              line-height:40px
              background:#605f5f
              color:#fff
              text-align:center
              letter-spacing:.25em
        .cart-item-list
          display:table-row-group
          li
            position:relative
            display:table-row
            padding:32px 0
            background:#fff
            div
              position:relative
              display:table-cell
              border-bottom:1px solid #e9e9e9
              height:100%
              text-align:center
            .cart-tab-1
              width:515px
              min-height:72px
              padding:32px 0
              text-align:left
              border-left:1px solid #e9e9e9
              .check
                border:none
                float:left
                padding:20px 0 0 20px
                span
                  font-size:26px
                  border:1px solid #ee7a23
                  border-radius:50%
                  color:#fff
                  cursor:pointer
                  &.not
                    color:#ee7a23
              .pic
                float:left
                width:80px
                height:80px
                margin-left:20px
                border:1px solid #e9e9e9
                overflow:hidden
                img
                  width:100%
              .title
                line-height:76px
                color:#000
                font-weight:700
                padding:0 20px
                border:none
            .cart-tab-2,.cart-tab-4
              text-align:center
              font-size:16px
            .cart-tab-3
              border:none
              .quantify-wrap
                border:none
                display:flex
                align-items:center
                justify-content:center
                .quantify
                  border:none
                  height:30px
                  .input-sub,.input-add,.select-ipt
                    display:inline-block
                    min-width:40px
                    height:100%
                    border:0
                    color:#605f5f
                    text-align:center
                    font-size:16px
                    overflow:hidden
                    background:#f0f0f0
                    Line-height:30px
                    cursor:pointer
                  .select-ipt
                    background:none
            .cart-tab-5
              display:flex
              justify-content:center
              border:none
              .opration
                padding:5px
                cursor:pointer
    .cart-foot-wrap
      width:100%
      margin-top:20px
      background:#fff
      border:1px solid #e9e9e9
      font-size:16px
      .cart-foot-1
        float:left
        padding:0 22px
        line-height:54px
        .check
          .icon
            font-size:26px
            border:1px solid #ee7a23
            border-radius:50%
            color:#fff
            margin-right:20px
            vertical-align: middle
            cursor:pointer
          .not
            color:#ee7a23
          .price
            vertical-align: middle
            letter-spacing:.25em
            font-weight:600
      .cart-foot-r
        float:right
        .total
          float:left
          margin: 0 30px 0 0
          font-size:16px
          color:#999
          text-align:right
          line-height:54px
          .price
            color:#d1434a
            font-weight:700
            font-size:1.12em
        .btn-wind
          float:right
          line-height:54px
          text-align:center
          font-size:14px
          padding:0 32px
          font-weight:700
          border:1px solid #d1434a
          letter-spacing:.50em
          background:#d1434a
          color:#fff
          &.dis
            background-color:#ccc
            color:#fff
            cursor:default
            border-color:#ccc
            &:hover
              background-color:#ccc
              color:#fff
              cursor:default
              border-color:#ccc
          &:hover
            background:#f16f75
            transition:all .3s ease-out
    .overlay
      position:fixed
      top:0
      left:0
      width:100%
      height:100%
      background:rgba(0,0,0,0.5)
      z-index:8
</style>
