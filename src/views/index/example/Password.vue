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
      <el-form-item class="import-btn">
        <el-button type="primary"  class="info-btn" @click="goToConfirmPassword('ruleForm')">下一步</el-button>
      </el-form-item>
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
        <el-button type="primary" class="info-btn" :loading="loading" @click="submitForm('ruleForm1')">完成</el-button>
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
  import {getCaptchaForget} from 'api/login'

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
        this.$refs.ruleForm.validateField('tel' ,message => {
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
        showInfo:true,
        flag:true,
        loading:false,
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
              { required: true, validator: validatePass3, trigger: 'blur' },
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
          if(message === '请输入验证码'){
            if(this.flag){
              this.flag = false
              this.countDown = true
              //在这里post短信验证码，data mobileNumber
              let data = this.ruleForm.tel

              getCaptchaForget(data).then((res)=>{
                if(res.data && res.data.code==='ok'){
                  // 证实后台已经发送验证码 开始倒计时
                  this.countDown = true
                }else{
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
                // this.$store.dispatch('SignUp')
                // this.$notify({
                //   title: '成功',
                //   message: '注册成功',
                //   type: 'success',
                //   duration: 2000
                // })
                this.close()//这里注意顺序
                // 跳转到创建活动页面
                // 发出事件， 注册成功
                this.$emit('signUpSuccess')
              }
              else if(message==='验证码错误'){
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
</style>