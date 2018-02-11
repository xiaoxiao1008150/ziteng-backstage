<template>
  <div v-if="showLoading" class="el-loading-mask is-fullscreen" style="background-color: rgba(0, 0, 0, 0.7);">
    <div class="el-loading-spinner">
      <i class="el-icon-loading"></i>
      <p class="el-loading-text">{{title}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      showLoading: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '加载中...'
      }
    },
    watch: {
      showLoading (val) {
        if(val) {
          document.getElementsByTagName("body")[0].className="el-loading-parent--relative el-loading-parent--hidden"
        }else{
          document.body.removeAttribute("class","el-loading-parent--relative el-loading-parent--hidden");
        }
      }
    }
  }
</script>