<template>
  <button class="code-btn" :countDown="countDown" :disabled="countDown">
    {{countDown ? (time+'s') : text}}
  </button>
</template>
<script>
export default {
  name:'',
  props:{
    countDown:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return{
      text:'发送验证码',
      time: 5
    }
  },
  methods:{
  },
  watch: {
    countDown: function (val) {
      if(val){
        var timer = setInterval(()=>{
          if(this.time >0){
            this.time--
            return
          }
          if(this.time===0){
            this.time = 5
            console.log('time', this.time)
            this.$emit('stop')
            clearInterval(timer)
          }
        },1000)
      }else{
        clearInterval(timer)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.code-btn
    width:90px
    height:40px
    background:#adadad
    border:none
    outline:none
    color:#fff
    border-radius:4px
    vertical-align :middle
    cursor :pointer
</style>