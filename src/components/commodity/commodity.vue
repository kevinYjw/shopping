<template>
  <div class="commodity">
    <div class="container">
      <div class="commodity-nav">
        <span class="sortby">排序:</span>
        <a href="#" class="item active">默认</a>
        <a href="#" class="item" @click="sortGoods">价格 <span class="iconfont" v-html="sortImg"></span></a>
      </div>
      <div class="commodity-result">
        <div class="filter">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd><a href="#" @click.prevent="setPriceFilter('all')" :class="{'active' : priceChecked === 'all'}">All</a></dd>
            <dd v-for="(item,index) in priceList" @click.prevent.stop="setPriceFilter(index)">
              <a href="#" :class="{'active' : priceChecked === index}">{{`${item.startPrice} ~ ${item.endPrice}`}}</a>
            </dd>
          </dl>
        </div>
        <div class="commodity-list-wrap clearfix">
          <div class="commodity-list clearfix">
            <ul>
              <li class="col-md-3 col-sm-4 col-xs-1" v-for="(item,index) in goodsList" :index="index">
                <div class="pic">
                  <a href="#"><img v-lazy="`/static/${item.productImage}`"></a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice}}</div>
                  <div class="btn-area">
                    <a href="#" class="btn btn-red" @click.prevent="addCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div 
          class="view-more-normal" 
          v-infinite-scroll="loadMore" 
          infinite-scroll-disabled="busy" 
          infinite-scroll-distance="20">
            <img src="static/loading-spinning-bubbles.svg" alt="" v-if="loading">      
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Commodity',
  data(){
    return {
      goodsList : [],
      priceList : [
        {
          startPrice: "0.00",
          endPrice : '100.00'
        },
        {
          startPrice: "100.00",
          endPrice : '500.00'
        },
        {
          startPrice: "500.00",
          endPrice : '1000.00'
        },
        {
          startPrice: "1000.00",
          endPrice : '2000.00'
        }
      ],
      priceChecked:'all',
      sortFlag: 1,
      page:1,
      pageSize:8,
      busy:true,
      loading:false,
    }
  },
  methods:{
    getGoods(flag){
      let param = {
        sort:this.sortFlag,
        page:this.page,
        pageSize:this.pageSize,
        priceLevel:this.priceChecked
      }
      this.loading = true
      axios.get("/goods",{
        params:param
      }).then((res) => {
        this.loading = false
        res = res.data
        if(res.status === "0"){
          if(flag === true){
            this.goodsList = this.goodsList.concat(res.result.list)
            if(res.result.count === 0){
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.goodsList = res.result.list
            this.busy = false
          }
        }
      })
    },
    setPriceFilter(value){
      this.priceChecked = value
      this.page = 1
      this.getGoods()
    },
    sortGoods(){
      this.sortFlag = this.sortFlag === 1 ? -1 : 1
      this.page = 1
      this.getGoods()
    },
    loadMore(){
      this.busy = true
      setTimeout(() => {
        this.page++
        this.getGoods(true)
      },500)
    },
    addCart(productId){
      axios.post("/goods/addCart",{
        productId:productId
      }).then((res) => {
        res = res.data
        if(res.status === "0"){
          alert("doc")
        }
      })
    }
  },
  computed:{
    sortImg(){
      return this.sortFlag === 1 ? '&#xe733;' : '&#xe735;'
    }
  },
  mounted (){
    this.getGoods()
  }
}
</script>

<style lang="stylus" scoped>
  .commodity
    width:100%
    background:#f5f7fc
    .commodity-nav
      height:55px
      line-height:55px
      margin:60px 0 30px
      background:#fff
      padding:0 20px
      text-align:right
      overflow:hidden
      .item
        margin:0 10px
        color:#000
      .active
        color:#ee7a23
      .sortby
        font-weight:600
    .commodity-result
      display:flex
      .filter
        width:230px
        padding:0 20px
        color:#605f5f
        margin-right:25px
        .filter-price
          min-width:180px
          margin-bottom:50px
          font-size:16px
          dt
            margin-bottom:30px
            letter-spacing:.25em
            text-transform:uppercase
            font-weight:700
          dd
            line-height:1.5em
            margin:20px 0
            a.active
              border-left:2px solid #ee7a23
              color:#ee7a23
              font-weight:700
              padding-left:15px
            a
              color:#000
              &:hover
                transition:padding-left .3s ease-out
                color:#ee7a23
                padding-left:15px
                border-left:2px solid #ee7a23
      .commodity-list-wrap
        flex:1
        .commodity-list
          ul
            li
              background:#fff
              border:2px solid #e9e9e9
              margin-bottom:20px
              &:hover
                transition:all .5s ease-out
                border-color:#ee7a23
                transform:translateY(-5px)
                box-shadow:0 0 10px #999
              .pic
                overflow:hidden
                a
                  display:block
                  width:100%
                  height:0
                  padding-bottom:100%
                  img
                    width:100%
              .main
                padding:20px 10px 10px
                .name
                  height:4em
                  line-height:1.25em
                  padding-bottom:10px
                  font-weight:700
                  overflow:hidden
                .price
                  float:left
                  line-height:30px
                  color:#d1434a
                  font-size:1.25em
                .btn-area
                  clear:both
                  padding-top:10px
                  a
                    width:100%
                  .btn-red
                    border:1px solid #d1434a
                    color:#d1434a
                    padding:10px 12px
                    font-weight:700
                    letter-spacing:.25em
                    cursor: pointer
                    &:hover
                      background:#ffe5e6
        .view-more-normal
          width:100px
          height:120px
          margin:20px auto
          overflow:hidden
          font-size:14px
</style>
