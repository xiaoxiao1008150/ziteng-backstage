<template>
<modal>
  <div slot="header">
       <span class="fl">登录</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
  </div>
  <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      </el-form-item>
      <el-form-item label="手机号码" prop="_loginName">
        <el-input v-model="ruleForm._loginName" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="_password">
        <el-input   type="password" v-model="ruleForm._password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <div id="f-password"><span @click="$emit('close','password')">忘记密码</span></div>
      <el-form-item label="验证码" prop="_verCode">
        <el-input class="captcha" v-model="ruleForm._verCode" placeholder="请确认验证码"></el-input>
        <!-- <button class="code-btn">发送验证码</button> -->
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
      </el-form-item>
        <el-button type="primary" class="info-btn" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
    </el-form>
    <div class="skip">没有账号,<span href="" @click="$emit('close','signup')">点击注册</span></div>
  </div>
<!--   <div slot="footer">
  <el-button  type="primary" class="login-btn info-btn">
    登录
  </el-button>
  <div class="skip">没有账号,<span href="" @click="$emit('close','signup')">点击注册</span></div>
  </div> -->
</modal>
</template>
<script>
  // import formBase from './formBase'
  import Modal from 'components/Modal'
  import  Captcha from 'components/Captcha'
  import { login } from 'api/login'
  import qs from 'qs'

  export default {
    data () {
      return {
          countDown:false,
          loading:false,
          ruleForm: {
            _loginName: '',
            _password: '',
            _verCode: '',
          },
          rules: {
            _loginName: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              // { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            _password: [
              { required: true,message: '请输入密码', trigger: 'blur' }
            ],
            _verCode: [
              { required: true,message: '请输入验证码', trigger: 'blur' }
            ],
          }
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      stop () {
        this.countDown = false
      },
      getCaptcha () {
        this.countDown = true
        //在这里post短信验证码，data mobileNumber
        // getCaptcha(data).then((res)=>{
        //   if(res.data.code==='ok'){
        //     this.countDown = true
        //   }
        // })
      },
      submitForm(formName) {
        // this.$router.push({ path: '/create-project/index' })
        this.$refs.ruleForm.validate(valid => {
          // console.log('rule', this.ruleForm)
          if (valid) {
            this.loading = true
            let init = this.ruleForm
            let data = qs.stringify(init) //测试不用
            
          this.$store.dispatch('LoginByUsername', data).then(() => {
              this.$router.push({ path: '/create-project' });
              this.loading = false
              // this.$router.push({ path: '/' })
              // this.$router.push({ path: '/create-project/index' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     // 在这里post数据
        //     let data = this.$refs[formName].model
        //     createUser(data).then((response) => {
        //       // console.log('kk', response) response data是post的数据
        //       this.close()//这里注意顺序
        //       //登录成功跳转到创建活动页面
        //       this.$router.push({ path: '/create-project/index' })
        //     })
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      }
    },
    components:{
      Modal,
      Captcha
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