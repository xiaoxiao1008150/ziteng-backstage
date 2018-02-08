<template>
  <div class="zi-content">
    <div class="zitab">
      <div class="zitab-bar" :style="{ transform:transNum}"></div>
      <div  class="zitab-item"
      v-for="(item,index) in tabData" :key="index" 
      @click="tabChange(index)"
      >{{item.label}}</div>
    </div>
    <slot><first-tab :activeName="activeName" :hasClickSave="hasClickSave"></first-tab></slot>
  </div>
</template>
<script>
let tabData = [
  {label:'首页', name:'first'},
  {label:'抽奖页', name:'second'},
  {label:'中奖页', name:'third'},
  {label:'未中奖', name:'four'},
  {label:'结束页', name:'five'},
]
import FirstTab from '../firstTab'
export default {
  name: '',
  props:{
    hasClickSave: {
      type: Boolean,
      defautl: false
    }
  },
  data() {
    return {
      activeName: 'first',
      tabData:tabData,
      index:0,
      styleObject: {
        transform: `translateX(85*${this.index}px)`
      }
    };
  },
  computed:{
    transNum () {
      return 'translateX(' + this.index * 85 + 'px)'
    }
  },
  methods:{
    tabChange (index) {
      this.index= index
      this.activeName = this.tabData[index].name
    }
  },
  components:{
    FirstTab
  }
}
</script>
<style lang="stylus" scoped>
.zi-content
  background:#fff
.zitab
  text-align:left
  position:relative
.zitab-bar
  position :absolute
  left:0
  bottom:0
  border:2px solid #409EFF
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
</style>