<template>
  <div class="zi-content">
    <el-tabs v-model="activeName" @tab-click="toggleTab">
      <el-tab-pane
      v-for="(item,index) in tabData"
      :label="item.label"
      :name="item.name"
      :key="index"
      >
        <first-tab :activeName="activeName"></first-tab>
      </el-tab-pane>
        <!-- <first-tab></first-tab>
      <el-tab-pane label="抽奖页" name="second"></el-tab-pane>
        <first-tab></first-tab>
      <el-tab-pane label="中奖页" name="third"></el-tab-pane>
        <first-tab></first-tab>
      <el-tab-pane label="未中奖" name="fourth"></el-tab-pane>
        <first-tab></first-tab>
      <el-tab-pane label="结束页" name="five"></el-tab-pane> -->
    </el-tabs>
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
import FirstTab from './firstTab'
export default {
  name: '',
  data() {
    return {
      activeName: 'second',
      tabData:tabData
    };
  },
  methods:{
    toggleTab () {
      console.log(this.activeName)
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
</style>