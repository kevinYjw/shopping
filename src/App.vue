<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <router-view/>
  </div>
</template>

<script>
import MHeader from 'components/MHeader/MHeader'
import MNav from 'components/MNav/MNav'

export default {
  name: 'App',
  components:{
    MHeader,
    MNav
  }
}
</script>

<style></style>
