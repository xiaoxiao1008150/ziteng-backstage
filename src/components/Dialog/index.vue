<template>
  <modal :styleObject="styleObject">
    <div slot="header"></div>
    <div slot="body" class="index-dialog" v-if="showMainPop">
        <span class="close-icon" @click="close">X</span>
      <div class="index-tep">
        <div class="index-img">
          <img class="item-img" :src="'/static/images/' + currentLotteryItem.num + '-scan.jpg' ">
          <img class="arrow" src="/static/images/arrow.jpg ">
        </div>
        <div class="qrcode-wrapper">
          <div class="index-title">活动名称：{{currentLotteryItem.text}}</div>
          <div class="qrcode">
            <img class="qrcode-img" src="/static/images/qrcode.jpg">
            <div class="qrcode-text">微信扫一扫体验活动</div>
          </div>
          <el-button v-if="!hasCreated" id="create-btn" type="primary" @click='createProject'>创建活动</el-button>
        </div>
      </div>
    </div>
    <div slot="body" v-if="showLoginPop">
    <div class="close-tep"><span>请您先登录</span><span class="fr" @click="close">X</span></div>
    </div>
  </modal>
</template>
<script>
  import Modal from '../Modal'
  import { mapGetters} from 'vuex'

  export default {
    props:{
      hasCreated:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        styleObject:{
          height:'0',
        },
        showLoginPop:false,
        showMainPop:true
      }
    },
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'currentLotteryItem',
        'status'
      ])
    },
    methods:{
      setRouterName () {
        let n = this.currentLotteryItem && this.currentLotteryItem.text
        let result
        switch(n)
        {
        case '超级大转盘':
          result = 'slyder'
          break;
        case '抽红包':
          result = 'envelope'
          break;
        case '欢乐拼图':
          result = 'jigsaw'
          break;
        case '开宝箱':
          result = 'box'
          break;
        default:
          result = false
        }
        return result
      },
      close () {
        this.$emit('close')
      },
      createProject () {
        // 判断用户是否已经登录，未登录，弹窗提示登录
        // if(this.status!=='已经注册'){
        //   this.showMainPop = false
        //   this.showLoginPop = true
        // }else{
          let name = this.setRouterName()
          this.$emit('close')
          // 在这里判断是那个模块点击的弹窗，关闭后，还是定位到本身的页面，而不是跳转 可能需要全局vuex
          if(name){
            this.$router.push(({ path: `/create-project/${name}` }))
          }
        // }
      }
    },
    created () {
      console.log(this.title)
    },
    components:{
      Modal
    }
  }
</script>
<style lang="stylus" scoped>
.index-header
  height:30px
  line-height:30px
.close-icon
  position :absolute
  right:-10px
.index-tep
  position :absolute
  top:15px
.index-img
  position:absolute
  top:0
  font-size:12px
  // background:url('/static/images/arrow.jpg') no-repeat 
  .item-img
    width:150px
    height:300px
  .arrow
    position :absolute
    width:46px
    height:46px
    top:127px
    left:150px
    margin: 0 10px
.index-dialog
  height:310px
  position:relative
  // top:-30px
.index-img
  position:absolute
  top:0px
  // left:200px
  font-size:12px
.qrcode-wrapper
  position:absolute
  top:0px
  left:216px
  font-size:12px
.index-title
  margin: 25px 0
.qrcode-img
    width:130px
    height:130px
    display:block
.qrcode-text
  margin: 20px 0 30px
#create-btn
  width:100%
.close-tep
  height:25px
  line-height:35px
</style>