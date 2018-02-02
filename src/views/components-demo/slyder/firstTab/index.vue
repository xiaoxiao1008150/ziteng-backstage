<template>
  <div class="slyder-first">
    <!-- <tab-img :data="textarea" :activeName="activeName"></tab-img> -->
    <div class="tab-img">
      <img :src=" '/static/images/slyder-' + activeName + '.jpg' ">
      <div class="rule-content">{{textarea}}</div>
    </div>
    <div class="slyder-first-wrapper">
      <el-form status-icon :model="ruleForm" :rules="rules"  ref="ruleForm"  label-width="80px" label-position ="left">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="基础设置" name="first" class="mytag">
            <form action="" id="base-form" class="slyder-form form">
                <div class="input-item"><span>活动名称</span><el-input class="input-self" placeholder="请输入活动名称"></el-input></div>
                <div class="input-item">
                    <span>开始时间</span> 
                    <!-- <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker> -->
                    <date></date>
                </div>
                <div class="input-item">
                  <span>结束时间</span>
                  <!-- <el-date-picker
                      v-model="value2"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker> -->
                    <date></date>
                </div>
              <div class="input-item" id="rule-area">
                    <span>活动规则</span> 
                    <el-input
                      type="textarea"
                      id="textarea"
                      placeholder="请输入内容"
                      v-model="textarea">
                    </el-input>
                </div>
            </form>
          </el-tab-pane>
          <el-tab-pane label="限制条件" name="second" class="mytag">
             <form action="" class="slyder-form form">
              <div class="input-item">
                <span>手机号地域</span>
                <v-distpicker hide-area id="distpicker"></v-distpicker>
              </div>
              <div class="input-item">
                <span>手机号次数</span>
                <div class="mobile">
                  <span id="reduce">-</span>
                  <el-input class="input-self" id="input-self"></el-input>
                  <span id="plus">+</span>
                </div>
              </div>
              <div class="input-item">
                <span>验证码</span>
                <button class="code-btn">发送验证码</button>
                <span id="refresh">刷新</span>
              </div>
            </form>
          </el-tab-pane>
          <el-tab-pane label="奖项设置" name="third" class="mytag">
            <table id="six-table">
                <tr class="tr-head">
                  <th>奖品名称</th>
                  <th>奖品种类</th>
                  <th>奖品面额</th>
                  <th>奖品数量</th>
                  <th>中奖概率</th>
                  <th>奖品估算</th>
                </tr>
                <tr v-for="(item,index) in tableData.name" :key="index">
                  <td><span>{{item.level}}</span></td>
                  <td>
                    <el-select id="select-six" v-model="tableData.sort[item.svalue]"  placeholder="请选择" @change="change">
                      <el-option
                        v-for="item in tableData.type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td ><el-input class="td-six" placeholder="面额"></el-input></td>
                  <td> <el-input class="td-six" placeholder="数量"></el-input></td>
                  <td><el-input  class="td-six" placeholder="概率"></el-input></td>
                  <td><span class="estimate"></span></td>
                </tr>
                <tr>
                  <td>谢谢参与</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><el-input  class="td-six" placeholder=""></el-input></td>
                  <td><span class="estimate"></span></td>
                </tr>
                <tr>
                  <td>合计</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>100%</td>
                  <td><span class="estimate"></span></td>
                </tr>
              </table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import Date from 'components/Date'
let tableData = {
  name:[
  {svalue: 'svalue1', level:'一等奖'},
  {svalue: 'svalue2', level:'二等奖'},
  {svalue: 'svalue3', level:'三等奖'},
  {svalue: 'svalue4', level:'四等奖'},
  {svalue: 'svalue5', level:'五等奖'},
  ],
  type:[{value: '流量',}, {value: '话费'}, {value: '视频劵'}],
  sort:{svalue1: '',svalue2: '',svalue3: '',svalue4: '',svalue5: ''}
}
export default {
  name: '',
  props:{
    activeName:{
      type:String,
      dafault:''
    }
  },
  data() {
    return {
      tableData:tableData,
      activeName2: 'first',
      // value1:'',
      // value2:'',
      textarea: '',
      svalue1: '',
      svalue2: ''
    }
  },
  methods:{
    change () {
    }
  },
  computed: {
    // 计算属性的 getter
    selectBindName () {
      return 
    }
  },
  components:{
    VDistpicker,
    Date
  }
}
</script>
<style lang="stylus" scoped>
.slyder-first
  padding:20px 30px
  position:relative
  height:800px
.slyder-first-wrapper
  position :absolute
  left:350px
  top:30px
  bottom:0
.slyder-form
  text-align :center
  padding-top:20px
  .input-item
    height:40px
    // line-height:30px
    font-size :0
    margin-bottom:20px
    text-align:left
  span
    display:inline-block
    width:70px
    vertical-align :middle
    text-align:justify
    font-size :12px
  .input-self
    width:80px
    height:30px !important
    vertical-align :middle
  .input-self.code
    width:150px
    margin-right:20px
  .code-btn
    width:110px
    height:30px
    background:#adadad
    border:none
    outline:none
    color:#fff
    border-radius:4px
    vertical-align :middle
    margin-right:5px
  #distpicker
    display:inline-block
    height:30px
    vertical-align :middle
  .mobile
    display:inline-block
    border:1px solid #ccc
  .mobile span,.mobile input
    width:30px
    text-align :center
  #reduce
    border-right:1px solid #ccc
  #plus
    border-left:1px solid #ccc
  #refresh
    text-decoration:underline
    color:#08c0ed
#base-form
  .input-self
    width:250px
#rule-area
  height:300px
  span
    vertical-align:top
#six-table tr
  height:40px
  line-height:40px
  font-size:14px
  td
    padding: 8px
.tr-head
  color:#13b9f4
.estimate
  display:inline-block
  width:80px
  height:30px
  line-height:30px
  background:#ccc
  position:relative
  top:10px
.tab-img
  position:absolute
  top:30px
  // width:375px
  // height:756px
  bottom:0
  img
    width:250px
  .rule-content
    position :absolute
    background:rgba(0,0,0,0.5)
    top: 366px;
    width: 190px;
    margin-left: 30px;
    height:70px
    color:#fff
    text-align:left
    font-size:12px
    overflow:auto
</style>