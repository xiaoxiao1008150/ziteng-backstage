<template>
 <div class="container">
  <zi-header></zi-header>
  <zi-tab></zi-tab>
</div>
</template>
<script>
import ziHeader from '../ziHeader'
import ziTab from '../ziTab'
import { mapGetters,mapMutations} from 'vuex'

export default {
  name: 'envelope',
  components:{
    ziHeader,
    ziTab
  }
}
</script>
<style lang="stylus" scoped>
</style>