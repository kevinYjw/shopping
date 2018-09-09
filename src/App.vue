<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <router-view/>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from 'components/MHeader/MHeader'
import MNav from 'components/MNav/MNav'
import MFooter from 'components/MFooter/MFooter'

export default {
  name: 'App',
  components:{
    MHeader,
    MNav,
    MFooter
  }
}
</script>

<style></style>
