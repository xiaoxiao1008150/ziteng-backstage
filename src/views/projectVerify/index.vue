<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>活动审核</span></div>
    <div class="verify-content">
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="待审核" name="first">
          <el-table fit highlight-current-row 
          v-loading.body="listLoading" element-loading-text="拼命加载中"
          :data="vertifyData" style="width: 100%">
              <el-table-column align="center"
                v-for="{ prop, label, width } in colConfigs"
                :key="prop"
                :prop="prop"
                :width="width"
                :label="label">
              </el-table-column>
              <el-table-column label="操作" align="center" width="270">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="openPass"
                    >通过</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="openReject"
                    >拒绝</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="openDialog">预览</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户列表" name="second">
          <el-table fit highlight-current-row :data="vertifyData" style="width: 100%">
            <el-table-column align="center"
                v-for="{ prop, label, width } in colConfigs"
                :key="prop"
                :prop="prop"
                :width="width"
                :label="label">
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
              <el-table-column label="操作" align="center" width="270">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    >暂停</el-button>
                  <el-button
                    size="mini"
                    >开始</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="openDialog">预览</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
     <zi-dialog
      :hasCreated="hasCreated"
      v-if="showModal"
      @close="showModal = false" 
      >
      </zi-dialog>
      <modal v-if="pass">
       <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定通过吗？</div>
        <div>
           <el-button @click="close">取消</el-button>
           <el-button type="primary" @click="activityPass" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
    <modal v-if="reject">
       <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定拒绝吗？</div>
        <div>
           <el-button @click="close">取消</el-button>
           <el-button type="primary" @click="activityReject" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>

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
  // import Date from 'components/Date'
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'
  import { mapGetters,mapMutations } from 'vuex'
  import { fetchActivityList,fetchActivityByStatus } from 'api/activity'


  export default {
    data () {
      return {
        colConfigs:[
          { prop: 'id', label: '发布时间',width: '180'},
          { prop: 'contract_name', label: '客户名称',width: '90' },
          { prop: 'contact_name', label: '用户名',width: '90' },
          { prop: 'mobile_number', label: '手机号' ,width: '140'},
          { prop: 'password', label: '活动名称',width: '120' },
          { prop: '', label: '活动时间',width: '90' },
        ],
        vertifyData: [
          {
              "id": "56dc9b47-c948-426b-996a-2c4d134349d8",
              "login_name": "13029499221",
              "mobile_number": "13029499221",
              "contract_name": "天津支行",
              "contact_name": "状态1",
              "status": "1",
              "password": "",
              "authorities": [
                  {
                      "authority": "AUTHORITY_DEFAULT"
                  }
              ]
          },
          {
              "id": "e1bcd774-c44e-4183-9ec8-c093ed53ac1a",
              "login_name": "13029499225",
              "mobile_number": "13029499225",
              "contract_name": "天津支行",
              "contact_name": "状态0",
              "status": "0",
              "password": "",
              "authorities": [
                  {
                      "authority": "AUTHORITY_DEFAULT"
                  }
              ]
          }
        ],
        pass:false,
        reject:false,
        activeName:'first',
        listLoading: false,
        loading: false,
        showModal:false,
        hasCreated:true,
        tabHelp: true,
        filters: [{text: '未发布',value: '未发布'}, {text: '审核中',value: '审核中'}, {text: '未开始',value: '未开始'},{text: '已激活',value: '已激活'},{text: '禁用',value: '禁用'},{text: '未通过',value: '未通过'},{text: '已结束',value: '已结束'},{text: '已关闭',value: '已关闭'}]
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
      //  fetchActivityList () {
      //   this.listLoading = true
      //   fetchActivityList().then((res) =>{
      //     let this.userList = res.list
      //       this.listLoading = false
      //   })
      // },
      //  fetchActivityByStatus () {
      //   this.listLoading = true
      //   fetchActivityByStatus().then((res) =>{
      //     let this.userList = res.list
      //       this.listLoading = false
      //   })
      // },
      //  fetchActivityByStatus1 () {
      //   fetchActivityByStatus().then((res) =>{
      //     let this.userList = res.list
              // this.loading = false
              // this.close()
              // this.tepHelp = true 启动请求客户列表时候重新拉取数据的key
      //   })
      // },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
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
      },
      filterTag(value, row) {
        return row.status === value;
      },
      tabChange (tab) {
        // tab 切换的时候不需要 每次都拉取列表，只在待审核列表处理数据的情况下，/ 第一次切换到”客户列表“ 才需要重新拉取
        // 第一次拉取客户列表
        if(this.tabHelp && tab.active && tab.name === 'second'){
          // 获取所有客户的活动列表 this.fetchActivityList()
          this.tabHelp = false
        }
      },
      activityPass () {
        // 数据处理 1. 提交处理的待审核客户操作结果:取消不处理， 确定改变状态
        //  跳转到活动列表(保留可以不跳转)
        this.loading = true
        setTimeout(()=>{
          // 重新拉取活动审核 待审核列表数据 this.fetchActivityByStatus1
          // this.fetchActivityByStatus1()
          // this.loading = false
          // this.close()
          // this.activeName = 'second'
        },1000)
      },
      activityReject () {
        this.loading = true
        setTimeout(()=>{
          this.close()
          this.loading = false
        },1000)
      },
      close () {
        this.pass = false
        this.reject = false
      },
      openPass () {
        this.pass = true
      },
      openReject () {
        this.reject = true
      },
    },
    created () {
      // 获取活动审核 待审核列表
      // this.fetchActivityByStatus()
    },
    components:{
      Modal,
      ziDialog:Dialog
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