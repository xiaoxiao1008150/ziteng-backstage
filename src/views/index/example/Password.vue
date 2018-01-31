<template>
<modal>
  <div slot="header">
       <span class="fl">忘记密码</span>
        <span class="fr" @click="close">X</span>
  </div>
  <div class="" slot="body" v-if="showInfo">
    <form action="" class="form-signup form">
      <div class="input-item"><span>企业名称</span><el-input class="input-self" placeholder="请输入购买合同中的企业名称"></el-input></div>
      <div class="input-item"><span>联系人</span><el-input class="input-self" placeholder="请输入联系人"></el-input></div>
      <div class="input-item"><span>手机号码</span><el-input class="input-self" placeholder="请输入手机号码"></el-input></div>
      <div class="input-item">
        <span>验证码</span>
        <el-input class="input-self code" placeholder="请确认验证码"></el-input>
        <button class="code-btn">发送验证码</button>
      </div>
    </form>
  </div>
  <div class="" slot="body" v-else>
    <form action="" class="form-signup form">
      <div class="input-item"><span>密码</span><el-input class="input-self" placeholder="请输入密码"></el-input></div>
      <div class="input-item"><span>确认密码</span><el-input class="input-self" placeholder="请确认密码"></el-input></div>
    </form>
  </div>
  <div slot="footer" class="next">
    <el-button  class="info-btn" type="primary"  @click="goToConfirmPassword">
        下一步
      </el-button>
  </div>
</modal>
</template>
<script>
  // import formBase from './formBase'
  import Modal from 'components/Modal'

  export default {
    data () {
      return {
        showInfo:true
        // showPassword:false
      }
    },
    methods: {
      goToConfirmPassword() {
        if(this.showInfo) {
          this.showInfo = false
        }
      },
      close () {
        this.$emit('close')
      }
    },
    components:{
     Modal
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
// .form
//   .input-item
//     height:30px
//     line-height:30px
//     font-size :0
//     margin-bottom:20px
//   span
//     display:inline-block
//     width:60px
//     vertical-align :middle
//     text-align:justify
//     font-size :12px
//   .input-self
//     width:280px
//     height:30px !important
//     vertical-align :middle
//   .input-self.code
//     width:150px
//     margin-right:20px
//   .code-btn
//     width:110px
//     height:30px
//     background:#adadad
//     border:none
//     outline:none
//     color:#fff
//     border-radius:4px
//     vertical-align :middle
// .sign-btn
//   width:260px
// .next
//   padding-bottom:40px
</style>