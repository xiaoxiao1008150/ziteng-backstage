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
      'preparePath',
      'isSubmit'
    ])
  },
  methods:{
    ...mapMutations([
      'setPreparePath',
      'setLotteryStatus',
      'setIsSubmit'
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
      vm.setIsSubmit(false)
      // 设置全局标志，侧边栏对应标签active
    })
  },
  beforeRouteLeave (to, from, next) {
    // 路由离开之前判断是否是提交表单之后的离开 是 直接离开 不用弹窗
      //设置想要去的路由  vuex
      if(this.isSubmit) {
        this.close();
        next()
      }else{
        console.log('isCreate',this.isCreate)
        this.setPreparePath(to.path)
        this.dialogVisible = true
        if(this.isCreate) {
          next()
        }
      }
  },
}