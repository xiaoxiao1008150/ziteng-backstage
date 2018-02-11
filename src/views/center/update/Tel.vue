<template>
  <modal>
    <div slot="header">
      <span class="fl">更换手机号</span>
      <span class="fr" @click="close">X</span>
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

   export default {
     data () {
      return {
          countDown:false,
          ruleForm: {
            tel: '',
            captcha: ''
          },
          rules: {
            tel: [
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              // { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            captcha: [
              { required: true,message: '请输入验证码', trigger: 'blur' }
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