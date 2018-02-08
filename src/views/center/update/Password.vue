<template>
  <modal>
    <div slot="header">
      <span class="fl">更换密码</span>
      <span class="fr" @click="close">X</span>
    </div>
    <div class="" slot="body" v-if="showInfo">
      <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
        <el-form-item label="手机号" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
          <button class="code-btn">发送验证码</button>
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
      return {
        showInfo:true,
        // showPassword:false
          ruleForm: {
            tel: '',
            captcha: ''
          },
          ruleForm1: {
            password: '',
            confirmPassword: '',
          },
          rules: {
            tel: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            captcha: [
              { required: true,message: '请输入验证码', trigger: 'blur' }
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
      goToConfirmPassword(formName) {
        if(this.showInfo) {
          this.showInfo = false
          this.$refs[formName].resetFields();
        }
      },
      close () {
        this.$emit('close')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    components:{
     Modal
    }
  }
</script>
<style scoped lang="stylus">
@import "~common/stylus/modal"
</style>