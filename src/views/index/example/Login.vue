<template>
<modal>
  <div slot="header">
       <span class="fl">登录</span>
        <span class="fr" @click="close">X</span>
  </div>
  <div class="" slot="body">
    <form action="" class="form-signup form">
      <div class="input-item"><span>手机号码</span><el-input class="input-self" placeholder="请输入手机号码"></el-input></div>
      <div class="input-item no-margin"><span>密码</span><el-input class="input-self" placeholder="请输入密码"></el-input></div>
      <div class="f-password"><span @click="$emit('close','password')">登录忘记密码？</span></div>
      <div class="input-item">
        <span>验证码</span>
        <el-input class="input-self code" placeholder="请确认验证码"></el-input>
        <button class="code-btn">发送验证码</button>
      </div>
    </form>
  </div>
  <div slot="footer">
  <el-button  type="primary" class="login-btn info-btn">
    登录
  </el-button>
  <div class="skip">没有账号,<span href="" @click="$emit('close','signup')">点击注册</span></div>
  </div>
</modal>
</template>
<script>
  // import formBase from './formBase'
  import Modal from 'components/Modal'

  export default {
    methods: {
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
//   .f-password
//     text-align:right
//     color:blue
//     padding: 3px 0 8px
//     span
//       cursor:pointer
//       width:auto
//   .input-item
//     height:30px
//     line-height:30px
//     font-size :0
//     margin-bottom:20px
//   .input-item.no-margin
//     margin-bottom:0
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
// .login-btn
//   width:260px
// .skip
//   padding-bottom:20px
//   line-height:40px
//   font-size:12px
// .skip span
//   color:blue
//   cursor:pointer
</style>