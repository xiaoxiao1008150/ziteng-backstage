<template>
  <modal :styleObject='styleObject' :styleObject1='styleObject1'>
    <div slot="header" class="index-header">
        <span class="fr" @click="close">X</span>
  </div>
    <div slot="body" class="index-dialog">
      <div class="index-img">
        <img class="item-img" :src="'/static/images/' + imgUrl + '-scan.jpg' ">
        <img class="arrow" src="/static/images/arrow.jpg ">
      </div>
      <div class="qrcode-wrapper">
        <div class="index-title">活动名称：{{title}}</div>
        <div class="qrcode">
          <img class="qrcode-img" src="/static/images/qrcode.jpg">
          <div class="qrcode-text">微信扫一扫体验活动</div>
        </div>
        <el-button v-if="!hasCreated" id="create-btn" type="primary" @click='createProject'>创建活动</el-button>
      </div>
    </div>
  </modal>
</template>
<script>
  import Modal from '../Modal'
  export default {
    props:{
      title:{
        type:String,
        default:'超级大转盘'
      },
      imgUrl:{
        type:String,
        default:'01'
      },
      hasCreated:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        styleObject:{
          // background:'#f5f5f5',
          height:'30px',
          lineHeight:'30px'
        },
        styleObject1:{
          // background:'#f5f5f5',
          height:'360px',
        }
      }
    },
    methods:{
      setRouterName () {
        let n = this.title
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
        let name = this.setRouterName()
        this.$emit('close')
        // 在这里判断是那个模块点击的弹窗，关闭后，还是定位到本身的页面，而不是跳转 可能需要全局vuex
        if(name){
          this.$router.push(({ path: `/create-project/${name}` }))
        }
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
  height:20px
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
  height:300px
  position:relative
  top:-30px
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
</style>