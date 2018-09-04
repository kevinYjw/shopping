<template>
  <div class="nav">
    <div class="container">
      <div class="nav-main">
        <a href="/">首页</a>
        <span>商品</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MNav',
}
</script>

<style scoped lang="stylus">
  .nav
    background:#f0f0f0
    .nav-main
      line-height:25px
      padding:10px 0
      font-size:14px
      letter-spacing:2px
      a
        position:relative
        margin-right:16px
        color:#999
        &::after
          content:"/"
          position:absolute
          top:0px
          right:-12px
          line-height:1.2
        &:hover
          color:#d1434a
          text-decoration:none
      span
        color:#d1434a
</style>
