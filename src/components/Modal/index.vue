<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="styleObject1">
          <div class="modal-header" :style="styleObject">
            <slot name="header">
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      styleObject1:{
        type: Object,
          default () {
            return {
              height:'',
          }
        }
      },
      styleObject:{
        type: Object,
          default () {
            return {
              background:'#f5f5f5',
              height:'45px',
              lineHeight:'45px'
          }
        }
      }
    },
    data () {
      return {
      //   styleObject:{
      //     background:'#f5f5f5',
      //     height:'50px',
      //     lineHeight:'50px'
      //   }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .modal-mask {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position:relative
}
.modal-header
  // height:50px
  // line-height:50px
  // background:#ccc
  padding:0 15px
.modal-body
  padding:15px 30px 30px
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>