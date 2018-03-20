<template>
  <modal>
    <div slot="header">
      <span class="fl">更换手机号</span>
      <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
    </div>
    <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="请输入手机号码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
        <!-- <button class="code-btn">发送验证码</button> -->
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
      </el-form-item>
        <el-button type="primary" class="info-btn" @click="submitForm('ruleForm')">确认</el-button>
    </el-form>
  </div>
  </modal>
</template>
<script>
  import Modal from 'components/Modal'
  import  Captcha from 'components/Captcha'
  import {getCaptcha} from 'api/login'
  import {updateTel} from 'api/user'

   export default {
     data () {
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
          flag: true,
          loading:false,
          ruleForm: {
            tel: '',
            captcha: ''
          },
          rules: {
            tel: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            captcha: [
              { required: true,validator: validatePass3, trigger: 'blur' }
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
       this.$refs.ruleForm.validateField('captcha' ,message => {
          // 说明有错误字段
          if(message ==='请输入验证码'){
            if(this.flag){
              this.flag = false
              this.countDown = true
              //在这里post短信验证码，data mobileNumber
              let data = this.ruleForm.tel
              // let data = qs.stringify(phoneNum)
              getCaptcha(data).then((res)=>{
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
      close () {
        this.$emit('close')
      },
         submitForm(formName) {
        // this.$router.push({ path: '/create-project/index' })
        this.$refs.formName.validate(valid => {
          // console.log('rule', this.ruleForm)
          if (valid) {
            this.loading = true
            // this.isDisabled = true
            // let init = this.ruleForm
            // let data = qs.stringify(init) //测试不用
            updateTel(data).then((res) =>{
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