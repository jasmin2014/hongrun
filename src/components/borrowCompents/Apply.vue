<template>
  <div class="borrow-apply">
    <top-header></top-header>
    <header-nav></header-nav>
    <div class="apply-main">
      <div class="content">
        <el-form :inline="true" :label-position="labelPosition" label-width="160px" :model="borrowForm"   :rules="rules" ref="borrowForm" class="form-custom flex">
          <h3>借款信息</h3>
          <div class="apply-mess">                     
            <el-row>
              <el-col :span="10">
                <el-form-item label="借贷总金额：" prop="amount">
                  <el-input v-model="borrowForm.amount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="年利率：">
                      <el-input v-model="borrowForm.annual"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">%(<span>利率范围：0.00%-24%</span>)</el-col>
                </el-row>                
              </el-col>
              <el-col :span="10">
                <el-form-item label="借款用途：" prop="purpose">
                  <el-select v-model="borrowForm.purpose" placeholder="请选择">
                    <el-option label="短期周转" value="短期周转"></el-option>
                    <el-option label="生意周转" value="生意周转"></el-option>
                    <el-option label="生活周转" value="生活周转"></el-option>
                    <el-option label="购物消费" value="购物消费"></el-option>
                    <el-option label="不提现借款" value="不提现借款"></el-option>
                    <el-option label="创业借款" value="创业借款"></el-option>
                    <el-option label="其它借款" value="其它借款"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="借款期限：" prop="borrowLimit">
                      <el-select v-model="borrowForm.borrowLimit" placeholder="请选择">
                        <el-option label="一个月" value="一个月"></el-option>
                        <el-option label="两个月" value="两个月"></el-option>
                        <el-option label="三个月" value="三个月"></el-option>
                        <el-option label="四个月" value="四个月"></el-option>
                        <el-option label="五个月" value="五个月"></el-option>
                        <el-option label="六个月" value="六个月"></el-option>
                        <el-option label="七个月" value="七个月"></el-option>
                        <el-option label="八个月" value="八个月"></el-option>
                        <el-option label="九个月" value="九个月"></el-option>
                        <el-option label="十个月" value="十个月"></el-option>
                        <el-option label="十一个月" value="十一个月"></el-option>
                        <el-option label="十二个月" value="十二个月"></el-option>
                        <el-option label="十三个月" value="十三个月"></el-option>
                        <el-option label="十四个月" value="十四个月"></el-option>
                        <el-option label="十五个月" value="十五个月"></el-option>
                        <el-option label="十六个月" value="十六个月"></el-option>
                        <el-option label="十七个月" value="十七个月"></el-option>
                        <el-option label="十八个月" value="十八个月"></el-option>
                        <el-option label="十九个月" value="十九个月"></el-option>
                        <el-option label="二十个月" value="二十个月"></el-option>
                        <el-option label="二十一个月" value="二十一个月"></el-option>
                        <el-option label="二十二个月" value="二十二个月"></el-option>
                        <el-option label="二十三个月" value="二十三个月"></el-option>
                        <el-option label="二十四个月" value="二十四个月"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item>
                      <el-checkbox v-model="borrowForm.baseDay">按天</el-checkbox>
                    </el-form-item>
                  </el-col>
                </el-row>                
              </el-col>
              <el-col :span="10">
                <el-form-item label="最低投标金额：" prop="minimum">
                  <el-select v-model="borrowForm.minimum" placeholder="请选择">
                    <el-option label="100元" value="100元"></el-option>
                    <el-option label="200元" value="200元"></el-option>
                    <el-option label="300元" value="300元"></el-option>
                    <el-option label="500元" value="500元"></el-option>
                    <el-option label="1000元" value="1000元"></el-option>
                    <el-option label="2000元" value="2000元"></el-option>
                    <el-option label="3000元" value="3000元"></el-option>
                    <el-option label="4000元" value="4000元"></el-option>
                    <el-option label="5000元" value="5000元"></el-option>
                    <el-option label="10000元" value="10000元"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="最多投标金额：" prop="highest">
                  <el-select v-model="borrowForm.highest" placeholder="没有限制">
                    <el-option label="没有限制" value="没有限制"></el-option>
                    <el-option label="1500元" value="1500元"></el-option>
                    <el-option label="2000元" value="2000元"></el-option>
                    <el-option label="3000元" value="3000元"></el-option>
                    <el-option label="4000元" value="4000元"></el-option>
                    <el-option label="5000元" value="5000元"></el-option>
                    <el-option label="20000元" value="20000元"></el-option>
                  </el-select>
                </el-form-item>               
              </el-col>
              <el-col :span="10">
                <el-form-item label="有效时间：" prop="validTime">
                  <el-select v-model="borrowForm.validTime" placeholder="请选择">
                    <el-option label="1天" value="1天"></el-option>
                    <el-option label="2天" value="2天"></el-option>
                    <el-option label="3天" value="3天"></el-option>
                    <el-option label="4天" value="4天"></el-option>
                    <el-option label="5天" value="6天"></el-option>
                    <el-option label="7天" value="7天"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="还款方式：" prop="refundType">
                  <el-select v-model="borrowForm.refundType" placeholder="请选择">
                    <el-option label="按天到期还款" value="按天到期还款"></el-option>
                    <el-option label="按月分期还款" value="按月分期还款"></el-option>
                    <el-option label="按季分期还款" value="按季分期还款"></el-option>
                    <el-option label="每月还息到期还本" value="每月还息到期还本"></el-option>
                    <el-option label="一次性还款" value="一次性还款"></el-option>
                  </el-select>
                </el-form-item>               
              </el-col>
              <el-col :span="10">
                <el-form-item label="是否有投标奖励：">
                  <el-checkbox v-model="borrowForm.award"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="是否有投标待收限制：">
                  <el-checkbox v-model="borrowForm.limit"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <h3>借款的详细说明</h3>
          <div class="apply-mess">            
            <el-row>
              <el-col :span="16">
                <el-form-item label="标题">
                  <el-input v-model="borrowForm.title" class="w580"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否定向标">
                  <el-checkbox v-model="borrowForm.orient">备选项</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="借款说明：">
                  <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="borrowForm.message" class="w580">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="borrow-btn">
                <el-form-item>
                  <el-button type="primary">提交接口申请</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
  </div>
