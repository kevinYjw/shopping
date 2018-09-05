<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrap">
        <div class="footer-left pull-left">
          <span>地区</span>
          <select class="footer-select">
            <option value="en-US">美国</option>
            <option value="zh-CN">中国</option>
          </select>
        </div>
        <div class="footer-right pull-right">
          <span>Copyright © 2017 IMooc All Rights Reserved.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MFooter',
}
</script>

<style scoped lang="stylus">
  .footer
    width:100%
    margin-top:50px
    background:#f5f7fc
    color:#333
    height:100px
    letter-spacing:2px
    .footer-wrap
      border-top:1px solid rgba(51,51,51,.15)
      .footer-left
        height:100px
        display:flex
        align-items:center
        span
          color:#ada9a5
          margin-right:10px
        .footer-select
          font-size:100%
          margin:0
          border:1px solid #000
          padding:0px 10px 2px 2px
      .footer-right
        height:100px
        display:flex
        align-items:center
        letter-spacing:8px
        color:#ada9a5
</style>
