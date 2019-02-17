<template>
    <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
        <div id="ipsForm" style="border: none;"></div>
        <el-tab-pane label="托管充值" name="charge" class="mess-rigitem rec-wrap">
            <div class="cp-warn">
                <i class="icon iconfont">&#xe60f;</i>最低充值金额50元，充值免手续费！充值资金可用于进行验证，投标，还款等，充值成功后，充值金额会立刻划到您的账户
            </div>
            <el-form :inline="true" :label-position="labelPosition" label-width="150px" :model="rechargeForm"
                     :rules="rules" ref="rechargeForm" class="form-custom flex mcompany">
                <el-row>
                    <el-form-item label="账户余额：">
                        <p class="rec-balance"><span>{{userInfo.balance}}</span>元</p>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="选择银行：" prop="bank">
                        <el-select v-model="rechargeForm.bank" placeholder="请选择">
                            <el-option value="中国银行">中国银行</el-option>
                            <el-option value="农业银行">农业银行</el-option>
                            <el-option value="工商银行">工商银行</el-option>
                            <el-option value="招商银行">招商银行</el-option>
                            <el-option value="建设银行">建设银行</el-option>
                            <el-option value="交通银行">交通银行</el-option>
                            <el-option value="广发银行">广发银行</el-option>
                            <el-option value="兴业银行">兴业银行</el-option>
                            <el-option value="中信银行">中信银行</el-option>
                            <el-option value="光大银行">光大银行</el-option>
                            <el-option value="邮政储蓄">邮政储蓄</el-option>
                            <el-option value="民生银行">民生银行</el-option>
                            <el-option value="平安银行">平安银行</el-option>
                            <el-option value="北京银行">北京银行</el-option>
                            <el-option value="南京银行">南京银行</el-option>
                            <el-option value="渤海银行">渤海银行</el-option>
                            <el-option value="浙商银行">浙商银行</el-option>
                            <el-option value="东亚银行">东亚银行</el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="充值金额：" prop="amount">
                        <el-input v-model="rechargeForm.amount"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="cus-btns">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('rechargeForm')">确认充值</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="充值记录" name="record" class="mess-rigitem rec-wrap">
            <div class="cp-warn">
                <i class="icon iconfont">&#xe60f;</i>截止到 <span>2017-10-24 22:16</span>您的充值成功金额是：<span>0.00元</span>
            </div>
            <el-form :inline="true" :label-position="labelPosition" :model="search" ref="search"
                     class="form-custom flex">
                <el-row class="rec-mt30">
                    <el-col :span="8">
                        <el-form-item label="时间从">
                            <el-date-picker
                                    v-model="search.gmt_start"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="到">
                            <el-date-picker
                                    v-model="search.gmt_end"
                                    type="date"
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
                    <el-table-column prop="gmt_create" label="充值时间"></el-table-column>
                    <el-table-column prop="amount" label="充值金额"></el-table-column>
                    <el-table-column prop="status" :formatter="getFundStatus" label="充值状态"></el-table-column>
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
    import { MessageBox } from 'element-ui'
    export default {
        name: 'Account',
        data () {
            return {
                activeName: 'charge',
                labelPosition: 'right',
                rechargeForm: {
                    balance: '0.00',
                    bank: '中国银行',
                    amount: ''
                },
                rules: {
                    bank: [
                        {required: true, message: '请选择充值银行', trigger: 'change'}
                    ],
                    amount: [
                        {required: true, message: '请输入充值金额', trigger: 'change'}
                    ]
                },
                search: {
                    gmt_start: '',
                    gmt_end: '',
                    type: enums.getValue('FUND_TYPE','CHARGE')
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
                'ipsRegister','queryUserInfo','ipsCharge','queryUserFund','setUserInfo'
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
                this.search.page = 1;
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
                        this.ipsCharge(this.rechargeForm).then(response => {
                            $('#ipsForm').html(response);
                        });
                    } else {
                        return false;
                    }
                });
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

    .main-page{
        padding: 20px 0px;
    }
</style>
