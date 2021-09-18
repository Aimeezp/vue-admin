<template>
   <div class="home-container">
    <div class="home-content">
    <el-form :inline="true" :model="dataForm" @submit.native.prevent>
      <el-form-item>
        <el-select v-model="dataForm.isOnline" clearable placeholder="是否在线" size="small">
            <el-option value="yes" label="在线"></el-option>
            <el-option value="no" label="不在线"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
          <el-select v-model="dataForm.deviceType" clearable placeholder="设备类型" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceTypeList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
         <el-select v-model="dataForm.deviceMarker" clearable placeholder="厂商" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceMarkerList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
         <el-select v-model="dataForm.deviceModel" clearable placeholder="设备型号" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceModelList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
        <el-input  v-model="dataForm.deviceGrounp"   placeholder="组名称" clearable size="small"></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="dataForm.deviceNumber"  placeholder="设备号" clearable size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  size="small" type="primary" @click="currentChangeHandle(1)" @keyup.enter.native="currentChangeHandle(1)">查询</el-button>
        <el-button  size="small" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  size="small"  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      :header-cell-style="{background:backgroudColor,headFontWeight: '1000',color:color}"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
      size="mini">
       <el-table-column
        prop="id"
        width="80"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="xuliehao"
         align="center"
        label="设备序列号">
      </el-table-column>
      <el-table-column
        prop="deviceType"
         align="center"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="marker"
         align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="model"
         align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="grounp"
         align="center"
        label="分组">
      </el-table-column>
      <el-table-column
        prop="zhuceTime"
         align="center"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="jihuoTime"
         align="center"
        label="激活时间">
      </el-table-column>
      <el-table-column
        prop="onlineState"
         align="center"
        label="在线状态">
      </el-table-column>
      <el-table-column
        prop="deviceState"
         align="center"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="createdTime"
         align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="created"
         align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
      fixed="right"
       align="center"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">设备详情</el-button>
        <el-button type="text" size="small">上报详情</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
        class="fenye"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
  </div>
</template>

<script>
  import AddOrUpdate from './DeviceAdd'
  export default {
    data () {
      return {
        backgroudColor: '#EBF4FF',
        color: '#171717',
        dataForm: {
          isOnline: '',
          deviceType:'',
          deviceMarker:'',
          deviceModel:'',
          deviceGrounp:'',
          deviceNumber:'',
        },
        deviceTypeList:[
            {
                value:'smoke',
                label:'烟感'
            }
        ],
        deviceMarkerList:[
            {
                value:'smoke',
                label:'烟感'
            }
        ],
        deviceModelList:[
            {
                value:'smoke',
                label:'烟感'
            }
        ],
        dataList: [
            {
                id: '123',
                xuliehao: '123455678',
                deviceType: '烟感',
                marker:'1',
                model:'2',
                grounp:'1',
                zhuceTime:'2021-09-17',
                jihuoTime:'2021-09-17',
                onlineState:'在线',
                deviceState:'使用中',
                created:'姚强',
                createdTime:'2021-09-17',
            },
            {
                id: '123',
                xuliehao: '123455678',
                deviceType: '烟感',
                marker:'1',
                model:'2',
                grounp:'1',
                zhuceTime:'2021-09-17',
                jihuoTime:'2021-09-17',
                onlineState:'在线',
                deviceState:'使用中',
                created:'姚强',
                createdTime:'2021-09-17',
            },

        ],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.dataForm = {
        userName: ''
      }
      this.currentChangeHandle(1)
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/user/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.userName
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })

      },
      // 删除
      deleteHandle (id) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${userIds.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/delete'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped>
.home-container {
    padding: 10px;
    padding-top: 5px;
}
.home-content {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
.fenye{
    text-align: right;
    margin-top:20px;
}
</style>
