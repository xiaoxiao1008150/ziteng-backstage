<template>
 <div class="container">
  <zi-header></zi-header>
  <zi-tab :dialogVisible="dialogVisible" @close="close"></zi-tab>
</div>
</template>
<script>
// import ziHeader from '../ziHeader'
// import ziTab from '../ziTab'
// import { mapGetters,mapMutations} from 'vuex'
import {lotteryRouterMixin} from 'common/js/mixin'

export default {
  name: 'slyderAPP',
  mixins: [lotteryRouterMixin]

  // components:{
  //   ziHeader,
  //   ziTab
  // },
  // data () {
  //   return {
  //     dialogVisible: false
  //   }
  // },
  // computed: {
  // // 使用对象展开运算符将 getter 混入 computed 对象中
  //   ...mapGetters([
  //     'isCreate',
  //     'preparePath'
  //   ])
  // },
  // methods:{
  //   ...mapMutations([
  //     'setPreparePath',
  //     'setLotteryStatus'
  //   ]),
  //   close () {
  //     this.dialogVisible = false
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     // 通过 `vm` 访问组件实例
  //     vm.dialogVisible = false
  //     vm.setLotteryStatus(false)
  //   })
  // },
  // beforeRouteLeave (to, from, next) {
  //     //设置想要去的路由  vuex
  //     console.log('走')
  //     console.log('isCreate',this.isCreate)
  //     this.setPreparePath(to.path)
  //     this.dialogVisible = true
  //     if(this.isCreate) {
  //       next()
  //     }
  // },
}
</script>
<style lang="stylus" scoped>
</style>