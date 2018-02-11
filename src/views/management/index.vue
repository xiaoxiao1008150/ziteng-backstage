<template>
  <div class="container">
    <div class="verify-header">活动管理</div>
    <div class="verify-content" style="padding:30px 5%">
          <table class="verify-table" style="margin:0">
               <tr>
                 <th>活动名称</th>
                 <th>活动时间</th>
                 <th>
                    <el-select id="verity-select" v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </th>
                 <th>用户参与详情</th>
                 <th>操作</th>
               </tr>
              <tr>
                <td>大转盘抽奖</td>
                <td><div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div></td>
                <td>进行中</td>
                <td>查看</td>
                <td>
                  <span class="verify-aciton verify-aciton-publish">发布</span>
                  <span class="verify-aciton verify-aciton-eidt">编辑</span>
                  <span class="verify-aciton verify-aciton-preview" @click="openDialog">预览</span>
                  </td>
              </tr>
          </table>
    </div>
    <zi-dialog
      :imgUrl=num
      :title=title
      :hasCreated=hasCreated
      v-if="showModal"
      @close="showModal = false" 
      >
      </zi-dialog>
  </div>
</template>
<script>
  // import Date from 'components/Date'
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'
  export default {
    data () {
      return {
        // pass:false,
        // edit:false,
        activeName:'first',
        showModal:false,
        title:'超级大转盘',
        num:'01',
        hasCreated:true,
        options: [{value: '未发布'}, {value: '审核中'}, {value: '未通过审核'},{value: '未开始'},{value: '进行中'}],
        value: '',
      }
    },
    methods:{
      openDialog () {
        this.showModal = true
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
      // Date,
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
//   padding:30px 5%;
// .verify-table
//   font-size:13px
//   // margin:30px 5%;
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