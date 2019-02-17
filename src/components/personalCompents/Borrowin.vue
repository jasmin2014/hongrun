<template>
    <div v-loading.body="loading">
        <el-tabs v-model="activeName" type="card" class="cus-tabs borr-tabs" @tab-click="handleClick">
            <el-tab-pane label="发标中借款" name="process" class="mess-rigitem">
                <el-form :inline="true" v-model="search">
                    <el-row class="form-tit"><i class="icon iconfont">&#xe615;</i>初审通过，正在投标的借款</el-row>
                    <el-row class="mt20">
                        <el-form-item label="起止日期：">
                            <el-date-picker
                                    v-model="search.date_process"
                                    type="daterange"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch('process')">查看</el-button>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-table :data="tableList.data" class='table-center' border style="width: 100%">
                            <el-table-column prop="code" label="借款标号"></el-table-column>
                            <el-table-column prop="useage" label="还款方式" :formatter="getRepayment"></el-table-column>
                            <el-table-column prop="amount" label="借款金额"></el-table-column>
                            <el-table-column prop="progress" label="借款进度" :formatter="getProgress"></el-table-column>
                            <el-table-column prop="gmt_create" label="借款时间"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <router-link :to="{name:'InvestDetail',query: {id: scope.row.id}}">
                                        <el-button size="mini">查看详情</el-button>
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="尝还中借款" name="repay" class="mess-rigitem">
                <el-form :inline="true" v-model="search">
                    <el-row class="form-tit"><i class="icon iconfont">&#xe615;</i>复审通过，正在还款的借款</el-row>
                    <el-row class="mt20">
                        <el-form-item label="起止日期：">
                            <el-date-picker
                                    v-model="search.date_repay"
                                    type="daterange"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch('repay')">查看</el-button>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-table :data="tableList.data" class='table-center' border>
                            <el-table-column prop="code" label="借款标号"></el-table-column>
                            <el-table-column prop="useage" label="还款方式" :formatter="getRepayment"></el-table-column>
                            <el-table-column prop="amount" label="借款金额"></el-table-column>
                            <el-table-column prop="Progress" label="已还金额" :formatter="getRepayAmount"></el-table-column>
                            <el-table-column prop="loan_rate" label="年利率" :formatter="getLoanRate"></el-table-column>
                            <el-table-column prop="repayment" label="还款期限" :formatter="getRepayTerm"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini"  @click="handleRepayment(scope.row.id)">我要还款</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="已还清的借款" name="finish" class="mess-rigitem">
                <el-form :inline="true" v-model="search">
                    <el-row class="form-tit"><i class="icon iconfont">&#xe615;</i>已还清的借款</el-row>
                    <el-row class="mt20">
                        <el-form-item label="起止日期：">
                            <el-date-picker
                                    v-model="search.date_finish"
                                    type="daterange"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch('finish')">查看</el-button>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-table :data="tableList.data" class='table-center' border>
                            <el-table-column prop="code" label="借款标号"></el-table-column>
                            <el-table-column prop="useage" label="还款方式" :formatter="getRepayment"></el-table-column>
                            <el-table-column prop="amount" label="借款金额"></el-table-column>
                            <el-table-column prop="Limit" label="借款期限" :formatter="getRepayLimit"></el-table-column>
                            <el-table-column prop="gmt_create" label="借款时间"></el-table-column>
                            <el-table-column prop="already" label="已还本息"></el-table-column>
                        </el-table>
                    </el-row>
                </el-form>
            </el-tab-pane>
        </el-tabs>
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
    </div>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'Account',
        data () {
            return {
                activeName: 'process',
                InInvitationForm: {
                    DateStartEnd: ''
                },
                tableList:{
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                search: {
                    status: 2,
                    date_process: '',
                    date_repay: '',
                    date_finish: '',
                    gmt_start: '',
                    gmt_end: ''
                },
                loading:false,
                lock: true
            }
        },
        created(){
            this.getList();
        },
        methods: {
            ...mapActions([
                'queryUserBid','ipsRepayment'
            ]),
            handleSearch(type) {
                if(type == 'process'){
                    this.search.gmt_start = this.search.date_process[0];
                    this.search.gmt_end = this.search.date_process[1];
                }else if(type == 'repay'){
                    this.search.gmt_start = this.search.date_repay[0];
                    this.search.gmt_end = this.search.date_repay[1];
                }else if(type == 'finish'){
                    this.search.gmt_start = this.search.date_finish[0];
                    this.search.gmt_end = this.search.date_finish[1];
                }
                this.getList();
            },
            handleClick(val) {
                if(val.name == 'process'){
                    this.search.status = 2;
                    this.getList();
                }else if(val.name == 'repay'){
                    this.search.status = 4;
                    this.getList();
                }else if(val.name == 'finish'){
                    this.search.status = 5
                    this.getList();
                }
                this.search.date_process = '';
                this.search.date_repay = '';
                this.search.date_finish = '';
            },
            handleRepayment(id){
                if(this.lock){
                    this.lock = false;
                    this.$store.dispatch('ipsRepayment',{id:id})
                        .then(response => {
                            this.lock = true;
                            $('#ipsForm').html(response);
                        });
                }
            },
            getList() {
                this.loading = true;
                this.$store.dispatch('queryUserBid',this.search)
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
            getRepayment(val) {
                return enums.getDesc('BID_USEAGE', val.useage);
            },
            getProgress(val) {
                return ((val.bid_amount / val.amount) * 100).toFixed(2) + '%';
            },
            getRepayAmount(val) {
                return '0.00';
            },
            getLoanRate(val) {
                return val.loan_rate + '%';
            },
            getRepayTerm(val) {
                return enums.getDesc('BID_REPAYMENT', val.repayment);
            },
            getRepayLimit(val) {
                return val.term + val.term_unit;
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

    .main-page{
        margin: 20px 0px;
    }
</style>
