<template>
<modal>
  <div slot="header">
       <span class="fl">注册</span>
        <span class="fr" @click="close">X</span>
  </div>
  <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入购买合同中的企业名称" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="联系人" prop="contact">
        <el-input v-model="ruleForm.contact" placeholder="请输入联系人" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="密码" prop="password">
        <el-input  type="password" v-model="ruleForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="请确认密码" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
        <!-- <button class="code-btn" @click="getCaptcha">发送验证码</button> -->
      </el-form-item>
       <!-- <el-form-item class="zi-btn"> -->
        <el-button type="primary" class="info-btn" @click="submitForm('ruleForm')">注册</el-button>
      <!-- </el-form-item> -->
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
      return {
        countDown:false,
        captchaValue:null,
        ruleForm: {
          name: '',
          contact: '',
          tel: '',
          password: '',
          confirmPassword: '',
          captcha: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
            // { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
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
      close () {
        this.$emit('close')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log('valid', this.$refs[formName].model)
            let data = this.$refs[formName].model
            createUser(data).then((response) => {
              // console.log('kk', response) response data是post的数据
              this.$notify({
                title: '成功',
                message: '注册成功',
                type: 'success',
                duration: 2000
              })
              this.close()//这里注意顺序
            })
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
// .skip
//   padding-bottom:20px
//   line-height:40px
//   font-size:12px
// .skip span
//   color:blue
//   cursor:pointer
</style>