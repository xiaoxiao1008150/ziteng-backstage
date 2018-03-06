<template>
  <div>
    <ul class="side-ui">
      <li 
        v-for="(item,index) in routes" 
        :key="index" 
        v-if="item.children && item.children.length>=1" >
        <router-link
        class="side-link"
        @click="setIndex(index,item)"
        :class="{ active: index===jsIndex}"
        :to="item.path+'/'+item.children[0].path"
       >
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations} from 'vuex'
import svgIcon from 'components/Icon'
export default {
  name: 'SidebarItem',
  data () {
    return {
      index:0,
      jsIndex:0
    }
  },
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'isCreate',
      'statusResult'
    ])
  },
  created () {
  },
  methods:{
    ...mapMutations([
      'getLotteryResult'
    ]),

    setIndex(index, item){
      this.jsIndex = index
    }
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
    position:relative
  .side-link:hover
    background:rgba(0,0,0,0.2)
  .router-link-active
    background:rgba(0,0,0,0.2)
  .side-link svg
      position:relative
      top:2px
  .side-link.active:after
    content:''
    position:absolute
    top:15px
    right:0
    width:0
    height:0
    border-top:7px solid transparent
    border-bottom:7px solid transparent
    border-right:7px solid #fff;
</style>