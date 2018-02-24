<template>
<modal>
  <div slot="header">
       <span class="fl">忘记密码</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
  </div>
  <div class="" slot="body" v-if="showInfo">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
       <el-form-item label="联系人" prop="contact">
        <el-input v-model="ruleForm.contact" placeholder="请输入联系人" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码" auto-complete="off"></el-input>
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
        <!-- <button class="code-btn">发送验证码</button> -->
      </el-form-item>
      <!--  <el-form-item label="验证码">
        <el-input v-model="form.captcha" placeholder="请确认验证码"></el-input>
        <button class="code-btn">发送验证码</button>
      </el-form-item> -->
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
<!--   <div slot="footer" class="next">
    <el-button  class="info-btn" type="primary"  @click="goToConfirmPassword">
        下一步
      </el-button>
  </div> -->
</modal>
</template>
<script>
  // import formBase from './formBase'
  import Modal from 'components/Modal'
  import  Captcha from 'components/Captcha'

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
        countDown:false,
        showInfo:true,
        // showPassword:false
          ruleForm: {
            tel: '',
            contact: '',
            captcha: '',
          },
          ruleForm1: {
            password: '',
            confirmPassword: '',
          },
          rules: {
            contact: [
              { required: true, message: '请输入联系人', trigger: 'blur' },
            ],
            tel: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            captcha: [
              { required: true, message: '请输入验证码', trigger: 'blur' },
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
      goToConfirmPassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.showInfo) {
              this.showInfo = false
              this.$refs[formName].resetFields();
            }
            // console.log('valid', this.$refs[formName].model)
            // let data = this.$refs[formName].model
            // createUser(data).then((response) => {
            //   // console.log('kk', response) response data是post的数据
            //   this.$notify({
            //     title: '成功',
            //     message: '注册成功',
            //     type: 'success',
            //     duration: 2000
            //   })
            //   this.close()//这里注意顺序
            // })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
     Modal,
     Captcha
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