<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <!-- <el-input style='width:340px;' placeholder="导出excel" prefix-icon="el-icon-document" v-model="filename"></el-input> -->
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出excel</el-button>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row height="450"
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
</template>

<script>
import { fetchInfoList } from 'api/activity'
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
