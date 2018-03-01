<template>
  <div class="container">
    <div class="verify-header">
    <span><i class="el-icon-arrow-left
"></i></span>
    <span>客户审核</span></div>
    <div class="verify-content">
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="待审核" name="first">
           <el-table fit highlight-current-row
             v-loading.body="listLoading" element-loading-text="拼命加载中"
            :data="vertifyData" style="width: 100%">
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
            <el-table fit highlight-current-row :data="vertifyData" style="width: 100%">
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
            </el-table-column>
            <el-table-column label="操作" align="center" width="90">
              <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="primary"
                  plain
                  @click="startEdit"
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
             format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker type="date" placeholder="选择日期" 
            v-model="ruleForm.endTime" style="width: 100%;"
            :picker-options="pickerBeginDateAfter"
             format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
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
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.time" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-button type="primary"  class="info-btn" :loading="loading" @click="submitForm('ruleForm1')">确定</el-button>
          </el-form>
      </div>
    </modal>
    <modal v-if="dialogVisible">
       <div slot="header">
        <span class="fl">提示</span>
        <span class="fr cursor" @click="close"><i class="el-icon-close"></i></span>
      </div>
      <div slot="body">
        <div class="reject">确定拒绝吗？</div>
        <div>
           <el-button @click="calcelConfirm">取消</el-button>
           <el-button type="primary" @click="rejectConfirm" :loading="loading">确定</el-button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  // import Date from 'components/Date'
  import Modal from 'components/Modal'
  import { fetchUserList, userEdit, userReject ,fetchAllUser } from 'api/user'

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
          { prop: 'id', label: '注册时间' },
        ],
        colConfigs1:[
          { prop: 'contract_name', label: '企业名称' },
          { prop: 'contact_name', label: '联系人' },
          { prop: 'mobile_number', label: '手机号' },
          { prop: 'id', label: '账号有效期' },
        ],
        loading:false,
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
        filters: [{text: '正常',value: '1'}, {text: '禁用',value: '禁用'}, {text: '审核中',value: '0'},{text: '未通过',value: '未通过'},{text: '已删除',value: '已删除'}],
        value: '',
        value1:'',//这个是弹窗编辑的选择框对应的数据
        dialogVisible: false,
        tabHelp:true
      }
    },
    methods:{
      // fetchUserList () {
        // this.listLoading = true
      //   fetchUserList().then((res) =>{
      //     let this.userList = res.list
            // this.listLoading = false
      //   })
      // },
      // fetchUserList1 () {
      //   fetchUserList().then((res) =>{
      //     let this.userList = res.list
            // this.loading = false
            //  this.tepHelp = true
            // this.close()
      //   })
      // },
      // fetchAllUser () {
        // this.listLoading = true
      //   fetchAllUser().then((res) =>{
      //     let this.userList = res.list
            // this.listLoading = false
      //   })
      // },
      filterTag(value, row) {
        return row.status === value;
      },
      toggleStatus (item) {
        // item返回状态 commond，请求相关数据
        console.log('te', item)
      },
      tabChange (tab) {
        // tab 切换的时候不需要 每次都拉取列表，只在待审核列表处理数据的情况下，第一次切换到”客户列表“ 才需要重新拉取
        // 第一次拉取客户列表
        if(this. tabHelp && tab.active && tab.name === 'second'){
          // this.fetchAllUser
          this.tabHelp = false
        }
      },
      passVerify (id, status) {
        this.pass = true
        console.log('id', id)
        // 客户通过，待审核通过操作
        this.submitData  = {id, status}
      },
      reject (id) {
        this.dialogVisible = true
      },
      calcelConfirm () {
        console.log('cancle')
        this.dialogVisible = false
      },
      rejectConfirm () {
        this.loading = true
        // 处理拒绝逻辑,处理完逻辑设置dialogVisible false
        // userReject().then((res) =>{

        // }
        setTimeout(()=>{
          this.loading = false
          this.dialogVisible = false
        },1000)
      },
      handleClose () {
        this.dialogVisible = false
      },
      close () {
        this.pass = false
        this.edit = false
        this.dialogVisible = false
      },
      startEdit () {
        this.edit = true
      },
      setAlert(text) {
        this.$alert(text,'提示', {
          type:'error',
          lockScroll:true,
          showConfirmButton:false
        })
      },
      validateTime () {
        let diff = new Date(this.ruleForm.startTime) - new Date(this.ruleForm.endTime)
        console.log('diff', diff)
        if(diff > 0) {
          this.setAlert('开始日期不能大于结束日期')
          return false
        }
        return true
      },
      changeData () {
        let time1= this.ruleForm.startTime + ' ' + '00:00:00'
        let time2= this.ruleForm.endTime + ' ' + '00:00:00'
        this.$set(this.submitData, startTime, time1)
        this.$set(this.submitData, expiredTime, time2)
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
              // userEdit().then((res) =>{
                  // 获取自己需要的数据
              // }）
              setTimeout(()=> {
              this.loading = false
              this.$refs[formName].resetFields();
              this.close()
            }, 500)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created () {
      // this.fetchUserList()
    },
    components:{
      // Date,
      Modal
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