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
        v-loading="listLoading" element-loading-text="拼命加载中"
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
              @click="publishTtn"
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
    </div>
    <modal v-if="isPublish">
       <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定发布吗？</div>
        <div>
           <el-button @click="close">取消</el-button>
           <el-button type="primary" @click="publish" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
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
  import { activityManageList,activityPublish } from 'api/manage_activity'

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
        filters: [{text: '未发布',value: '未发布'}, {text: '审核中',value: '审核中'}, {text: '未开始',value: '未开始'},{text: '未通过',value: '未通过'}],
        value: '',
        listLoading:false,
        loading:false,
        isPublish:false
      }
    },
    methods:{
      activityManageList () {
        this.listLoading = true
        activityManageList().then((res) =>{
          this.userList = res.data.list
          this.listLoading = false
        }).catch(()=>{
          this.listLoading = false
        })
      },
      //按钮加载的时候
      activityManageList1 () {
        fetchUserList().then((res) =>{
          this.userList = res.data.list
          this.tepHelp = true
          this.close()
        })
      },
      close(){
        this.isPublish = false
      },
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
      },
      publishTtn () {
        this.isPublish = true
      },
      publish () {
        this.loading = true
        activityPublish().then((res) =>{
          let data = res.data
          if(data.code === 'ok') {
            // 重新拉取待审核列表 此处不用table 加载图标，
            this.activityManageList1()
            this.close()
          }else{
            this.$message({
              message: '请稍后尝试',
              type: 'error',
              duration: 2* 1000
            });
          }
          this.loading = false
        }).catch(()=>{
          this.loading = false
        })
      },
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
    created () {
      console.log('是否执行')
      // 获取活动审核 待审核列表
      // this.activityManageList()
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
</style>