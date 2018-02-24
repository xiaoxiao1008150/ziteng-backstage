<template>
  <modal>
    <div slot="header">
      <span class="fl">更换联系人</span>
      <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
    </div>
    <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="ruleForm.contact" placeholder="请输入联系人" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>

        <!-- <button class="code-btn">发送验证码</butt
        on> -->
      </el-form-item>
        <el-button type="primary" class="info-btn" @click="submitForm('ruleForm')">确认</el-button>
    </el-form>
  </div>
  </modal>
</template>
<script>
  import Modal from 'components/Modal'
  import Captcha from 'components/Captcha'

   export default {
     data () {
      return {
          countDown:false,
          ruleForm: {
            tel: '',
            captcha: ''
          },
          rules: {
            contact: [
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
      close () {
        this.$emit('close')
      },
      getCaptcha () {
        this.countDown = true
        //在这里post短信验证码，data mobileNumber
        // getCaptcha(data).then((res)=>{
        //   if(res.data.code==='ok'){
        //     this.countDown = true
        //   }
        // })
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