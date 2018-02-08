<template>
  <div>
    <el-menu
      background-color="#19adf0" 
      text-color="#fff"
      active-text-color="#fff"
      @select="select"
      >
      <router-link
        :style="{ background: activeBackground}"
        @click="setBackground(index)" 
        v-for="item in routes" 
        v-if="item.children && item.children.length>=1" 
        :to="item.path+'/'+item.children[0].path" 
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>
<script>

import svgIcon from 'components/Icon'
export default {
  name: 'SidebarItem',
  data () {
    return {
      index:0,
      activeBackground:'#19adf0'
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
    setBackground () {
      this.index = index
    }
  },
  components:{
    svgIcon
  }
}
</script>