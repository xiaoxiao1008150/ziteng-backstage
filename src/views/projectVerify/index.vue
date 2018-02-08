<template>
  <div class="container">
    <div class="verify-header">活动审核</div>
    <div class="verify-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待审核" name="first">
          <table class="verify-table">
               <tr>
                 <th>发布时间</th>
                 <th>客户名称</th>
                 <th>用户名</th>
                 <th>手机号</th>
                 <th>活动名称</th>
                 <th>活动时间</th>
                 <th>操作</th>
               </tr>
              <tr>
                <td>2018-01-10 09：00：00</td>
                <td>中国农业银行天津分行</td>
                <td>韩语太</td>
                <td>11111111111</td>
                <td>大转盘抽奖</td>
                <td><div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div></td>
                <td>
                  <span class="verify-aciton verify-aciton-pass" @click="openFullScreen">通过</span>
                  <span class="verify-aciton verify-aciton-reject">拒绝</span>
                  <span class="verify-aciton verify-aciton-preview" @click="openDialog">预览</span>
                  </td>
              </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="客户列表" name="second">
              <table class="verify-table">
               <tr>
                 <th>发布时间</th>
                 <th>客户名称</th>
                 <th>用户名</th>
                 <th>手机号</th>
                 <th>活动名称</th>
                 <th>活动时间</th>
                 <th>全部状态</th>
                 <!-- <th>
                      <el-select id="verity-select" v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                 </th> -->
                 <th>用户参与详情</th>
                 <th>操作</th>
               </tr>
              <tr>
                <td>2018-01-10 09：00：00</td>
                <td>中国农业银行天津分行</td>
                <td>韩语太</td>
                <td>11111111111</td>
                <td>大转盘抽奖</td>
                <td><div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div></td>
                <td>进行中</td>
                <td><span>查看</span></td>
                <td><span>暂停/开始</span><span>预览</span></td>
              </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
     <zi-dialog
      :hasCreated="hasCreated"
      v-if="showModal"
      @close="showModal = false" 
      >
      </zi-dialog>

    <!-- <zi-dialog
      :imgUrl=num
      :title=title
      :hasCreated=hasCreated
      v-if="showModal"
      @close="showModal = false" 
      >
      </zi-dialog> -->
  </div>
</template>
<script>
  import Date from 'components/Date'
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'
  import { mapGetters,mapMutations } from 'vuex'

  export default {
    data () {
      return {
        // pass:false,
        // edit:false,
        activeName:'first',
        showModal:false,
        hasCreated:true
      }
    },
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'lotteryData',
        'currentLotteryItem'
      ])
    },
    methods:{
      ...mapMutations([
        'setCurrentLottery', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      ]),
      openDialog () {
        this.showModal = true
        // 在这里获取活动名称
        // this.setCurrentLottery(item)
      },
      openFullScreen() {
        //需要在这里处理通过之后与后台交互逻辑
        const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 500);
      }
      // passVerify () {
      //   console.log('passVerify')
      //   this.pass = true
      // },
      // close () {
      //   this.pass = false
      //   this.edit = false
      // },
      // startEdit () {
      //   this.edit = true
      // }
    },
    components:{
      Date,
      Modal,
      ziDialog:Dialog
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
@import "~common/stylus/table"

// .verify-header
//   text-align:left
//   height:60px
//   line-height:60px
// .verify-content
//   background:#fff
// .verify-table
//   font-size:13px
//   margin:30px 5%;
//   width:90%
//   tr:first-child
//     border-bottom:1px solid #ccc
//   tr
//     height:40px
//   td
//     padding:8px 10px
//     vertical-align :middle
//   .verify-aciton
//     display:inline-block
//     width:40px
//     cursor :pointer
//   .verify-aciton-pass
//     color:#24b9f3
//   .verify-aciton-reject
//     color:red
//   .time
//     height:20px
// #edit-select
//   width:250px
//   vertical-align :middle
</style>