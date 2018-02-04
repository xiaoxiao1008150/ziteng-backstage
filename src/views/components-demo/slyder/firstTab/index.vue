<template>
  <div class="slyder-first">
    <!-- <tab-img :data="textarea" :activeName="activeName"></tab-img> -->
    <div class="tab-img">
      <!-- <img :src=" '/static/images/slyder-' + activeName + '.jpg' "> -->
      <img :src=" '/static/images/slyder-' + activeName + '.png' ">
      <pre class="rule-content" v-html="ruleForm.desc" ></pre>
      <div class="rule-area">
        <ul>
           <li id="area-first-li">
              <p><span>{{lotteryData[0] && lotteryData[0].deno}}</span></p><p class="cost">{{lotteryData[0] && lotteryData[0].sort}}</p>
          </li>
           <li id="area-two-li">
              <p><span>{{lotteryData[1] && lotteryData[1].deno}}</span></p><p class="cost">{{lotteryData[1] && lotteryData[1].sort}}</p>
           </li>
           <li id="area-three-li">
              <p><span>{{lotteryData[2] && lotteryData[2].deno}}</span></p><p class="cost">{{lotteryData[2] && lotteryData[2].sort}}</p>
           </li>
          <li id="area-four-li">
             <p><span>{{lotteryData[3] && lotteryData[3].deno}}</span></p><p class="cost">{{lotteryData[3] && lotteryData[3].sort}}</p>
          </li>
           <li id="area-five-li">
              <p><span>{{lotteryData[4] && lotteryData[4].deno}}</span></p><p class="cost">{{lotteryData[4] && lotteryData[4].sort}}</p>
           </li>
           <li id="area-six-li">
              <p><span>{{lotteryData[5] && lotteryData[5].deno}}</span></p><p class="cost">{{lotteryData[5] && lotteryData[5].sort}}</p>
           </li>
        </ul>
      </div>
    </div>
    <div class="slyder-first-wrapper">
      <el-form  :model="ruleForm"  ref="ruleForm"  label-width="80px" label-position ="left">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="基础设置" name="first" class="mytag">
            <!-- <form action="" id="base-form" class="slyder-form form"> -->
                <el-form-item label="活动名称">
                 <el-input v-model="ruleForm.name" placeholder="请输入活动名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动规则">
                  <!-- <markdown-editor
                  v-model="content"
                  :configs="configs"></markdown-editor> -->
                  <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="限制条件" name="second" class="mytag">
             <!-- <form action="" class="slyder-form form"> -->
              <div class="input-item">
                <span>手机号地域</span>
                <v-distpicker hide-area id="distpicker"></v-distpicker>
              </div>
              <div class="input-item">
                <span>手机号次数</span>
                <div class="mobile">
                  <span id="reduce">-</span>
                  <input class="input-self" v-model="ruleForm.num" id="input-self"></input>
                  <span id="plus">+</span>
                </div>
              </div>
              <div class="input-item">
                <span>验证码</span>
                <button class="code-btn">发送验证码</button>
                <span id="refresh">刷新</span>
                <el-button type="primary" class="info-btn" @click="submitForm('ruleForm')">测试按钮提交</el-button>

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
                  <td class="spc-width-select"><span>{{item.level}}</span></td>
                  <td class="spc-width-select" @click="setPosition(index)">
                    <el-select  v-model="tableData.sort[item.svalue]"  placeholder="请选择" @change="change">
                      <el-option
                        v-for="item in tableData.type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                      </el-option>
                    </el-select>
                  </td>
                  <td class="spc-width">
                  <el-select  v-model="tableData.deno[item.dvalue]"  placeholder="请选择" @change="change1">
                    <el-option
                        v-for="item1 in tableData.denomination[currentSelectOption]"
                        :key="item1.value"
                        :label="item1.label"
                        :value="item1.value"
                        >
                      </el-option>
                    </el-select>
                  </td>
                  <td class="spc-width"> <el-input class="td-six" placeholder="数量"></el-input></td>
                  <td class="spc-width"><el-input  class="td-six" placeholder="概率"></el-input></td>
                  <td class="spc-width"><span class="estimate"></span></td>
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
import VDistpicker from 'v-distpicker'//城市选择
import Date from 'components/Date'

