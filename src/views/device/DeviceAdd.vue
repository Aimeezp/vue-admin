<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="设备类型" prop="deviceTypeId">
        <el-select v-model="dataForm.deviceTypeId" >
              <el-option v-for="(item, index) in deviceTypeIdList"
               :key="index"
                :label="item.label"
                :value="item.value">
             </el-option>
         </el-select>
      </el-form-item>
            <el-form-item label="设备型号" prop="deviceModelId">
        <el-select v-model="dataForm.deviceModelId" >
              <el-option v-for="(item, index) in deviceModelIdList"
               :key="index"
                :label="item.label"
                :value="item.value">
             </el-option>
         </el-select>
      </el-form-item>
            <el-form-item label="厂商" prop="deviceMakerId">
        <el-select v-model="dataForm.deviceMakerId" >
              <el-option v-for="(item, index) in deviceMakerIdList"
               :key="index"
                :label="item.label"
                :value="item.value">
             </el-option>
         </el-select>
      </el-form-item>
            <el-form-item label="分组" prop="groupId">
        <el-select v-model="dataForm.groupId" >
              <el-option v-for="(item, index) in groupIdList"
               :key="index"
                :label="item.label"
                :value="item.value">
             </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="设备序列号" prop="serialNumber">
        <el-input  v-model="dataForm.serialNumber" placeholder="设备序列号"></el-input>
      </el-form-item>
       
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
  export default {
    data () {
      return {
        visible: false,
        deviceTypeIdList: [
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
        deviceMakerIdList:[
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
        deviceModelIdList:[   {
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
          },],
        groupIdList:[
          {
            label:'COM.TEST',
            value:'COM.TEST'
          }
        ],
        dataForm: {
          deviceTypeId:'',
          deviceMakerId:'',
          deviceModelId:'',
          groupId:'',
          serialNumber:'',
        },
        dataRule: {
          deviceTypeId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deviceMakerId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deviceModelId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          groupId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          serialNumber: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        },
        loading:false,
      }
    },
    methods: {
      init (id) {
          this.visible = true
          this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          })
          if (id) {
            this.dataForm = this.$parent.dataList.filter(item => item.id === id)[0]
          }
     
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
                this.loading = true
        request.post('http://101.34.215.29:9000/web/device',this.dataForm).then(res => {
                 this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$parent.getDataList()
                  }
                })
              this.loading = false 
            })
          }
        })
      }
    }
  }
</script>
