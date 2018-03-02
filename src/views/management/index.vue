<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>活动管理</span>
    </div>
    <div class="verify-content" style="padding:30px 5%">
      <el-table
        fit highlight-current-row
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="活动名称"
          prop="name"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          label="活动时间"
          align="center"
          prop="time"
          width="180">
        </el-table-column>
        <el-table-column
          label="全部状态"
          prop="status"
          align="center"
          width="180"
          :filters="filters"
          :filter-method="filterTag"
        >
        </el-table-column>
        <el-table-column
          label="用户参与详情"
          align="center" 
          width="130">
          <template slot-scope="scope">
            <span @click="goToInfo" class="look">查看</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="270">
          <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              plain
              >发布</el-button>
            <el-button
              size="mini"
              >编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              plain
              @click="openDialog">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
          <!-- <table class="verify-table" style="margin:0">
               <tr>
                 <th>活动名称</th>
                 <th>活动时间</th>
                 <th>
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      全部状态<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item,index) in options"
                        :key="index"
                        :command="item.value">{{item.value}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
                <td @click="goToInfo" class="verify-aciton">查看</td>
                <td>
                  <span class="verify-aciton verify-aciton-publish">发布</span>
                  <span class="verify-aciton verify-aciton-eidt">编辑</span>
                  <span class="verify-aciton verify-aciton-preview" @click="openDialog">预览</span>
                  </td>
              </tr>
          </table> -->
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
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'

  export default {
    data () {
      return {
        tableData: [{
          name: '大转盘抽奖',
          time: '2018-01-10 09：00：00',
          status: '未发布'
        },{
          name: '大转盘抽奖2',
          time: '2018-01-10 09：00：00',
          status: '审核中'
        }],
        activeName:'first',
        showModal:false,
        title:'超级大转盘',
        num:'01',
        hasCreated:true,
        filters: [{text: '未发布',value: '未发布'}, {text: '审核中',value: '审核中'}, {text: '未开始',value: '未开始'},{text: '已激活',value: '已激活'},{text: '禁用',value: '禁用'},{text: '未通过',value: '未通过'},{text: '已结束',value: '已结束'},{text: '已关闭',value: '已关闭'}],
        value: '',
      }
    },
    methods:{
      openDialog () {
        this.showModal = true
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      goToInfo () {//这里应该是带着活动的id的
        this.$router.push({ path: `/management/info/1` })
      },
      filterTag(value, row) {
        return row.status === value;
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
      ziDialog:Dialog,
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
// @import "~common/stylus/table"

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