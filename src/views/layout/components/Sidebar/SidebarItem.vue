<template>
  <div>
    <ul class="side-ui">
      <li 
        v-for="(item,index) in routes" 
        :key="index" 
        v-if="item.children && item.children.length>=1" >
        <router-link
        class="side-link"
        router-link-active
        :to="item.path+'/'+item.children[0].path" 
       >
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
        </router-link>
      </li>
    </ul>
   <!--  <el-menu
      background-color="#19adf0" 
      text-color="#fff"
      active-text-color="#fff"
      default-active
      >
      <router-link
        v-for="item in routes" 
        v-if="item.children && item.children.length>=1" 
        :to="item.path+'/'+item.children[0].path" 
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path"
        >
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </el-menu> -->
  </div>
</template>
<script>

import svgIcon from 'components/Icon'
export default {
  name: 'SidebarItem',
  data () {
    return {
      index:0,
      isActive:false
    }
  },
  props: {
    routes: {
      type: Array
    }
  },
  created () {
  },
  methods:{
  },
  components:{
    svgIcon
  }
}
</script>
<style scoped lang="stylus">
  .side-ui
    background:#19adf0
    // padding-top:10px
    li
      height:45px
      line-height:45px
  .side-link
    color:#fff
    font-size:14px
    display:block
    width:100%
    height:100%
    transition:all 1s
  .side-link:hover
    background:rgba(0,0,0,0.2)
  .router-link-active
    background:rgba(0,0,0,0.2)
  .side-link svg
      position:relative
      top:2px
    // vertical-align :middle
</style>