<template>
  <div class="warn">
    <div class="warn-warp">
      <slot name="title"></slot>
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WarnModel',
}
</script>

<style scoped lang="stylus">
  .warn
    position:fixed
    top:50%
    left:50%
    width:535px
    height:auto
    background:#fff
    z-index:10
    transform:translate(-50%,-50%)
    .warn-warp
      padding:60px 50px
      .title
        text-align:center
        line-height:1.8em
      .btn-wrap
        display:flex
        height:40px
        justify-content:center
        margin-top:50px
        .btn-close
          width:45%
          min-width:80px
          line-height:40px
          background:none
          border:1px solid #d1434a
          color:#d1434a
          letter-spacing:.25em
          font-weight:700
          &:first-child
            margin-right:20px
          &:hover
            background:#ffe5e6
            transition:all 1s ease-out
          &:nth-child(2n)
            background:#d1434a
            color:#fff
            &:hover
              background:#f16f75
              transition:all 1s ease-out
</style>
