<template>
  <modal>
    <div slot="header">
      <span class="fl">更换密码</span>
      <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
    </div>
    <div class="" slot="body" v-if="showInfo">
      <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
        <el-form-item label="手机号" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
          <!-- <button class="code-btn">发送验证码</button> -->
         <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
        </el-form-item>
        <el-button type="primary"  class="info-btn" @click="goToConfirmPassword('ruleForm')">下一步</el-button>
      </el-form>
    </div>
    <div class="" slot="body" v-else>
    <el-form status-icon :model="ruleForm1" :rules="rules1"  ref="ruleForm1"  label-width="80px" label-position ="left">
       <el-form-item label="密码" prop="password">
        <el-input  type="password" v-model="ruleForm1.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="ruleForm1.confirmPassword" placeholder="请确认密码" auto-complete="off"></el-input>
      </el-form-item>
        <el-button type="primary" class="info-btn" @click="submitForm('ruleForm1')">完成</el-button>
    </el-form>
  </div>
  </modal>
</template>
<script>
  // import formBase from './formBase'
  import Modal from 'components/Modal'
  import  Captcha from 'components/Captcha'
  import {getCaptcha} from 'api/login'
  import {updatePassword} from 'api/user'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm1.confirmPassword !== '') {
            this.$refs.ruleForm1.validateField('confirmPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm1.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        this.$refs.ruleForm.validateField('contact' ,message => {
          if (message==='请输入手机号码') {
            callback(new Error('请先输入手机号码'));
          }else if (message==='手机号码输入不正确') {
            callback(new Error(message));
          }else if (value==='') {
            callback(new Error('请输入验证码'))
          }else if(this.test === '验证码错误') {
              callback(new Error('验证码错误'))
          }else {
            callback();
          }
        })
      };
      return {
        countDown:false,
        showInfo:true,
        flag:true,
        loading:false,
        // showPassword:false
          ruleForm: {
            contact: '',
            captcha: ''
          },
          ruleForm1: {
            password: '',
            confirmPassword: '',
          },
          rules: {
            contact: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确',trigger: 'blur'}
            ],
            captcha: [
              { required: true,validator: validatePass3, trigger: 'blur' }
            ]
          },
          rules1: {
            password: [
              { required: true,validator: validatePass, trigger: 'blur' }
            ],
            confirmPassword: [
              { required: true, validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
    },
    methods: {
      stop (flag) {
        this.countDown = false
        this.flag = flag
      },
      getCaptcha () {
        this.$refs.ruleForm.validateField('captcha' ,message => {
          // 说明有错误字段
          if(message ==='请输入验证码'){
            if(this.flag){
              this.flag = false
              this.countDown = true
              //在这里post短信验证码，data mobileNumber
              let data = this.ruleForm.contact
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
      goToConfirmPassword(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            if(true){
              this.test = '验证码错误'
            }
            else{
              if(this.showInfo) {
                this.showInfo = false
                this.$refs[formName].resetFields();
              }
            }
          }
        })
      },
      close () {
        this.$emit('close')
        this.countDown = false
        if(this.showInfo){
          this.$refs.ruleForm.resetFields()
        }else{
          this.$refs.ruleForm1.resetFields();
        }
        this.showInfo = true
        console.log('rest', this.$refs.ruleForm)
        // this.$refs.ruleForm.resetFields()
        // this.$refs.ruleForm1.resetFields();
      },
      submitForm(formName) {
        // this.$router.push({ path: '/create-project/index' })
        this.$refs.formName.validate(valid => {
          // console.log('rule', this.ruleForm)
          if (valid) {
            this.countDown = false
            this.loading = true
            // this.isDisabled = true
            // let init = this.ruleForm
            // let data = qs.stringify(init) //测试不用
            updatePassword(data).then((res) =>{
              // 重新获取一遍用户数据
              let data = res.code
              if(data.code === 'ok'){
                this.loading = false
              }else{
                this.loading = false
              }
            }).catch(() =>{
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
<style scoped lang="stylus">
@import "~common/stylus/modal"
</style>