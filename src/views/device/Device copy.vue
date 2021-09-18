<template>
  <div class="home-container">
    <div class="home-content">
      <!-- <Button @click="getUserData">ajax 测试</Button> -->
       <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        width="80"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备序列号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="设备类型">
      </el-table-column>
      <el-table-column
        prop="date"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="name"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="分组">
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="激活时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="在线状态">
      </el-table-column>
      <el-table-column
        prop="date"
        label="设备状态">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建人">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">设备详情</el-button>
        <el-button type="text" size="small">上报详情</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import { fetchUserData } from "@/api";

export default {
  name: "home",
  data() {
    return {
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      userInfo: "",
    };
  },
  methods: {
    getUserData() {
      fetchUserData().then((res) => {
        this.userInfo = JSON.stringify(res, null, 4);
      });
    },
  },
};
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
</style>