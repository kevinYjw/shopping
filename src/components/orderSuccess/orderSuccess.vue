<template>
  <div class="orderSuccess">
    <div class="container">
      <check-nav :cur="4"></check-nav>
      <div class="order-create">
        <div class="order-create-pic">
          <img src="static/ok-2.png">
        </div>
        <div class="order-create-main">
          <h3>
            谢谢你的光临 </br>
            你的订单会尽快处理
          </h3>
          <p>
            <span>订单ID: {{orderId}}</span>
            <span>订单金额: ￥{{orderTotal}}</span>
          </p>
          <div class="btn-wrap clearfix">
            <button class="btn btn-l" @click="Tocart">购物车</button>
            <button class="btn btn-r" @click="ToHome">首页</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import checkNav from 'components/checkNav/checkNav'

export default {
  name: 'OrderTotal',
  data(){
    return {
      orderId:'',
      orderTotal:''
    }
  },
  components:{
    checkNav
  },
  methods:{
    init(){
      let orderId = this.$route.query.orderId
      axios.post("/users/orderDetail",{
        orderId:orderId
      }).then((res) => {
        res = res.data
        if(res.status === '10001'){
          this.$router.push({
            path: '/'
          })
        } else if(res.status === '10002'){
          alert("订单未找到")
          this.$router.push({
            path: '/'
          })
        } else if(res.status === '0'){
          this.orderId = res.result.orderId
          this.orderTotal = res.result.orderTotal
        }
      })
    },
    Tocart(){
      this.$router.push({
        path: '/cart'
      })
    },
    ToHome(){
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style scoped lang="stylus">
  .orderSuccess
    .order-create
      padding:80px 0 50px
      text-align:center
      .order-create-pic
        height:130px
        margin:0 auto
        margin-bottom:60px
        img
          height:100%
    .order-create-main
      font-size:18px
      line-height:1.3
      h3
        margin-bottom:20px
        font-size:1.25em
        font-size:200
        color:#333
        line-height:1.5;
        letter-spacing:2px
      p
        margin-bottom:40px
        color:#999
        span
          margin:0 10px
      .btn-wrap
        max-width:468px
        margin:0 auto
        padding:0 5px
        .btn
          float:right
          width:48%
          padding:10px 10px
          min-width:120px
          background:#d1434a
          color:#fff
          border:1px solid #d1434a
          &:hover
            background:#f16f75
            border-color:#f16f75
            transition:all 0.3s ease-out
        .btn-l
          float:left
          color:#d1434a
          background:transparent
          &:hover
            background:#ffe5e6
            transition:all 0.3s ease-out
</style>
