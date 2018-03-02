<template>
  <div class="zitab">
    <div class="zitab-bar" :style="{ transform:transNum}"></div>
    <div  class="zitab-item"
    v-for="(item,index) in tabData" :key="index" 
    :class="{ active: index===jsIndex}"
    @click="tabChange(index)"
    >
      {{item.label}}
      <div v-show="index===jsIndex">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tabData: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        // activeName: 'first',
        jsIndex:0,
        styleObject: {
          transform: `translateX(85*${this.jsIndex}px)`
        }
      };
    },
    computed:{
      transNum () {
        return 'translateX(' + this.jsIndex * 85 + 'px)'
      }
    },
    methods:{
      tabChange (index) {
        this.jsIndex= index
        // this.activeName = this.tabData[index].name
        this.$emit('tabChange', index)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.zitab
  text-align:left
  position:relative
.zitab-bar
  position :absolute
  left:0
  bottom:0
  border:1px solid #409EFF
  width:85px
  transition:0.3s all
.zitab-item
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
  width:85px
  text-align :center
  cursor :pointer
.zitab-item:hover
  color:rgb(64, 158, 255)
.zitab-item.active
  color:rgb(64, 158, 255)
</style>