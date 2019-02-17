<template>
  <el-row class="cus-flex">
    <!--个人中心左侧导航条-->
    <el-col :span="6" class="col-6-calc">
      <p><router-link to="/calculator/investment"><i class="icon iconfont">&#xe60c;</i>投资计算器</router-link></p>
      <p class="active-item"><router-link to="/calculator/borrow"><i class="icon iconfont">&#xe787;</i>借款计算器</router-link></p>
    </el-col>

    <el-col :span="18" :offset="1" class="mess-right">
      <el-row class="invest-wrap">
        <el-col>
          <h3>借款计算器</h3>
          <p>目前支持网站正在使用的四种还款方式：按天到期还款、按月分期还款、按月还息到期还本、到期还本息。</p>
        </el-col>
        <el-col>
          <h3>借款设置</h3>      
          <el-form :inline="true" :label-position="labelPosition" label-width="100px" :model="InvestmentForm"  ref="InvestmentForm" class="invest-form flex">
            <el-row class="flex">
              <el-col :span="9">              
              <el-form-item label="借款期限：">
                <el-input v-model="InvestmentForm.borrowLimit"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="13"> 
              <el-form-item>
                <template>
                  <el-radio class="radio" v-model="InvestmentForm.dateLimit" label="month">月</el-radio>
                  <el-radio class="radio" v-model="InvestmentForm.dateLimit" label="day">日</el-radio>
                </template>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9"> 
                <el-form-item label="借款利率：">
                  <el-input v-model="InvestmentForm.borrowInterest"></el-input>
                  <span>%</span>
                </el-form-item>
              </el-col>
              <el-col :span="13"> 
                <el-form-item>
                  <template>
                    <el-radio class="radio" v-model="InvestmentForm.interestLimit" label="yearInte">年利率</el-radio>
                    <el-radio class="radio" v-model="InvestmentForm.interestLimit" label="dayInte">日利率</el-radio>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="two-line-row">
              <el-col :span="9"> 
                <el-form-item label="借款利率：">
                  <el-input v-model="InvestmentForm.borrowInterest"></el-input>
                  <span>%</span>
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-row>
                  <el-col :span="3"><span>或</span><i class="icon iconfont">&#xe613;</i></el-col>
                  <el-col :span="20">
                    <el-form-item label="标总额">
                      <el-input v-model="InvestmentForm.borrowInterest1" ></el-input>
                      <span>元</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="总奖励">
                      <el-input v-model="InvestmentForm.borrowInterest2"></el-input>
                      <span>元</span>
                    </el-form-item>
                  </el-col>
                </el-row> 
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9"> 
                <el-form-item label="借款金额：">
                  <el-input v-model="InvestmentForm.borrowAmount" placeholder="10000"></el-input>
                  <span>元</span>
                </el-form-item>
              </el-col>          
            </el-row>
            <el-row>
              <el-col :span="12"> 
                <el-form-item label="借款管理费：">
                  <el-input v-model="InvestmentForm.borrowskips" placeholder="0.5"></el-input>
                  <span>%每月</span>
                </el-form-item>
              </el-col>          
            </el-row>
            <el-row>
              <el-col :span="12"> 
                <el-form-item label="还款方式：">
                  <el-select v-model="InvestmentForm.modeOfRepayment" placeholder="请选择还款方式">
                    <el-option label="按月分期还款" value="按月分期还款"></el-option>
                    <el-option label="每月还息到期还本" value="每月还息到期还本"></el-option>
                    <el-option label="到期还本息" value="到期还本息"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>          
            </el-row>
            <el-row class="caclutor-btn">
              <el-form-item>
                <el-button type="danger">开始计算</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>   
    </el-col>
  
  </el-row>
</template>

<script>

export default {
  name: 'Investment',
  data () {    
    return {
      labelPosition:'right',
      InvestmentForm:{
        borrowLimit:'',
        dateLimit:'month',
        borrowInterest:'',
        borrowInterest1:'0',
        borrowInterest2:'0',
        interestLimit:'yearInte',
        borrowAmount:'',
        borrowskips:'',
        modeOfRepayment:''
      }
    }
  },
  methods: {
    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
