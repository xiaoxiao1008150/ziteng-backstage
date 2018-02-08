<template>
  <div class="container">
    <div class="verify-header">客户审核</div>
    <div class="verify-content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待审核" name="first">
          <table class="verify-table">
               <tr>
                 <th>企业名称</th>
                 <th>联系人</th>
                 <th>手机号</th>
                 <th>注册时间</th>
                 <th>操作</th>
               </tr>
              <tr v-for="(item,index) in userList" :key="index">
                <td>{{item.contract_name}}</td>
                <td>{{item.contact_name}}</td>
                <td>{{item.mobile_number}}</td>
                <td>2018-01-10 09：00：00</td>
                <td><span class="verify-aciton verify-aciton-pass" @click="passVerify">通过</span><span class="verify-aciton verify-aciton-reject" >拒绝</span></td>
              </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="客户列表" name="second">
              <table class="verify-table">
               <tr>
                 <th>企业名称</th>
                 <th>联系人</th>
                 <th>手机号</th>
                 <th>账号有效期</th>
                 <th>
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        全部状态<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>正常</el-dropdown-item>
                        <el-dropdown-item>暂停</el-dropdown-item>
                        <el-dropdown-item>已到期</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                 </th>
                 <th>操作</th>
               </tr>
              <tr>
                <td>中国农业银行天津分行</td>
                <td>韩语太</td>
                <td>11111111111</td>
                <td><div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div></td>
                <td>正常</td>
                <td><span @click="startEdit" class="verify-aciton">编辑</span></td>
              </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <modal v-if="pass">
      <div slot="header">
        <span class="fl">请选择账号有效日期</span>
        <span class="fr" @click="close">X</span>
      </div>
      <div slot="body">
        <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-button type="primary"  class="info-btn" :loading="loading" @click="submitForm('ruleForm')">确定</el-button>
        </el-form>
      </div>
    </modal>
    <modal v-if="edit">
      <div slot="header">
        <span class="fl">编辑</span>
        <span class="fr" @click="close">X</span>
      </div>
      <div slot="body">
        <el-form status-icon :model="ruleForm1" :rules="rules1"  ref="ruleForm1"  label-width="80px" label-position ="left">
            <el-form-item label="状态编辑" prop="status" >
              <el-select v-model="ruleForm1.status" style="width:100%" placeholder="请选择状态">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
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
  </div>
</template>
<script>
  import Date from 'components/Date'
  import Modal from 'components/Modal'
  import { fetchUsers } from 'api/user'

  export default {
    data () {
      return {
        loading:false,
        userList: [
          {
              "id": "56dc9b47-c948-426b-996a-2c4d134349d8",
              "login_name": "13029499221",
              "mobile_number": "13029499221",
              "contract_name": "天津支行",
              "contact_name": "张霄峰",
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
              "contact_name": "张霄峰",
              "status": "1",
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
        options: [{value: '正常'}, {value: '暂停'}, {value: '已到期'}],
        value: '',
        value1:''//这个是弹窗编辑的选择框对应的数据
      }
    },
    methods:{
      passVerify () {
        this.pass = true
      },
      close () {
        this.pass = false
        this.edit = false
      },
      startEdit () {
        this.edit = true
      },
      fetchUsers () {
        // let data = {_status: "1,2,3"}
        // fetchUsers(data).then((res) =>{
        //   let this.userList = res.list
        // })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          // console.log('rule', this.ruleForm)
          if (valid) {
              this.loading = true
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
      this.fetchUsers()
    },
    components:{
      Date,
      Modal
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