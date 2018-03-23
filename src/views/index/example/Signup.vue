<template>
<modal>
  <div slot="header">
       <span class="fl">注册</span>
        <span class="fr" @click="close"><i class="el-icon-close"></i></span>
  </div>
  <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      <el-form-item label="企业名称" prop="contractName">
        <el-input v-model="ruleForm.contractName" placeholder="请输入购买合同中的企业名称" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="联系人" prop="contactName">
        <el-input v-model="ruleForm.contactName" placeholder="请输入联系人" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobileNumber">
        <el-input v-model="ruleForm.mobileNumber" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input  type="password" v-model="ruleForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="请确认密码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="验证码" prop="verifyCode">
        <el-input class="captcha" v-model="ruleForm.verifyCode" placeholder="请确认验证码"></el-input>
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
        <!-- <button class="code-btn" @click="getCaptcha">发送验证码</button> -->
      </el-form-item>
       <el-form-item class="import-btn">
        <el-button type="primary" :disabled="isDisabled" :loading="loading" class="info-btn" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
      <div class="skip">已有账号,<span href="" @click="$emit('close','login')">去登录</span></div>
  </div>
  <!-- <div slot="footer"> -->
    <!-- <el-button  class="sign-btn info-btn" type="primary">
        注册
      </el-button>
      <div class="skip">已有账号,<span href="" @click="$emit('close','login')">去登录</span></div> -->
  <!-- </div> -->
</modal>
</template>
<script>
  import Modal from 'components/Modal'
  import  Captcha from 'components/Captcha'
  import { createUser, getCaptcha } from 'api/user'
  import qs from 'qs'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confirmPassword !== '') {
            this.$refs.ruleForm.validateField('confirmPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        this.$refs.ruleForm.validateField('mobileNumber' ,message => {
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
        countDown:false,
        captchaValue:null,
        isDisabled:false,
        loading:false,
        flag:true,
        ruleForm: {
          contractName: '',
          contactName: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
          verifyCode: '',
        },
        rules: {
          contractName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          mobileNumber: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, validator: validatePass3, trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      stop (flag) {
        this.countDown = false
        this.flag = flag
      },
      getCaptcha () {
        this.$refs.ruleForm.validateField('verifyCode' ,message => {
          if(message === '请输入验证码'){
            if(this.flag){
              this.flag = false
              this.countDown = true
              //在这里post短信验证码，data mobileNumber
              let data = this.ruleForm.mobileNumber

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
      close () {
        this.$emit('close')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //  let loading = this.$loading({
            //   lock: true,
            //   text: '注册成功,跳转到登录页面',
            //   spinner: 'el-icon-loading',
            //   background: 'rgba(0, 0, 0, 0.7)'
            // });
            // setTimeout(()=> {
            //   loading.close()
            //   this.$emit('signUpSuccess')
            // },1000)
            this.countDown = false
            // console.log('valid', this.$refs[formName].model)
            this.loading = true
            // 按钮禁止，防止重复提交
            this.isDisabled = true
            let data = qs.stringify(this.ruleForm)
            // console.log('注册数据', data)
            createUser(data).then((res) => {
              console.log('regis res', res)
              let data = res.data
              let message = res.data.message
              if(data.code === 'ok') {
                this.$store.dispatch('SignUp')
                this.$notify({
                  title: '成功',
                  message: '注册成功',
                  type: 'success',
                  duration: 2000
                })
                this.close()//这里注意顺序
                // 跳转到创建活动页面
                // 发出事件， 注册成功
                this.$emit('signUpSuccess')
              }else if(message==='验证码错误'){
                this.$message({
                  message: '验证码错误',
                  type: 'error',
                  duration: 2* 1000
                });

              }else{
                this.$message({
                  message: '请稍后再试',
                  type: 'error',
                  duration: 2* 1000
                });
              }
            })
            this.isDisabled = false
            this.loading = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
.captcha input
  width:100px
</style>