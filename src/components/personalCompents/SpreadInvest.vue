<template>
    <div v-loading.body="loading">
        <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
            <el-tab-pane label="竞标中普通标" name="bid" class="mess-rigitem rec-wrap">
                <el-row>
                    <el-col class="bidtxt">您目前竞标中的投资总额是：<span>￥{{tableList.total_amount}}</span>，共<span>{{tableList.total}}</span>笔投标。</el-col>
                    <el-col>
                        <el-table :data="tableList.data" class='table-center' border>
                            <el-table-column prop="bid.title" label="借款标题"></el-table-column>
                            <el-table-column prop="gmt_create" label="投标日期"></el-table-column>
                            <el-table-column prop="bid.amount" label="借款金额"></el-table-column>
                            <el-table-column prop="bid.loan_rate" label="年化利率" :formatter="getLoanRate"></el-table-column>
                            <el-table-column prop="Limit" label="借款期限" :formatter="getRepayLimit"></el-table-column>
                            <el-table-column prop="amount" width="120px" label="我的投资金额"></el-table-column>
                            <el-table-column prop="redPackage" label="红包"></el-table-column>
                            <el-table-column prop="Money" label="预期本息" :formatter="getTotalMoney"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="回收中普通标" name="recycle" class="mess-rigitem rec-wrap">
                <el-col class="bidtxt">您目前回收中的投资总额是：<span>￥{{tableList.total_amount}}</span>，共<span>{{tableList.total}}</span>笔投标。</el-col>
                <el-col>
                    <el-table :data="tableList.data" class='table-center' border>
                        <el-table-column prop="code" label="借款标号"></el-table-column>
                        <el-table-column prop="bid.title" label="借款标题"></el-table-column>
                        <el-table-column prop="amount" label="投资金额"></el-table-column>
                        <el-table-column prop="bid.username" label="借入人"></el-table-column>
                        <el-table-column prop="redPackage" label="红包"></el-table-column>
                        <el-table-column prop="bid.loan_rate" label="年化利率" :formatter="getLoanRate"></el-table-column>
                    </el-table>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="已回收普通标" name="finish" class="mess-rigitem rec-wrap">
                <el-row>
                    <el-col class="bidtxt">您目前已回收的投资总额是：<span>￥{{tableList.total_amount}}</span>，共<span>{{tableList.total}}</span>笔投标。</el-col>
                    <el-col>
                        <el-table :data="tableList.data" class='table-center' border>
                            <el-table-column prop="code" label="借款标号"></el-table-column>
                            <el-table-column prop="bid.title" label="借款标题"></el-table-column>
                            <el-table-column prop="bid.username" label="借入人"></el-table-column>
                            <el-table-column prop="bid.loan_rate" label="年化利率" :formatter="getLoanRate"></el-table-column>
                            <el-table-column prop="amount" label="已收本金"></el-table-column>
                            <el-table-column prop="interest" label="已收利息"></el-table-column>
                        </el-table>

                    </el-col>
                </el-row>
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
    import {mapGetters, mapActions} from 'vuex';
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol},
        name: 'Account',
        data () {
            return {
                activeName: 'bid',
                labelPosition: 'right',
                tableList:{
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0,
                    total_amount: '0.00'
                },
                search: {
                    status: 2
                },
                loading:false
            }
        },
        created(){
            this.getList();
        },
        methods: {
            ...mapActions([
                'queryUserBidRecord'
            ]),
            handleClick(val) {
                if(val.name == 'bid'){
                    this.search.status = 2;
                    this.getList();
                }else if(val.name == 'recycle'){
                    this.search.status = 1;
                    this.getList();
                }else if(val.name == 'finish'){
                    this.search.status = 4;
                    this.getList();
                }
            },
            getList() {
                this.loading = true;
                this.$store.dispatch('queryUserBidRecord',this.search)
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
            getRepayLimit(val) {
                return val.bid.term + val.bid.term_unit;
            },
            getTotalMoney(val) {
                return (parseFloat(val.amount) + parseFloat(val.interest)).toFixed(2);
            },
            getLoanRate(val) {
                return val.bid.loan_rate + '%';
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bidtxt {
        height: 40px;
        line-height: 40px;
        margin: 10px 0 20px 0;
        text-align: left;
        background: #fff;
        padding-left: 20px;
        border: 1px solid #ddd;
    }

    .bidtxt span {
        font-size: 120%;
        color: #d92818;
        margin: 0 8px;
    }

    .main-page{
        margin: 20px 0px;
    }
</style>
