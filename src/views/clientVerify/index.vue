<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>客户审核</span></div>
    <div class="verify-content">
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="待审核" name="first">
          <el-table  fit highlight-current-row
             v-loading="listLoading" element-loading-text="拼命加载中"
            :data="userList" style="width: 100%">
              <el-table-column align="center" width="180"
                v-for="{ prop, label } in colConfigs"
                :key="prop"
                :prop="prop"
                :label="label">
              </el-table-column>
              <el-table-column label="操作" align="center" width="270">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="passVerify(scope.row.id, scope.row.status)"
                    >通过</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    plain
                    @click="reject(scope.row.id)"
                    >拒绝</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户列表" name="second">
          <el-table fit highlight-current-row
          v-loading="listLoading" element-loading-text="拼命加载中"
          :data="userListAll" 
          style="width: 100%">
            <el-table-column align="center" width="180"
              v-for="{ prop, label } in colConfigs"
              :key="prop"
              :prop="prop"
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
            <el-table-column label="操作" align="center" width="90">
              <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="startEdit(scope.row.id, scope.row.status,scope.row.start_time,)"
                  >编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <modal v-if="pass">
      <div slot="header">
        <span class="fl">请选择账号有效日期</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker type="date" placeholder="选择日期" 
            v-model="ruleForm.startTime" style="width: 100%;"
            :picker-options="pickerBeginDateBefore"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker type="date" placeholder="选择日期" 
            v-model="ruleForm.endTime" style="width: 100%;"
            :picker-options="pickerBeginDateAfter"
            ></el-date-picker>
          </el-form-item>
          <el-button type="primary"  class="info-btn" :loading="loading" @click="submitForm('ruleForm')">确定</el-button>
        </el-form>
      </div>
    </modal>
    <modal v-if="edit">
      <div slot="header">
        <span class="fl">编辑</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <el-form status-icon :model="ruleForm1" :rules="rules1"  ref="ruleForm1"  label-width="80px" label-position ="left">
            <el-form-item label="状态编辑" prop="status" >
              <el-select v-model="ruleForm1.status" style="width:100%" placeholder="请选择状态">
                <el-option
                  v-for="item in filters"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有效期" prop="time">
              <el-date-picker type="date"
               placeholder="选择日期" 
               v-model="ruleForm1.time"
               :picker-options="pickerBeginDateBefore" 
               style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-button type="primary"  class="info-btn" :loading="loading" @click="submitEditForm('ruleForm1')">确定</el-button>
          </el-form>
      </div>
    </modal>
    <modal v-if="dialogVisible">
       <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="confirm">确定拒绝吗？</div>
        <div>
           <el-button @click="calcelConfirm">取消</el-button>
           <el-button type="primary" @click="rejectConfirm" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  import Modal from 'components/Modal'
  import { fetchUserList, userEdit, userReject ,fetchAllUser } from 'api/user'
  import qs from 'qs'

  export default {
    data () {
      return {
        pickerBeginDateBefore:{
            disabledDate: (time) => {
              return time.getTime() < Date.now();
            }
        },
        pickerBeginDateAfter:{
            disabledDate: (time) => {
                return time.getTime() < Date.now();
            }
        },
        listLoading: false,
        colConfigs:[
          { prop: 'contract_name', label: '企业名称' },
          { prop: 'contact_name', label: '联系人' },
          { prop: 'mobile_number', label: '手机号' },
          { prop: 'start_time', label: '注册时间' },
        ],
        colConfigs1:[
          { prop: 'contract_name', label: '企业名称' },
          { prop: 'contact_name', label: '联系人' },
          { prop: 'mobile_number', label: '手机号' },
          { prop: 'id', label: '账号有效期' },
        ],
        loading:false,
        userList: [],
        userListAll: [],
        ruleForm: {
          startTime: '',
          endTime: ''
        },
        ruleForm1: {
          status: '',
          time: ''
        },
        rules: {
            startTime: [
              { required: true, message: '请输入日期', trigger: 'change' },
              // { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            endTime: [
              { required: true,message: '请输入日期', trigger: 'change' }
            ]
          },
        rules1: {
            status: [
              { required: true, message: '请编辑状态', trigger: 'change' }
              // { pattern: /^1[34578]\d{9}$/, message: '手机号码输入不正确' }
            ],
            time: [
              { required: true,message: '请输入日期', trigger: 'change' }
            ]
          },
        pass:false,
        edit:false,
        activeName:'first',
        //注意此处的value设置为数字，对应的是后台返回数据的status字段
        filters: [{text: '正常',value: '1'}, {text: '禁用',value: '2'}
        ,{text: '未通过',value: '3'}],
        value: '',
        value1:'',//这个是弹窗编辑的选择框对应的数据
        dialogVisible: false,
        tabHelp:true
      }
    },
    methods:{
      fetchUserList () {
        this.listLoading = true
        fetchUserList().then((res) =>{
          this.userList = res.data.list
          this.listLoading = false
        }).catch(()=>{
          this.listLoading = false
        })
      },
      fetchUserList1 () {
        this.loading = true
        fetchUserList().then((res) =>{
          console.log('res again', res)
          this.userList = res.data.list
          this.loading = false
          this.tepHelp = true
          this.close()
        }).catch(()=>{
          // this.loading = false
        })
      },
      fetchAllUser1 () {
        // this.loading = true
        fetchAllUser().then((res) =>{
          let result = res.data
          if(result.code==='ok'){
            this.userListAll = result.list
            // this.loading = false
          }
        }).catch(()=>{
          // this.loading = false
        })
      },
      filterTag(value, row) {
        return row.status === value;
      },
      toggleStatus (item) {
        // item返回状态 commond，请求相关数据
        console.log('te', item)
      },
      changeStatus (val) {
        let result
        switch(val)
          {
          case '1':
            result = '正常'
            break;
          case '2':
            result = '禁用'
            break;
          case '3':
            result = '未通过'
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
          fetchAllUser().then((res) =>{
            let result = res.data
            console.log('res', res)
            if(result.code==='ok'){
              this.userListAll = result.list
              this.listLoading = false
            }else{
              this.$message({
                message: '请稍后尝试',
                type: 'error',
                duration: 2* 1000
              });
              this.listLoading = false
            }
          }).catch(()=>{
            console.log('shibai')
            this.listLoading = false
          })
          this.tabHelp = false
        }
      },
      passVerify (id, status) {
        this.pass = true
        // 客户通过，待审核通过操作
        this.submitData  = {id, status}
      },
      reject (id) {
        this.dialogVisible = true
        this.currentId = id
      },
      calcelConfirm () {
        this.dialogVisible = false
      },
      rejectConfirm () {
        this.loading = true
        // 处理拒绝逻辑,处理完逻辑设置dialogVisible false
        let data = this.currentId
        userReject(data).then((res) =>{
          let data = res.data
          if(data.code === 'ok'){
            this.loading = false
            // this.dialogVisible = false
            // 重新拉取数据
            this.fetchUserList1()
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
        // setTimeout(()=>{
        //   this.loading = false
        //   this.dialogVisible = false
        // },1000)
      },
      handleClose () {
        this.dialogVisible = false
      },
      close () {
        this.pass = false
        this.edit = false
        this.dialogVisible = false
        if(this.ruleForm.startTime && this.ruleForm.endTime) {
          this.$refs.ruleForm.resetFields();
        }
        if(this.ruleForm1.status && this.ruleForm1.time){
          this.$refs.ruleForm1.resetFields();
        }
      },
      startEdit (id, status, time) {
        this.edit = true
        let startTime = new Date(time).getTime()
        // 默认的startTime是现在
        if(!time){
          startTime = Date.now()
        }
        this.submitData = {id,  startTime}
      },
      setAlert(text) {
        this.$alert(text,'提示', {
          type:'error',
          lockScroll:true,
          showConfirmButton:false
        })
      },
      validateTime () {
        let diff = this.ruleForm.startTime.getTime() - this.ruleForm.endTime.getTime()
        if(diff > 0) {
          this.setAlert('开始日期不能大于结束日期')
          return false
        }
        return true
      },
      changeData () {
        let time1= this.ruleForm.startTime.getTime()
        let time2= this.ruleForm.endTime.getTime()
        this.$set(this.submitData, 'startTime', time1)
        this.$set(this.submitData, 'expiredTime', time2)
      },
      submitEditForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            this.loading = true
            let status = this.ruleForm1.status
            let expiredTime = this.ruleForm1.time.getTime()
            this.$set(this.submitData, 'expiredTime', expiredTime)
            this.$set(this.submitData, 'status', status)
            // let data = this.submitData
            console.log('编辑=== ', this.submitData)
            let data = qs.stringify(this.submitData)
            userEdit(data).then((res) =>{
              let data = res.data
              if(data.code === 'ok') {
                // alert('数据处理成功')
                this.$refs[formName].resetFields();
                // 重新拉取列表
                this.fetchAllUser1()
                this.close()
              }else{
                this.$message({
                  error: '请稍后尝试',
                  type: 'error',
                  duration: 2* 1000
                });
              }
              this.loading = false
            }).catch((res) =>{
                this.loading = false
              })
          }else {
            console.log('error submit!!')
            this.loading = false
            return false
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          // 此处验证时间
          let timeResult = this.validateTime()
          if (valid && timeResult) {
              this.loading = true
              this.changeData();
              // 提交数据 this.submitData
              // 处理数据步骤 1. 提交对单一客户操作的结果 userEdit
              // 2. 重新拉取最新的待审核列表 fetchUserList
              let data = qs.stringify(this.submitData)
              // let data = this.submitData
              console.log('待审核通过form', this.submitData)
              console.log('待审核通过', data)
              userEdit(data).then((res) =>{
                console.log('测试res', res)
                let data = res.data
                if(data.code === 'ok') {
                  this.fetchUserList1()
                  this.$refs[formName].resetFields();
                  // 重新拉取待审核列表 此处不用table 加载图标，
                  // 开启 客户列表拉取数据 开关
                  this.tabHelp = true
                  this.close()
                }else{
                  alert('请稍后处理')
                }
                this.loading = false
              }).catch((res) =>{
                this.loading = false
              })
            //   setTimeout(()=> {
            //   this.loading = false
            //   this.$refs[formName].resetFields();
            //   this.close()
            // }, 500)
          } else {
            console.log('error submit!!')
            this.loading = false
            return false
          }
        })
      }
    },
    activated () {
      this.fetchUserList()
    },
    components:{
      Modal
    }
  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/modal"
</style>