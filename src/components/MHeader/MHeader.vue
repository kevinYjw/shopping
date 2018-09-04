<template>
  <div class="header">
    <div class="container">
      <div class="navbar">
        <div class="navbar-left pull-left">简易商城</div>
        <div class="navbar-right pull-right">
        <div class="menu">
          <div class="menu-item menu-enter">登入</div>
          <div class="menu-item menu-shoppong-cart">
            <span class="iconfont">&#xe607;</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MHeader',
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
          .menu-shoppong-cart
            span
              font-size:25px
</style>
