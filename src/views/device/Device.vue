<template>
   <div class="home-container">
    <div class="home-content">
    <el-form :inline="true" :model="dataForm" @submit.native.prevent>
      <el-form-item>
        <el-select v-model="dataForm.onlineState" clearable placeholder="是否在线" size="small">
            <el-option :value="1" label="在线"></el-option>
            <el-option :value="0" label="不在线"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
          <el-select v-model="dataForm.typeId" clearable placeholder="设备类型" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceTypeList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
         <el-select v-model="dataForm.makerId" clearable placeholder="厂商" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceMarkerList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
         <el-select v-model="dataForm.modelId" clearable placeholder="设备型号" size="small">
            <el-option :value="item.value" :label="item.label" v-for="(item, index) in deviceModelList" :key="index"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item>
        <el-input  v-model="dataForm.groupName"   placeholder="组名称" clearable size="small"></el-input>
      </el-form-item>
       <el-form-item>
        <el-input v-model="dataForm.serialNumber"  placeholder="设备号" clearable size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  size="small" type="primary" @click="currentChangeHandle(1)" @keyup.enter.native="currentChangeHandle(1)">查询</el-button>
        <el-button  size="small" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-success="handleSuccess"
          :on-error="handleError"
          multiple
          :limit="3">
          <el-button size="small" type="primary">批量上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <!-- <el-button  size="small"  type="primary"  @click="deleteHandle()">批量添加</el-button> -->
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
        prop="serialNumber"
         align="center"
        label="设备序列号">
      </el-table-column>
      <el-table-column
        prop="deviceTypeName"
         align="center"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="deviceMakerName"
         align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="deviceModelName"
         align="center"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="groupName"
         align="center"
        label="分组">
      </el-table-column>
      <el-table-column
        prop="createDate"
         align="center"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="updateDate"
         align="center"
        label="激活时间">
      </el-table-column>
      <el-table-column
        prop="onlineState"
         align="center"
        label="在线状态">
           <template slot-scope="scope">
          <el-tag v-if="scope.row.onlineState === 0" size="small" type="danger">不在线</el-tag>
          <el-tag v-else size="small">在线</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
         align="center"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="createDate"
         align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="creater"
         align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
      fixed="right"
       align="center"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button type="text" size="small">设备详情</el-button>
        <el-button @click="addOrUpdateHandle(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">上报详情</el-button>
        <el-button type="text" size="small" @click="deleteDevice(scope.row.id)">删除</el-button>
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
import request from '@/utils/request'
  import AddOrUpdate from './DeviceAdd'
  export default {
    data () {
      return {
        backgroudColor: '#EBF4FF',
        color: '#171717',
        dataForm: {
            groupName: '',
            makerId: '',
            modelId:'',
            onlineState:'',
            serialNumber:'',
            status:'',
            typeId:'',
        },
        deviceTypeList:[
  {
            label:'智能烟感',
            value:1
          },
            {
            label:'智能空气监测',
            value:2
          },
            {
            label:'智能红外',
            value:3
          },
            {
            label:'智能井盖',
            value:4
          },
        ],
        deviceMarkerList:[
        {
            label:'小米',
            value:1
          },
            {
            label:'华为',
            value:2
          },
            {
            label:'中兴',
            value:3
          },
        ],
        deviceModelList:[
          {
            label:'SM001',
            value:'SM001'
          },
            {
            label:'SM002',
            value:'SM002'
          },
            {
            label:'WE001',
            value:'WE001'
          },
            {
            label:'WE002',
            value:'WE002'
          }
        ],
        dataList: [
            {
                id: '123',
                serialNumber: '123455678',
                deviceTypeName: '烟感',
                deviceMakerName:'1',
                deviceModelName:'2',
                groupName:'1',
                createDate:'2021-09-17',
                updateDate:'2021-09-17',
                onlineState:1,
                status:'使用中',
                creater:'姚强',
                updateDate:'2021-09-17',
            },
            {
                id: '123',
                serialNumber: '123455678',
                deviceTypeName: '烟感',
                deviceMakerName:'1',
                deviceModelName:'2',
                groupName:'1',
                createDate:'2021-09-17',
                updateDate:'2021-09-17',
                onlineState:1,
                status:'使用中',
                creater:'姚强',
                updateDate:'2021-09-17',
            },

        ],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    mounted(){
      this.currentChangeHandle(1);
    },
    methods: {
      handleSuccess(){

      },
      handleError(){

      },
      deleteDevice(id){
              request.delete('http://101.34.215.29:9000/web/device',{
                params:{id:id}
              }).then(res => {
                  if(res.code === 0){
                    this.$message.success('删除成功！')
                    this.getDataList()
                  }
                })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        request.get('http://101.34.215.29:9000/web/device',{
        params:Object.assign({},this.dataForm,{pageNumber:this.pageIndex,pageSize:this.pageSize})
        }).then(res => {
                  this.dataList = res.data.list
                  this.totalPage = res.data.total
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
.upload-demo{
  display:inline-block;
  margin-left:10px;
}
</style>
