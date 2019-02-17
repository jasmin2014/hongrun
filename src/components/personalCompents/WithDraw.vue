<template>
    <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
        <el-tab-pane label="马上提现" name="withdraw" class="mess-rigitem rec-wrap">

            <el-form :inline="true" :label-position="labelPosition" label-width="150px" :model="withdrawForm"
                     :rules="rules" ref="withdrawForm" class="form-custom flex mcompany">
                <el-row class="draw-mess">
                    <el-col :span="4">您的银行账号是：</el-col>
                    <el-col :span="18">还没有登记您的
                        <router-link to="/personal/account">银行账号</router-link>
                    </el-col>
                    <el-col :span="4">您的真实姓名：</el-col>
                    <el-col :span="18">{{userInfo.name}} （必须和您的银行账户姓名一致）</el-col>
                    <el-col :span="4">您的手机号码：</el-col>
                    <el-col :span="18">{{userInfo.mobile | hideMobile}}
                        <router-link to="/personal/varification">点此修改</router-link>
                    </el-col>
                    <el-col :span="4">提款期限：</el-col>
                    <el-col :span="18">72小时/24小时</el-col>
                    <el-col :span="4">手续费：</el-col>
                    <el-col :span="18">1元/每次</el-col>
                    <el-col :span="4">提现金额：</el-col>
                    <el-col :span="18">
                        <el-form-item prop="amount">
                            <el-input v-model="withdrawForm.amount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="18">
                        <el-button type="primary" style="margin: 20px 0px;" @click="submitForm('withdrawForm')">立即提现</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="record" class="mess-rigitem rec-wrap">
            <!-- <div class="cp-warn">
              <i class="icon iconfont">&#xe60f;</i>截止到 <span>2017-10-24 22:16</span>您的充值成功金额是：<span>0.00元</span>，成功提现金额是<span>0.00元</span>
            </div> -->
            <el-form :inline="true" :label-position="labelPosition" :model="search" ref="search"
                     class="form-custom flex">
                <el-row class="rec-mt30">
                    <el-col :span="8">
                        <el-form-item label="时间从">
                            <el-date-picker
                                    v-model="search.gmt_start"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="到">
                            <el-date-picker
                                    v-model="search.gmt_end"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch">查看</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row class="customTable" v-loading.body="loading">
                <el-table :data="tableList.data" class='table-center' border>
                    <el-table-column prop="code" label="编号"></el-table-column>
                    <el-table-column prop="gmt_create" label="申请时间"></el-table-column>
                    <el-table-column prop="amount" label="提现金额"></el-table-column>
                    <el-table-column prop="ips_fee" label="提现手续费"></el-table-column>
                    <el-table-column prop="status" :formatter="getFundStatus" label="提现状态"></el-table-column>
                </el-table>

                <div class="main-page">
                    <el-pagination
                            v-if="tableList.total > 0"
                            @current-change="handleCurrentChange"
                            :current-page="tableList.current_page"
                            :page-size="tableList.per_page"
                            layout="total, prev, pager, next, jumper"
                            :total="tableList.total">
                    </el-pagination>
                </div>
            </el-row>
        </el-tab-pane>


    </el-tabs>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'Account',
        data () {
            var amountValid = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入提现金额'));
                }else if (value <  1) {
                    callback(new Error('提现金额不得小于1元'));
                } else {
                    callback();
                }
            };
            return {
                activeName: 'withdraw',
                labelPosition: 'right',
                withdrawForm: {
                    amount: ''
                },

                rules: {
                    amount: [
                        {validator: amountValid, required: true, trigger: 'blur'}
                    ]
                },
                search: {
                    gmt_start: '',
                    gmt_end: '',
                    type: enums.getValue('FUND_TYPE','WITHDRAW')
                },
                tableList:{
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                loading:false
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        mounted (){
            let _this = this;

            if(this.userInfo.v_mobile && this.userInfo.v_identity && !this.userInfo.ips_acct_no){
                MessageBox.alert('请先开通托管账户','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
                    _this.ipsRegister(null).then(response => {
                        $('#ipsForm').html(response);
                    });
                }});
            }

            // 重新设置用户信息
            this.queryUserInfo(null).then(function(resp){
                _this.setUserInfo(resp.account);
                sessionStorage.setItem('authUser',Base64.encode(JSON.stringify(resp.account)));
            });
        },
        methods: {
            ...mapActions([
                'ipsRegister','ipsWithdraw','queryUserInfo','queryUserFund','setUserInfo'
            ]),
            handleClick(val) {
                if(val.name == 'record'){
                    this.getList();
                }
            },
            getList() {
                this.loading = true;
                this.$store.dispatch('queryUserFund',this.search)
                    .then(response => {
                        this.loading = false;
                        this.tableList = response;
                    });
            },
            handleCurrentChange(val) {
                this.tableList.current_page = val;
                this.search.page = val;
                this.getList();
            },
            handleSearch() {
                if(this.search.gmt_start){
                    this.search.gmt_start = (new Date(this.search.gmt_start)).toLocaleDateString();
                }
                if(this.search.gmt_end){
                    this.search.gmt_end = (new Date(this.search.gmt_end)).toLocaleDateString();
                }
                this.getList();
            },
            getFundStatus(item) {
                return enums.getDesc('USER_FUND',item.status);
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ipsWithdraw(this.withdrawForm).then(response => {
                            $('#ipsForm').html(response);
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        filters: {
            hideMobile(val){
                if(val){
                    return val.replace(/^(.{3}).+(.{4})$/g,"$1****$2");
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mcompany, .rec-mt30 {
        margin-top: 20px;
    }

    .mcompany .el-input, .mcompany .el-select {
        width: 360px;
    }

    .rec-balance, .rec-wrap .cp-warn {
        font-size: 85%;
        height: auto;
        line-height: 30px;
    }

    .rec-balance span, .rec-redtxt span {
        font-size: 120%;
        color: red;
        font-weight: bold;
    }

    .draw-mess {
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    .draw-mess .el-col {
        line-height: 40px;
        border-top: 1px solid #ddd;
        border-right: 1px solid #ddd;
        font-size: 85%;
    }

    .draw-mess .el-col-4 {
        text-align: right;
    }

    .draw-mess .el-col .el-form-item {
        margin: 0;
    }

    .draw-mess .el-col-18 {
        padding-left: 20px;
    }

    .main-page{
        padding: 20px 0px;
    }
</style>
