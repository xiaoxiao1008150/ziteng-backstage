<template>
 <div class="slyder-container">
  <zi-header></zi-header>
  <zi-tab></zi-tab>
</div>
</template>
<script>
import ziHeader from '../ziHeader'
import ziTab from './Tab.vue'
export default {
  name: 'slyder',
  components:{
    ziHeader,
    ziTab
  }
}
</script>
<style lang="stylus" scoped>
</style>