</template>

<script>
import TopHeader from '../../components/common/TopHeader';
import HeaderNav from '../../components/common/HeaderNav';
import RightTips from '../../components/common/RightTips'

import FooterWrap from '../../components/common/Footer';
export default {
  components:{TopHeader,HeaderNav,RightTips,FooterWrap},
  name: 'BorrowApply',
  data () {
    var validatePhone = (rule, value, callback) => {
      let _r = /^1[34578]\d{9}$/;
      if(!value){
        this.VariPhoneForm.sendMsgDisabled = true;
        callback(new Error('请输入手机号'));
      }else{
        this.VariPhoneForm.sendMsgDisabled = false;
        if (!_r.test(value)) {
          callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }        
      }      
    };
    var validateUserCode = (rule, value, callback) => {
      let _r = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!value){
        callback(new Error('请输入身份证号'));
      }else{
        if (!_r.test(value)) {
          callback(new Error('请输入正确的身份证号'));
        }else{
          callback();
        }        
      }
      
    };
    return {
      activeName:'second',
      labelPosition:'right',  
      borrowForm:{
        amount:'',
        annual:'',
        purpose:'',
        borrowLimit:'',
        baseDay: false,
        minimum:'',
        highest:'',
        validTime:'',
        refundType:'',
        award:false,
        limit:false,
        title:'',
        orient:false,
        message:''
      },
      rules: {
        amount: [
          { required: true, message:'请输入借贷总金额', trigger: 'blur' }
        ],
        purpose: [
          { required: true, message:'请选择接口用途', trigger: 'change' }
        ],
        borrowLimit: [
          { required: true, message:'请选择接口期限', trigger: 'change' }
        ],
        minimum: [
          { required: true, message:'请选择最低投标金额', trigger: 'change' }
        ],
        highest: [
          { required: true, message:'请选择最多投资总额', trigger: 'change' }
        ],
        validTime: [
          { required: true, message:'请选择有效时间', trigger: 'change' }
        ],
        refundType: [
          { required: true, message:'请选择还款方式', trigger: 'change' }
        ]
      },
      CertificationForm: {
        trueName:'',
        userCode:''
      },
      rules2: {
        trueName: [
          { required: true, message:'请输入您的真实姓名', trigger: 'blur' }
        ],
        userCode:[
          {validator: validateUserCode, required: true, trigger: 'blur' }
        ]
      },
      codePhotos:[]    
    }
  },
  methods: {
    handleClick() {

    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功后所需调用的方法
          if(formName==='VariPhoneForm'){
            this.VarifPhoneSuccess = true;
          }else if(formName==='CertificationForm'){
            this.varifTruelySuccess = true;
          }else{
            
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handlePreview(){},
    handleRemove(){},
    senderCode(){
      let me = this;
      me.VariPhoneForm.sendMsgDisabled = true;
      let interval = window.setInterval(function() {
       if ((me.VariPhoneForm.time--) <= 0) {
        me.VariPhoneForm.time = 60;
        me.VariPhoneForm.sendMsgDisabled = false;
        window.clearInterval(interval);
       }
      }, 1000);
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borrow-apply {
  position: relative;
  padding-bottom: 260px;
}
.apply-main {
  width: 100%;
  background: url('../../assets/images/borrowbg2.jpg') no-repeat center center;
  background-size: cover;
}
.apply-main .content {
  padding: 30px 0;
}
.apply-main .content h3{
  height: 50px;
  line-height: 50px;
  width: 100%;
  font-size: 120%;
  font-weight: normal;
  color: #d92818;
  text-align: left;
  background: rgba(255,255,255,.9);
  margin-top: 30px;
  padding-left: 20px;
  border-bottom: 1px solid #fff;
}
.apply-main .content h3:first-child {
  margin-top: 0;
}
.apply-main .content .el-form {
  margin: 0;
  padding: 0;
}
.apply-mess {
  background: rgba(255,255,255,.9);
  padding: 30px;
  border:1px solid #ddd;
}
.apply-mess .w580 {
  width: 580px;
}
.borrow-btn {
  text-align: center;
}
</style>
