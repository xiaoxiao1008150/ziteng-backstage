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
        <captcha @click.native="getCaptcha" 
        :countDown="countDown"
        @stop="stop"></captcha>
      </el-form-item>
      <el-form-item class="import-btn">
        <el-button type="primary" class="info-btn" :disabled="isDisabled" :loading="loading" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
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
  import {getCaptcha} from 'api/login'
  import qs from 'qs'

  export default {
    data () {
      var validatePass3 = (rule, value, callback) => {
        this.$refs.ruleForm.validateField('_loginName' ,message => {
          if (message==='请输入手机号码') {
            callback(new Error('请先输入手机号码'));
          }else if (message==='手机号码输入不正确') {
            callback(new Error(message));
          }else if (value==='') {
            callback(new Error('请输入验证码'))
          }else {
            callback();
          }
        })
      };
      return {
          isDisabled:false,
          countDown:false,
          loading:false,
          flag:true,
          ruleForm: {
            _loginName: '',
            _password: '',
            _verCode: '',
          },
          rules: {
            _loginName: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确',trigger: 'blur'}
            ],
            _password: [
              { required: true,message: '请输入密码', trigger: 'blur' }
            ],
            _verCode: [
              { required: true, validator: validatePass3, trigger: 'blur' },
            ],
          }
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      stop (flag) {
        this.countDown = false
        this.flag = flag
      },
      getCaptcha () {
        //判断是否已经填入验证码 才向后台请求
        // 对表单验证码字段进行验证
        this.$refs.ruleForm.validateField('_verCode' ,message => {
          // 说明有错误字段
          if(message ==='请输入验证码'){
            if(this.flag){
              this.flag = false
              this.countDown = true
              //在这里post短信验证码，data mobileNumber
              let data = this.ruleForm._loginName
              // let data = qs.stringify(phoneNum)
              getCaptcha(data).then((res)=>{
                if(res.data && res.data.code==='ok'){
                  // 证实后台已经发送验证码 开始倒计时
                  this.countDown = true
                }else{
                  this.countDown = false
                  this.$message({
                    message: '请稍后尝试',
                    type: 'error',
                    duration: 2* 1000
                  });
                }
              })
            }
          }
        })
      },
      submitForm(formName) {
        // this.$router.push({ path: '/create-project/index' })
        this.$refs.ruleForm.validate(valid => {
          // console.log('rule', this.ruleForm)
          if (valid) {
            //验证码倒数 取消
            this.countDown = false
            this.loading = true
            this.isDisabled = true
            let init = this.ruleForm
            let data = qs.stringify(init) //测试不用
          this.$store.dispatch('LoginByUsername', data).then((res) => {
              console.log('storeres', res)
              let code = res.data.code
              let message = res.data.message
              if(code==='ok'){
                this.$router.push({ path: '/create-project' });
              }else if(message==='验证码错误'){
                this.$message({
                  message: '验证码错误',
                  type: 'error',
                  duration: 2* 1000
                });
              }else{
                this.$message({
                  message: '请稍后尝试',
                  type: 'error',
                  duration: 2* 1000
                });
              }
              this.isDisabled = false
              this.loading = false
            }).catch(() => {
              this.isDisabled = false
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
</style>