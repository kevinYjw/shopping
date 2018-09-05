<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <commodity></commodity>
    <m-footer></m-footer>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/MHeader/MHeader'
import MNav from 'components/MNav/MNav'
import MFooter from 'components/MFooter/MFooter'
import Commodity from 'components/Commodity/Commodity'

export default {
  name: 'App',
  components:{
    MHeader,
    MNav,
    MFooter,
    Commodity
  }
}
</script>

<style></style>
