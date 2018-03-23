<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>活动管理</span>
    </div>
    <div class="verify-lay">
      <div class="verify-content" style="padding:30px 5%">
        <el-table
          fit highlight-current-row
          v-loading="listLoading" element-loading-text="拼命加载中"
          :data="manageList"
          height="600"
          style="width: 100%">
          <el-table-column
            label="活动名称"
            prop="activityName"
            align="center"
            width="180">
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
                @click="publishTtn(scope.row)"
                :disabled="scope.row.status!== '0'"
                >发布</el-button>
              <el-button
                size="mini"
                :disabled="scope.row.status!== '0'"
                @click="editLottery(scope.row)"
                >编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                plain
                @click="openDialog(scope.row)">预览</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      :hasCreated=hasCreated
      :currentActivity="currentActivity"
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
  import { mapGetters,mapMutations} from 'vuex'
  import qs from 'qs'

  export default {
    data () {
      return {
        userList: [],
        activeName:'first',
        showModal:false,
        title:'超级大转盘',
        num:'01',
        hasCreated:true,
        filters: [{text: '未发布',value: '0'}, {text: '审核中',value: '1'}, {text: '未开始',value: '2'},{text: '进行中',value: '3'},{text: '未通过',value: '5'}],
        value: '',
        listLoading:false,
        loading:false,
        isPublish:false,
        handleItem:{}
      }
    },
    computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'manageList'
      ])
    },
    methods:{
      ...mapMutations([
      'setCurrentLottery',
      'setManageList',
      'manageUpdate'
    ]),
      editLottery (item) {
        //item携带了项目的所有信息 获取id -》获取全部信息到 创建活动页面 展示该项目的全部数据
        //（根据后台接口）
        //根据携带的 templateNo获得需要跳转的路由，根据路由的query  created 函数获取数据

        let templateNo = item.templateNo
        let type
        if(templateNo==='123456'){
          type='slyder'
        }else if(templateNo==='234567'){
          type='envelope'
        }
        this.$router.push({ path: `/create-project/envelope/234567?id=${item.id}`,})
        // this.$router.push({ path: `/create-project/${type}/${templateNo}?id=${item.id}`,})
      },
      changeStatus (val) {
        let result
        switch(val)
          {
          case '0':
            result = '未发布'
            break;
          case '1':
            result = '审核中'
            break;
          case '2':
            result = '未开始'
            break;
          case '3':
            result = '进行中'
            break;
          case '5':
            result = '未通过'
            break;
          default:
            result = ''
          }
          return result
      },
      activityManageList () {
        this.listLoading = true
        activityManageList().then((res) =>{
          console.log('res', res)
          // this.userList = res.data.list
          let list = res.data.list
          this.setManageList(list)
          this.listLoading = false
        }).catch(()=>{
          this.listLoading = false
        })
      },
      //按钮加载的时候
      activityManageList1 () {
        activityManageList().then((res) =>{
          this.userList = res.data.list
          this.tepHelp = true
          this.loading = false
          this.close()
        })
      },
      close(){
        this.isPublish = false
        this.showModal = false
      },
      openDialog (item) {
        this.showModal = true
        console.log('pass', this.currentActivity)
        this.currentActivity  = item
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      goToInfo () {//这里应该是带着活动的id的
        this.$router.push({ path: `/management/info/1` })
      },
      filterTag(value, row) {
        console.log('value', value)
        console.log('row', row)
        return row.status === value;
      },
      publishTtn (item) {
        this.isPublish = true
        let id = item.id
        let status = '1'
        this.handleItem = {id,status}
      },
      publish () {
        let init = this.handleItem
        let postData = qs.stringify(init)
        this.loading = true
        activityPublish(postData).then((res) =>{
          console.log('发布',res)
          let result = res.data
          if(result.code === 'ok') {
            // 重新拉取待审核列表 此处不用table 加载图标，
            // 不再重新拉取数据 vuex 管理
            let newObj = result.data
            this.close()
            this.manageUpdate(newObj)
            // this.activityManageList1()
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
      }
    },
    activated () {
      // 获取活动审核 待审核列表
      this.activityManageList()
    },
    components:{
      Modal,
      ziDialog:Dialog,
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
</style>