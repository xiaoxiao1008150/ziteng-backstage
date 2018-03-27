<template>
  <modal>
    <div slot="header">
      <span class="fl">更换联系人</span>
      <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
    </div>
    <div class="" slot="body">
    <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入新的联系人" auto-complete="off"></el-input>
      </el-form-item>
  <!--     <el-form-item label="联系人" prop="tel" id="contract">
        <span>{{tel}}</span>
      </el-form-item> -->
<!--       <el-form-item label="验证码" prop="captcha">
        <el-input class="captcha" v-model="ruleForm.captcha" placeholder="请确认验证码"></el-input>
        <captcha @click.native="getCaptcha" :countDown="countDown" @stop="stop"></captcha>
      </el-form-item> -->
        <el-button type="primary" class="info-btn" :loading="loading" @click="submitForm">确认</el-button>
    </el-form>
  </div>
  </modal>
</template>
<script>
  import Modal from 'components/Modal'
  import Captcha from 'components/Captcha'
  // import {getCaptcha} from 'api/login'
  import {updateContact} from 'api/user'

   export default {
    // props:{
    //  tel:{
    //     type:String,
    //     default:''
    //   }
    // },
     data () {
      return {
          // countDown:false,
          flag:true,
          loading:false,
          ruleForm: {
            name: '',
            captcha: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入新的联系人', trigger: 'blur' }
              ],
            captcha: [
              { required: true,message: '请输入验证码', trigger: 'blur' }
            ]
          }
      }
    },
    methods:{
      stop (flag) {
        // this.countDown = false
        this.flag = flag
      },
      close () {
        this.$emit('close')
        // this.countDown = false
        this.$refs.ruleForm.resetFields();
      },
      // getCaptcha () {
      //   console.log('flag', this.flag)
      //       if(this.flag){
      //         this.flag = false
      //         this.countDown = true
      //         //在这里post短信验证码，data mobileNumber
      //         let data = this.ruleForm.tel
      //         getCaptcha(data).then((res)=>{
      //           if(res.data && res.data.code==='ok'){
      //             // 证实后台已经发送验证码 开始倒计时
      //             this.countDown = true
      //           }else{
      //             this.countDown = false
      //             this.$message({
      //               message: '请稍后尝试',
      //               type: 'error',
      //               duration: 2* 1000
      //             });
      //           }
      //         })
      //       }
      //   // this.$refs.ruleForm.validateField('captcha' ,message => {
      //   //   // 说明有错误字段
      //   //   if(message ==='请输入验证码'){
      //   //     if(this.flag){
      //   //       this.flag = false
      //   //       this.countDown = true
      //   //       //在这里post短信验证码，data mobileNumber
      //   //       let data = this.ruleForm.tel
      //   //       getCaptcha(data).then((res)=>{
      //   //         if(res.data && res.data.code==='ok'){
      //   //           // 证实后台已经发送验证码 开始倒计时
      //   //           this.countDown = true
      //   //         }else{
      //   //           this.countDown = false
      //   //           this.$message({
      //   //             message: '请稍后尝试',
      //   //             type: 'error',
      //   //             duration: 2* 1000
      //   //           });
      //   //         }
      //   //       })
      //   //     }
      //   //   }
      //   // })
      // },
      submitForm(formName) {
        // this.$router.push({ path: '/create-project/index' })
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            // this.countDown = false
            this.loading = true
            // this.isDisabled = true
            let init = this.ruleForm
            let data = qs.stringify(init) //测试不用
            updateContact(data).then((res) =>{
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