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
            :data="aciByStatus" style="width: 100%">
                <el-table-column align="center"
                  v-for="{ prop, label, width } in colConfigs"
                  :key="prop"
                  :prop="prop"
                  :width="width"
                  :label="label">
                </el-table-column>
                <el-table-column
                  label="活动时间"
                  align="center"
                  width="180">
                   <template slot-scope="scope">
                    <p >{{ scope.row.startTime }}</p>
                    <p >{{ scope.row.expiredTime }}</p>
                  </template> 
                </el-table-column>
   
                <el-table-column label="操作" 
                  align="center" width="220">
                  <template slot-scope="scope">
                  <el-button
                      size="mini"
                      type="primary"
                      plain
                      @click="openChange('pass',scope.row)"
                      >通过</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      plain
                      @click="openChange('reject',scope.row)"
                      >拒绝</el-button>
                    <el-button
                      size="mini"
                      type="success"
                      plain
                      @click="openDialog(scope.row)">预览</el-button>
                  </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="活动列表" name="second">
            <el-table fit highlight-current-row
            v-loading="listLoading" element-loading-text="拼命加载中" 
            height="600"
            :data="aciList" style="width: 100%">
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
                  {{changeText(scope.row.status)}}
                </template>
                </el-table-column>
                <el-table-column label="用户参与详情" 
                  align="center" width="100">
                  <template slot-scope="scope">
                  <span
                      class="look"
                      @click="goToInfo(scope.row)"
                      :class="{active: scope.row.status==='3' || scope.row.status==='6'}"
                      >查看</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="220">
                  <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="openChange('pause',scope.row)"
                      :disabled="scope.row.status!=='3'"
                      >暂停</el-button>
                    <el-button
                      size="mini"
                      @click="openChange('start',scope.row)"
                      :disabled="scope.row.status!=='2'"
                      >开始</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="openDialog(scope.row)">预览</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
     <zi-dialog
      :hasCreated="hasCreated"
      :currentActivity="currentActivity"
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
             <el-button type="primary" @click="changeStatus('pass')" :loading="loading">确定</el-button>
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
           <el-button type="primary" @click="changeStatus('reject')" :loading="loading">确定</el-button>
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
           <el-button type="primary" @click="changeStatus('pause')" :loading="loading">确定</el-button>
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
           <el-button type="primary" @click="changeStatus('start')" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  import Modal from 'components/Modal'
  import Dialog from 'components/Dialog'
  import { mapGetters,mapMutations } from 'vuex'
  import { fetchVerfityList,fetchActivityListAll, changeStatus} from 'api/manage_activity'
  import qs from 'qs'


  export default {
    data () {
      return {
        colConfigs:[
          { prop: 'publishTime', label: '发布时间',width: '180'},
          { prop: 'customer', label: '客户名称',width: '90' },
          { prop: 'contact', label: '用户名',width: '90' },
          { prop: 'mobile', label: '手机号' ,width: '140'},
          { prop: 'activityName', label: '活动名称',width: '120' },
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
        // tabHelp: true,
        filters: [{text: '未发布',value: '0'},{text: '未开始',value: '2'},{text: '进行中',value: '3'},{text: '暂停',value: '4'},{text: '未通过',value: '5'},{text: '已结束',value: '6'}]
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
        'aciUpdateByStatus',
        'aciUpdate',
        'aciRemove'
      ]),
      fetchVerfityList () {
        this.listLoading = true
        fetchVerfityList().then((res) =>{
          console.log('e', res)
          // this.userList = res.data.list
          // 使用vuex 管理
          let result = res.data
          if(result.code ==='ok'){
            let list = result.list
            this.setAciStatusList(list)
          }
          this.listLoading = false
        }).catch(()=>{
          this.listLoading = false
        })
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      openDialog (item) {
        this.showModal = true
        console.log('pass', this.currentActivity)
        this.currentActivity  = item
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
      changeText (val) {
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
            result = '暂停'
            break;
          case '5':
            result = '未通过'
            break;
          case '6':
            result = '已结束'
            break;
          default:
            result = ''
          }
          return result
      },
      tabChange (tab) {
        // tab 切换的时候不需要 每次都拉取列表，只在待审核列表处理数据的情况下，第一次切换到”客户列表“ 才需要重新拉取
        // 第一次拉取客户列表
        if(tab.name === 'first') {
          this.$router.push({path:'/project-verify/index?tab=first'})
          this.fetchVerfityList()
        }else if(tab.name === 'second') {
          this.$router.push({path:'/project-verify/index?tab=second'})
          this.listLoading = true
          fetchActivityListAll().then((res) =>{
            let result = res.data
            if(result.code==='ok'){
              let list = result.list
              this.setAciList(list)
            }
            this.listLoading = false
          }).catch(()=>{
            this.listLoading = false
          })
        }
      },
      changeStatus (flag) {
        // 数据处理 1. 提交处理的待审核客户操作结果:取消不处理， 确定改变状态
        this.loading = true
        //传递相关数据 根据 接口
        // let initData = this.currentItem
        let {id} = this.currentItem
        let status
        if(flag === 'pass') {
          status = '2'
        }else if(flag === 'reject'){
          status = '5'
        }else if(flag === 'pause'){
          status = '4'
        }else if(flag === 'start'){
          status = '3'
        }
        let obj = {id:id,status:status}
        let data = qs.stringify(obj)
        this.middleFun(flag,data)
      },
      middleFun (flag,data) {
        changeStatus(data).then((res) =>{
          let result = res.data
          if(result.code === 'ok') {
            // 重新拉取待审核列表 此处不用table 加载图标，
            // this.fetchVerfityList1()
            // 不再拉取数据， 使用vuex 管理
            let id = result.data.id
            let newObj = result.data
            if(flag === 'pass' || flag ==='reject'){
              this.aciRemove(id)
            }else{
              this.aciUpdate(newObj)
            }
            // 待审核列表去除这项数据
            // this.tabHelp = true
            this.loading = false
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
      close () {
        this.pass = false
        this.reject = false
        this.start = false
        this.pause = false
      },
      goToInfo (item) {//这里应该是带着活动的id的
        if(item.status==='3' || item.status ==='6'){
         this.$router.push({ path: `/management/info/1` })
        }
      },
      openChange(flag, item) {
        if(flag === 'pass') {
          this.pass = true
        }else if(flag === 'reject'){
          this.reject = true
        }else if(flag === 'pause'){
          this.pause = true
        }else if(flag === 'start'){
          this.start = true
        }
          this.currentItem = item
      }
    },
    activated () {
      // 获取活动审核 待审核列表
      let query = this.$route.query.tab
      let tabObj
      if(query) {
        if( query=== 'second'){
          tabObj = {active:true,name:'second'}
          this.activeName = 'second'
        }else if(query=== 'first'){
          tabObj = {active:true,name:'first'}
          this.activeName = 'first'
        }
        this.tabChange(tabObj)
      }else{
        this.fetchVerfityList()
      }
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