let tableData = {
  name:[
  {svalue: 'svalue1', dvalue: 'dvalue1',level:'一等奖'},
  {svalue: 'svalue2', dvalue: 'dvalue2',level:'二等奖'},
  {svalue: 'svalue3', dvalue: 'dvalue3',level:'三等奖'},
  {svalue: 'svalue4', dvalue: 'dvalue4',level:'四等奖'},
  {svalue: 'svalue5', dvalue: 'dvalue5',level:'五等奖'},
  ],
  type:[{value: '流量'}, {value: '话费'}, {value: '视频券'}],
  denomination:{
    '视频券': [{value: '200元'},{value: '180元'},{value: '100元'}],
    '话费': [{value: '10元'},{value: '2元'},{value: '1元'}],
    '流量': [{value: '10M'},{value: '2M'},{value: '1M'}]
  },
  sort:{svalue1: '',svalue2: '',svalue3: '',svalue4: '',svalue5: ''},
  deno:{dvalue1: '',dvalue2: '',dvalue3: '',dvalue4: '',dvalue5: ''}
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
      ruleForm: {
          name: '',
          startTime: '',
          endTime: '',
          desc:''
      },
      tableData:tableData,
      activeName2: 'third',
      // value1:'',
      // value2:'',
      textarea: '',
      // svalue1: '',
      // svalue2: '',
      currentSelectOption: '话费',
      lotteryData:[],
      position:0//默认从一等奖开始选择
    }
  },
  methods:{
    change (value) {
      console.log('value',value)
      this.currentSelectOption = value
      //在这里处理奖盘 种类
      this.sort = value
    },
    change1 (value) {
      // 这里确定奖品的面额
      this.deno = value
      this.lotteryData[this.position] = {sort:this.sort,deno:this.deno}
      if(this.position===4){
        this.position++
        this.sort='参与'
        this.deno='谢谢'
      }
      this.lotteryData[this.position] = {sort:this.sort,deno:this.deno}
    },
    setPosition (index) {
      // 确定是几等奖
      this.position = index
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            // 在这里post数据
            let data = this.$refs[formName].model
            console.log('test',data)

          }
        });
    }
  },
  components:{
    VDistpicker,
    Date,
    // markdownEditor
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
  // line-height:40px
  font-size :0
  margin-bottom:20px
  text-align:left
  span
    display:inline-block
    width:70px
    vertical-align :middle
    text-align:justify
    font-size :12px
    height:40px
    line-height:40px
.input-self
  font-size:14px
  color:#606266
  width:80px
  -webkit-appearance: none;
  // -webkit-box-sizing: border-box;
  // box-sizing: border-box;
  color: #606266;
  display: inline-block;
  vertical-align:middle
  height: 39px;
  line-height: 39px;
  // outline: 0;
  padding: 0 15px;
  border:1px solid #ccc
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
.input-self:focus
  border-color: #409EFF;
  outline: 0;
.code-btn
  width:110px
  height:30px
  background:#adadad
  border:none
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
  // -webkit-box-sizing: border-box;
  // box-sizing: border-box;
  // border:1px solid #ccc
  height:40px
.mobile span
  width:30px
  text-align :center
  height: 39px
  line-height:39px
#reduce
  float:left
  border-top:1px solid #ccc
  border-left:1px solid #ccc
  border-bottom:1px solid #ccc
#plus
  float:right
  border-top:1px solid #ccc
  border-right:1px solid #ccc
  border-bottom:1px solid #ccc
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
  td.spc-width
    min-width:80px
  td.spc-width-select
    min-width:100px
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
    height:510px
  .rule-content
    position :absolute
    background:rgba(0,0,0,0.5)
    padding:5px
    top: 350px;
    width: 190px;
    margin-left: 30px;
    height:90px
    color:#fff
    text-align:left
    font-size:12px
    overflow-x:hidden
    white-space: pre-wrap; /*css-3*/ 
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/ 
    white-space: -pre-wrap; /*Opera4-6*/ 
    white-space: -o-pre-wrap; /*Opera7*/ 
    word-wrap: break-word; /*InternetExplorer5.5+*/ 
  .rule-area
    position:absolute
    left:55px
    top:163px
    height:144px
    width:144px
    // background:rgba(0,0,0,0.5)
    z-index:1000
    ul li span
      font-size:16px
    // ul
    //   position: absolute;
    //   left: 0px;
    //   top: 0px;
    //   right: 0px;
    //   bottom: 0px;
    //   list-style: none;
    //   text-align: center;
    ul > li
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      padding-top: 8px;
      transform-origin: 50% 72px 0px;
      font-size: 11px;
      color: red;
      line-height:12px
    .cost
      line-height:18px
    #area-first-li
      transform: rotate(0deg);
    #area-two-li
      transform: rotate(-60deg);
    #area-three-li
      transform: rotate(-120deg);
    #area-four-li
      transform: rotate(-180deg);
    #area-five-li
      transform: rotate(-240deg);
    #area-six-li
      transform: rotate(-300deg);
</style>