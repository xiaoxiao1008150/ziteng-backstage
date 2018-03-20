<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="container">
     <div class="verify-header">
      <span><i class="el-icon-arrow-left"></i></span>
      <span >活动管理</span><span id="manage">|</span><span id="info-text">用户参与详情</span></div>
      <div class="info-content">
          <div class="info-header">
            <div class="fl">
              <span>已发放奖品合计:</span>
              <span id="value">288000元</span>
            </div>
            <div class="fr">
              <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出excel</el-button>
            </div>
          </div>
          <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row height="550"
      >
            <el-table-column align="center" label='Id' width="95">
              <template slot-scope="scope">
                {{scope.$index}}
              </template>
            </el-table-column>
            <el-table-column align="center" label='用户手机号' width="95">
              <template slot-scope="scope">
                {{scope.row.tel}}
              </template>
            </el-table-column>
            <el-table-column label="中奖时间">
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column label="是否支付成功" width="110" align="center">
              <template slot-scope="scope">
                <el-tag>{{scope.row.contact}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="奖品类别" width="115" align="center">
              <template slot-scope="scope">
                {{scope.row.tel}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="奖品面额" width="220">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{scope.row.password}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="奖券费用" width="220">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{scope.row.createdAt}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="是否充值成功" width="220">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{scope.row.createdAt}}</span>
              </template>
            </el-table-column>
          </el-table>
      </div>
  </div>
</template>

<script>
import { fetchInfoList } from 'api/manage_activity'
// import { parseTime } from '@/utils'

export default {
  name: 'exportExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: ''
    }
  },
  created() {
    let id = this.$route.params.id
    this.fetchInfoList()
  },
  methods: {
    fetchInfoList() {
      this.listLoading = true
      fetchInfoList().then(response => {
        console.log('impi', response)
        this.list = response.data
        this.listLoading = false
      }).catch(()=>{
          this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '用户手机号','中奖时间', '是否支付成功', '奖品类别', '奖品面额', '奖券费用', '是否充值成功']
        const filterVal = ['id','tel', 'name', 'contact', 'password', 'createdAt', 'createdAt']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style lang="stylus" scoped>
// @import "~common/stylus/modal"
.info-content
  padding:20px
  background:#fff
.info-header
  height:45px
  line-height:45px
#manage
  margin: 0 5px
#info-text
  font-size:13px
  color:#444
#value
  color:#19adf0
</style>
