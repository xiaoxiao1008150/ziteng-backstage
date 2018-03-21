<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>活动审核</span></div>
    <div class="verify-lay" style="max-width:1100px">
      <div class="verify-content">
        <el-tabs v-model="activeName" @tab-click="tabChange">
          <el-tab-pane label="待审核" name="first">
            <el-table fit highlight-current-row 
            v-loading="listLoading" element-loading-text="拼命加载中"
            height="600"
            :data="vertifyData" style="width: 100%">
                <el-table-column align="center"
                  v-for="{ prop, label, width } in colConfigs"
                  :key="prop"
                  :prop="prop"
                  :width="width"
                  :label="label">
                </el-table-column>
                <el-table-column label="操作" 
                  fixed="right"
                  align="center" width="220">
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
          <el-tab-pane label="活动列表" name="second">
            <el-table fit highlight-current-row
            v-loading="listLoading" element-loading-text="拼命加载中" 
            height="600"
            :data="vertifyData" style="width: 100%">
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
                 <template slot-scope="scope">
                  {{changeStatus(scope.row.status)}}
                </template>
                </el-table-column>
                  
                <el-table-column label="操作" fixed="right" align="center" width="220">
                  <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="openPause"
                      >暂停</el-button>
                    <el-button
                      size="mini"
                      @click="openStart"
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
    <modal v-if="pause">
      <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定暂停吗？</div>
        <div>
           <el-button @click="close">取消</el-button>
           <el-button type="primary" @click="activityPause" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
    <modal v-if="start">
      <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定开始吗？</div>
        <div>
           <el-button @click="close">取消</el-button>
           <el-button type="primary" @click="activityStart" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  // import Date from 'components/Date'
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'
  import { mapGetters,mapMutations } from 'vuex'
  import { fetchVerfityList,fetchActivityListAll, activityPassVerfity,activityReject,activityStart,activityPause} from 'api/activity'
  import qs from 'qs'


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
        pause:false,
        start:false,
        pass:false,
        reject:false,
        activeName:'first',
        listLoading: false,
        loading: false,
        showModal:false,
        hasCreated:true,
        tabHelp: true,
        filters: [{text: '未发布',value: '0'},{text: '未开始',value: '2'},{text: '进行中',value: '3'},{text: '禁用',value: '4'},{text: '未通过',value: '5'},{text: '已结束',value: '6'},{text: '已关闭',value: '9'}]
      }
    },
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'lotteryData',
        'currentLotteryItem',
        'aciByStatus',
        'aciList'
      ])
    },
    methods:{
      ...mapMutations([
        'setCurrentLottery',
        'setAciStatusList',
        'setAciList',
        'aciUpdate'
      ]),
      fetchVerfityList () {
        this.listLoading = true
        fetchVerfityList().then((res) =>{
          // this.userList = res.data.list
          // 使用vuex 管理
          let list = res.data.list
          this.setAciStatusList(list)
          this.listLoading = false
        }).catch(()=>{
          this.listLoading = false
        })
      },
      //按钮加载的时候
      fetchVerfityList1 () {
        fetchUserList().then((res) =>{
          this.userList = res.data.list
          this.tepHelp = true
          this.close()
        })
      },
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
      changeStatus (val) {
        let result
        switch(val)
          {
          case '0':
            result = '未发布'
            break;
          case '2':
            result = '未开始'
            break;
          case '3':
            result = '进行中'
            break;
          case '4':
            result = '禁用'
            break;
          case '5':
            result = '未通过'
            break;
          case '6':
            result = '已结束'
            break;
          case '9':
            result = '已关闭'
            break;
          default:
            result = ''
          }
          return result
      },
      tabChange (tab) {
        // tab 切换的时候不需要 每次都拉取列表，只在待审核列表处理数据的情况下，第一次切换到”客户列表“ 才需要重新拉取
        // 第一次拉取客户列表
        if(this.tabHelp && tab.active && tab.name === 'second'){
          // this.fetchAllUser
          this.listLoading = true
          fetchActivityListAll().then((res) =>{
            let result = res.data
            if(result.code==='ok'){
              // this.userListAll = result.list
              // 使用vuex 管理
              let list = result.list
              this.setAciList(list)
              this.listLoading = false
            }
          }).catch(()=>{
            this.listLoading = false
          })
          this.tabHelp = false
        }
        // // tab 切换的时候不需要 每次都拉取列表，只在待审核列表处理数据的情况下，/ 第一次切换到”客户列表“ 才需要重新拉取
        // // 第一次拉取客户列表
        // if(this.tabHelp && tab.active && tab.name === 'second'){
        //   // 获取所有客户的活动列表 this.fetchActivityList()
        //   this.tabHelp = false
        // }
      },
      activityPass () {
        // 数据处理 1. 提交处理的待审核客户操作结果:取消不处理， 确定改变状态
        this.loading = true
        //传递相关数据 根据 接口
        let data = qs.stringify()
        activityPassVerfity(data).then((res) =>{
          let result = res.data
          if(data.code === 'ok') {
            // 重新拉取待审核列表 此处不用table 加载图标，
            // this.fetchVerfityList1()
            // 不再拉取数据， 使用vuex 管理
            let id = result.data.id
            this.aciRemove(id)
            // 待审核列表去除这项数据
            this.tabHelp = true
            this.close()
          }else{
            this.$message({
              message: '请稍后尝试',
              type: 'error',
              duration: 2* 1000
            });
          }
          this.loading = false
        }).catch((res) =>{
          this.loading = false
        })
      },
      activityReject () {
        this.loading = true
        // 处理拒绝逻辑 data 根据接口传数据
        let data = this.currentId
        activityReject(data).then((res) =>{
          let result = res.data
          if(result.code === 'ok'){
            this.loading = false
            // this.dialogVisible = false
            // 重新拉取数据
            // this.fetchVerfityList1()
             // 不再拉取数据， 使用vuex 管理
            let newObj = result.data
            this.aciUpdate(newObj)
            this.tabHelp = true
            this.close()
          }else{
            this.$message({
              message: '请稍后尝试',
              type: 'error',
              duration: 2* 1000
            });
          }
        }).catch(()=>{
          console.log('kkk')
          this.loading = false
          // this.dialogVisible = false
          this.close()
        })
      },
      activityPause(){
        this.loading = true
        // 处理拒绝逻辑 data 根据接口传数据
        let data = this.currentId
        activityPause(data).then((res) =>{
          let data = res.data
          if(data.code === 'ok'){
            this.loading = false
            // this.dialogVisible = false
            // // 重新拉取数据
            // this.fetchVerfityList1()
             // 不再拉取数据， 使用vuex 管理
            let id = result.data.id
            this.aciUpdate(id)
            // this.tabHelp = true
            this.close()
          }else{
            this.$message({
              message: '请稍后尝试',
              type: 'error',
              duration: 2* 1000
            });
          }
        }).catch(()=>{
          console.log('kkk')
          this.loading = false
          // this.dialogVisible = false
          this.close()
        })
      },
      activityStart(){
        this.loading = true
        // 处理拒绝逻辑 data 根据接口传数据
        let data = this.currentId
        activityStart(data).then((res) =>{
          let data = res.data
          if(data.code === 'ok'){
            this.loading = false
            // this.dialogVisible = false
            // // 重新拉取数据
            // this.fetchVerfityList1()
             // 不再拉取数据， 使用vuex 管理
            let id = result.data.id
            this.aciUpdate(id)
            // this.tabHelp = true
            this.close()
          }else{
            this.$message({
              message: '请稍后尝试',
              type: 'error',
              duration: 2* 1000
            });
          }
        }).catch(()=>{
          console.log('kkk')
          this.loading = false
          // this.dialogVisible = false
          this.close()
        })
      },
      close () {
        this.pass = false
        this.reject = false
        this.start = false
        this.pause = false
      },
      openPause(){
        this.pause = true
      },
      openStart(){
        this.start = true
      },
      openPass () {
        this.pass = true
      },
      openReject () {
        this.reject = true
      },
    },
    activated () {
      // 获取活动审核 待审核列表
      this.fetchVerfityList()
    },
    components:{
      Modal,
      ziDialog:Dialog
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
</style>