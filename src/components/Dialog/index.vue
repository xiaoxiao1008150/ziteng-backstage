<template>
  <modal>
    <div slot="header" class="index-header">
        <span class="fr" @click="close">X</span>
  </div>
    <div slot="body" class="index-dialog">
      <div class="index-img">
        <img :src="'/static/images/' + imgUrl + '-scan.jpg' ">
      </div>
      <div class="qrcode-wrapper">
        <div class="index-title">{{title}}</div>
        <div class="qrcode">
          <img class="qrcode-img" src="/static/images/qrcode.jpg">
          <div class="qrcode-text">微信扫一扫体验活动</div>
        </div>
        <el-button id="create-btn" type="primary" @click='close'>创建活动</el-button>
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
        let name = this.setRouterName()
        this.$emit('close')
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
  img
    width:150px
    height:300px
.index-dialog
  height:300px
.index-img
  position:absolute
  top:50px
  // left:200px
  font-size:12px
.qrcode-wrapper
  position:absolute
  top:50px
  left:200px
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