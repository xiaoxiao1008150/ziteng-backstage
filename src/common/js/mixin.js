import ziHeader from 'views/components-demo/ziHeader'
import ziTab from 'views/components-demo/ziTab'
import { mapGetters,mapMutations} from 'vuex'


export const lotteryRouterMixin = {
  name: 'template',
  components:{
    ziHeader,
    ziTab
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'isCreate',
      'preparePath'
    ])
  },
  methods:{
    ...mapMutations([
      'setPreparePath',
      'setLotteryStatus'
    ]),
    close () {
      this.dialogVisible = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.dialogVisible = false
      vm.setLotteryStatus(false)
      // 设置全局标志，侧边栏对应标签active
    })
  },
  beforeRouteLeave (to, from, next) {
      //设置想要去的路由  vuex
      console.log('走')
      console.log('isCreate',this.isCreate)
      this.setPreparePath(to.path)
      this.dialogVisible = true
      if(this.isCreate) {
        next()
      }
  },
}