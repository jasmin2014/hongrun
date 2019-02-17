<template>
  <el-tabs v-model="activeName" type="card" class="cus-tabs borr-tabs" @tab-click="handleClick">    
    <el-tab-pane label="额度申请" name="first" class="mess-rigitem">      
      <el-form :inline="true" v-model="quotaForm" class="flex quota">
        <el-row>
          <el-form-item label="申请类型：">
            <el-radio class="radio" v-model="quotaForm.type" label="1">借款信用额度</el-radio>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请金额：">
              <el-input></el-input>              
            </el-form-item>
          </el-col>
          <el-col :span="2"><span>元</span></el-col>
        </el-row>
        <el-row>
          <el-form-item label="申请说明：">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="quotaForm.textarea">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row class="center">
          <el-form-item>
            <el-button type="primary">提交申请</el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <el-table :data="quotaData" class='table-center' border>
            <el-table-column prop="Date" label="提交时间"></el-table-column>
            <el-table-column prop="Type" label="申请类型"></el-table-column>
            <el-table-column prop="Amount" label="申请金额"></el-table-column>
            <el-table-column prop="Status" label="审核状态"></el-table-column>
            <el-table-column prop="Opinion" label="处理意见"></el-table-column>
            <el-table-column prop="Quota" label="授信额度"></el-table-column>                
          </el-table>
        </el-row>
      </el-form>
    </el-tab-pane> 

  </el-tabs>
</template>

<script>

export default {
  name: 'Account',
  data () {   
    return {
      activeName:'first',
      quotaForm:{
        type:'',
        textarea:''
      },
      quotaData: [{  //发标中的借款列表 表格字段描述
        Date:'',  // 提交时间
        Type:'',  // 申请类型
        Amount:'',  // 申请金额
        Status:'',  // 审核状态
        Opinion:'',  // 处理意见
        Quota:''  //授信额度
      }],
        
    }
  },
  methods: {
    handleClick() {

    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borr-tabs {
  text-align: left;
}
.form-tit {
  line-height: 36px;
  background: #fff;
  padding-left: 20px;
}
.form-tit i {
  color: #d92818;
  margin-right: 10px;
}
.borr-tabs .mt20 {
  margin-top: 20px;
}
.quota .el-row .el-form-item .el-textarea {
  width: 600px;
}
.quota .el-row.center {
  text-align: center;
}
.quota .el-row .el-col-2 {
  line-height: 36px;
  font-size: 14px;
}
</style>
