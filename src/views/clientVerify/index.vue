<template>
  <div class="verify-container">
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
              <tr>
                <td>中国农业银行天津分行</td>
                <td>韩语太</td>
                <td>11111111111</td>
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
                      <el-select id="verity-select" v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                 </th>
                 <th>操作</th>
               </tr>
              <tr>
                <td>中国农业银行天津分行</td>
                <td>韩语太</td>
                <td>11111111111</td>
                <td><div class="time">2018-01-10 09：00：00</div><div class="time">2018-01-10 09：00：00</div></td>
                <td>正常</td>
                <td>编辑</td>
              </tr>
          </table>
        </el-tab-pane>
      </el-tabs>

    </div>
    <modal>
      <div slot="header">
        <span class="fl">请选择账号有效日期</span>
        <span class="fr" @click="close">X</span>
      </div>
      <div class="" slot="body">
        <div class="input-item">
            <span>开始日期</span> 
            <date></date>
        </div>
        <div class="input-item">
            <span>结束日期</span> 
            <date></date>
        </div>
      </div>
      <div slot="footer">
        <el-button  type="primary" class="login-btn info-btn">
          登录
        </el-button>
      </div>
    </modal>
  </div>
</template>
<script>
  import Date from 'components/Date'
  import Modal from 'components/Modal'
  export default {
    data () {
      return {
        passVerify:false,
        activeName:'first',
        options: [{
          value: '正常'
        }, {
          value: '暂停'
        }, {
          value: '已到期'
        }],
        value: ''
      }
    },
    methods:{
      passVerify () {
        console.log('passVerify')
      }
    },
    components:{
      Date,
      Modal
    }
  }
</script>
<style lang="stylus" scoped>
.verify-header
  text-align:left
  height:60px
  line-height:60px
.verify-content
  background:#fff
.verify-table
  font-size:13px
  margin:30px 5%;
  width:90%
  tr:first-child
    border-bottom:1px solid #ccc
  tr
    height:40px
  td
    padding:8px 10px
    vertical-align :middle
  .verify-aciton
    display:inline-block
    width:40px
    cursor :pointer
  .verify-aciton-pass
    color:#24b9f3
  .verify-aciton-reject
    color:red
  .time
    height:20px
</style>