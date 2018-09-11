<template>
  <div class="orderConfirm">
    <div class="container">
      <check-nav :cur="2"></check-nav>
      <div class="title">
        <h2>订单 确认</h2>
      </div>
      <div class="item-wrap">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>名称</li>
              <li>单价</li>
              <li>数量</li>
              <li>总价</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="(item,index) in checkedList" :index="index">
              <div class="cart-tab-1">
                <div class="pic"><img :src="`static/${item.productImage}`"></div>
                <div class="title">{{item.productName}}</div>
              </div>
              <div class="cart-tab-2">{{item.salePrice}}</div>
              <div class="cart-tab-3">x{{item.productNum}}</div>
              <div class="cart-tab-4">￥{{item.salePrice * item.productNum}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="price-count-wrap">
        <ul>
          <li>
            <span class="name">商品总价：</span>
            <span class="price">￥{{this.itemSubtotal}}</span>
          </li>
          <li>
            <span class="name">配送费：</span>
            <span class="price">￥{{this.shipping}}</span>
          </li>
          <li>
            <span class="name">折扣：</span>
            <span class="price">(减)￥{{this.discount}}</span>
          </li>
          <li>
            <span class="name">总计：</span>
            <span class="price orderTotal">￥{{this.orderTotal}}</span>
          </li>
        </ul>
      </div>
      <div class="next-btn-wrap">
        <button class="btn btn-left" @click="prev">上一步</button>
        <button class="btn" @click="next">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import checkNav from 'components/checkNav/checkNav'

export default {
  name: 'OrderConfirm',
  data(){
    return {
      cartList:[],
      checkedList:[],
      shipping:100, //配送费
      discount:200, //优惠
    }
  },
  computed:{
    itemSubtotal(){ //商品总价
      let sum = 0
      this.checkedList.forEach((item) => {
        sum += item.productNum * item.salePrice
      })
      return sum
    },
    orderTotal(){  //总价
      return this.itemSubtotal + this.shipping - this.discount
    }
  },
  methods:{
    init(){
      axios.get('users/cartList').then((res) => {
        res = res.data
        if(res.status === '10001'){
          this.$router.push({
            path:'/'
          })
        }
        if(res.status === '1'){
          this.cartList = res.result
          this.cartList.forEach((item) => {
            if(item.checked === '1'){
              this.checkedList.push(item)
            }
          })
        }
      })
    },
    prev(){
      this.$router.push({
        path:'/address'
      })
    },
    next(){
      let addressId = this.$route.query.addressId
      axios.post("/users/payMent",{
        addressId:addressId,
        orderTotal:this.orderTotal,
        goodsList:this.checkedList
      }).then((res) => {
        res = res.data
        console.log(res)
      })
    }
  },
  components:{
    checkNav
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped lang="stylus">
  .orderConfirm
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
              font-size:16px
            .cart-tab-4
              color:#d1434a
    .price-count-wrap
      margin-top:30px
      ul
        li
          text-align:right
          padding:10px 0
          font-size:18px
          .name
            color:#aaa
          .price
            font-weight:400
          .orderTotal
            color:#d1434a
            font-size:1.2em
            font-weight:700
    .next-btn-wrap
      margin-top:30px
      position:relative
      .btn
        position:absolute
        right:0
        display:inline-block
        min-width:200px
        text-align:center
        background:#d1434a
        color:#fff
        letter-spacing:.25em
        font-weight:700
        height:40px
        &:hover
          background:#f16f75
          transition:all 0.5s
      .btn-left
        left:0
        background:transparent
        border:1px solid #d1434a
        color:#d1434a
        &:hover
          background:#ffe5e6
          transition:all 0.5s
</style>
