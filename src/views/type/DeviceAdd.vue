<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="dataForm.userName" placeholder="登录帐号" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="用户中文名" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="用户中文名" maxlength="25" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
       <el-form-item label="所属机构" prop="organCode">
         <el-select v-model="dataForm.organCode" >
              <el-option v-for="(item, index) in organList"
               :key="index"
                :label="item.deptName"
                :value="item.deptCode"
                placeholder="所属机构">
             </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="所属部门" prop="department">
        <el-select v-model="dataForm.department" >
          <el-option v-for="(item, index) in departmentList"
                     :key="index"
                     :label="item.deptName"
                     :value="item.deptCode"
                     placeholder="所属部门">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户来源" >
         <el-select v-model="dataForm.userSourceName" >
              <el-option v-for="(item, index) in userSourceNamelist"
               :key="index"
                :label="item"
                :value="item"
                placeholder="用户来源">
             </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
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
  // import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      // var validatePassword = (rule, value, callback) => {
      //   if (!this.dataForm.id && !/\S/.test(value)) {
      //     callback(new Error('密码不能为空'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validateComfirmPassword = (rule, value, callback) => {
      //   if (!this.dataForm.id && !/\S/.test(value)) {
      //     callback(new Error('确认密码不能为空'))
      //   } else if (this.dataForm.password !== value) {
      //     callback(new Error('确认密码与密码输入不一致'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validateEmail = (rule, value, callback) => {
      //   if (!isEmail(value) && value) {
      //     callback(new Error('邮箱格式错误'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validateMobile = (rule, value, callback) => {
      //   if (!isMobile(value) && value) {
      //     callback(new Error('手机号格式错误'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        visible: false,
        roleList: [],
        organList:[],
        departmentList:[],
        userSourceNamelist:[],
        dataForm: {
          id: 0,
          userName: '',
          fullName:'',
          password: '',
          comfirmPassword: '',
          organCode:'',
          department:'DEP01',
          userSourceName:'',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1
        },
        dataRule: {
          fullName: [
            { required: true, message: '用户中文名不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          // password: [
          //   { validator: validatePassword, trigger: 'blur' }
          // ],
          // comfirmPassword: [
          //   { validator: validateComfirmPassword, trigger: 'blur' }
          // ],
          // email: [
          //   { required: false, message: '邮箱不能为空', trigger: 'blur' },
          //   { validator: validateEmail, trigger: 'blur' }
          // ],
          // mobile: [
          //   { required: false, message: '手机号不能为空', trigger: 'blur' },
          //   { validator: validateMobile, trigger: 'blur' }
          // ],
          organCode: [
            { required: true, message: '所属机构不能为空', trigger: 'blur' },
          ],
          department: [
            { required: true, message: '所属部门不能为空', trigger: 'blur' },
          ]
        },
        loading:false,
      }
    },
    methods: {
      //获取机构列表
      getOrganFun(){
         this.$http({
          url: this.$http.adornUrl('/sys/sysdeptorg/list'),
          method: 'get',
          params: this.$http.adornParams({}),
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.organList = data.SysDeptOrgEntityList
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      //获取部门列表
      getDepartmentFun(){
        this.$http({
          url: this.$http.adornUrl('/sys/sysdept/list'),
          method: 'get',
          params: this.$http.adornParams({}),
        }).then(({
                   data
                 }) => {
          if (data && data.code === 0) {
            this.departmentList = data.SysDeptOrgEntityList
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      //获取用户来源
      getUserSourceNamelistFun(){
         this.$http({
          url: this.$http.adornUrl('/sys/user/getUserSourceNamelist'),
          method: 'get',
          params: this.$http.adornParams({}),
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.userSourceNamelist = data.userSourceNamelist
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      init (id) {
        this.dataForm.id = id || 0
          this.visible = true
          this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          })
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userName = data.user.username
                this.dataForm.fullName = data.user.fullName
                this.dataForm.salt = data.user.salt
                this.dataForm.email = data.user.email
                this.dataForm.mobile = data.user.mobile
                this.dataForm.organCode = data.user.organCode
                this.dataForm.department = data.user.department
                this.dataForm.roleIdList = data.user.roleIdList
                this.dataForm.status = data.user.status
                this.dataForm.userSourceName = data.user.userSourceName
              }
            })
          }
     
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'fullName': this.dataForm.fullName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'organCode': this.dataForm.organCode,
                'organName': this.organList.filter(item => item.deptCode === this.dataForm.organCode)[0].deptName,
                'department': this.dataForm.department,
                'departName': this.departmentList.filter(item => item.deptCode === this.dataForm.department)[0].deptName,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList,
                'userSourceName': this.dataForm.userSourceName
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
                this.loading = false
              } else {
                this.$message.error(data.msg)
                this.loading = false
              }
            })
          }
        })
      }
    }
  }
</script>
