<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="设备类型" prop="deviceTypeName">
        <el-input v-model="dataForm.deviceTypeName" placeholder="设备类型" ></el-input>
      </el-form-item>
        <el-form-item label="厂商" prop="deviceMakerName">
        <el-input v-model="dataForm.deviceMakerName" placeholder="厂商"></el-input>
      </el-form-item>
       <el-form-item label="型号" prop="model">
        <el-input v-model="dataForm.deviceModelName" placeholder="型号"></el-input>
      </el-form-item>
       <el-form-item label="分组" prop="groupName">
        <el-input v-model="dataForm.groupName" placeholder="分组"></el-input>
      </el-form-item>
       <!-- <el-form-item label="厂商" prop="organCode">
         <el-select v-model="dataForm.organCode" >
              <el-option v-for="(item, index) in organList"
               :key="index"
                :label="item.deptName"
                :value="item.deptCode"
                placeholder="厂商">
             </el-option>
         </el-select>
      </el-form-item> -->
      <el-form-item label="是否在线" size="mini" prop="onlineState">
        <el-radio-group v-model="dataForm.onlineState">
          <el-radio :label="1">在线</el-radio>
          <el-radio :label="0">不在线</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        organList:[],
        departmentList:[],
        userSourceNamelist:[],
        dataForm: {
          deviceTypeName:'',
          deviceMakerName:'',
          deviceModelName:'',
          groupName:'',
          onlineState:'',
        },
        dataRule: {
          deviceTypeName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deviceMakerName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          deviceModelName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          groupName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          onlineState: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
        },
        loading:false,
        deviceId:'',
      }
    },
    methods: {
      init (id) {
        this.deviceId = id;
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
            axios({
                method: 'post',
                url: 'http://101.34.215.29:9000/web/device',
                data: this.dataForm
            })
            .then(function (res) {
              if(res.data.code === 0){
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
              }
            })
          }
        })
      }
    }
  }
</script>
