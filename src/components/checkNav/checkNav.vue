<template>
  <div class="checkNav">
    <ul>
      <li v-for="(item,index) in addr" :index="index" :class="{'cur':(cur-1) >= index}">{{item}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'CheckNav',
  props:{
    cur:{
      type:Number
    }
  },
  data(){
    return {
      addr:['确认地址','查看你的订单','支付金额','确认订单']
    }
  }
}
</script>

<style scoped lang="stylus">
  .checkNav
    padding:30px 0 20px
    ul
      display:flex
      li
        position:relative
        flex:1
        line-height:1.25em
        padding:0 1em 1.25em
        border-bottom:2px solid #ccc
        text-align:center
        font-weight:700
        color:#ccc
        letter-spacing:1px
        &::after
          content:''
          position:absolute
          bottom:-7px
          left:49%
          width:14px
          height:14px
          border-radius:50%
          background:#ccc
        &.cur
          color:#d1434a
          border-color:#d1434a
          &::after
            background:#d1434a
</style>
