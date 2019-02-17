<template>
    <div>
        <div class="topcod-container">
            <div class="content" v-if="activeName==='TAB1'">
                <ul class="clear">
                    <li>标的类型：</li>
                    <li v-for="(item,index) in select.type_arr" @click="handleCurrentStep('type',item.value)"
                        :class="{'active-item':steps.type===item.value}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
                <ul class="clear">
                    <li>标的状态：</li>
                    <li v-for="(item,index) in select.status_arr" @click="handleCurrentStep('status',item.value)"
                        :class="{'active-item':steps.status===item.value}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
                <ul class="clear">
                    <li>借款期限：</li>
                    <li v-for="(item,index) in select.term_arr" @click="handleCurrentStep('term',item.value)"
                        :class="{'active-item':steps.term===item.value}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
                <ul class="clear">
                    <li>年化收益：</li>
                    <li v-for="(item,index) in select.rate_arr" @click="handleCurrentStep('rate',item.value)"
                        :class="{'active-item':steps.rate===item.value}">
                        <span>{{item.label}}</span>
                    </li>

                </ul>
            </div>
            <div class="content" v-else>
                <ul class="clear">
                    <li>标的状态：</li>
                    <li v-for="(item,index) in select.bid_arr" @click="handleCurrentStep('bid',item.value)"
                        :class="{'active-item':steps.bid===item.value}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
                <ul class="clear">
                    <li>借款期限：</li>
                    <li v-for="(item,index) in select.term_arr" @click="handleCurrentStep('term',item.value)"
                        :class="{'active-item':steps.term===item.value}">
                        <span>{{item.label}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content invest-main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-loading.body="loading">
                <!--<el-tab-pane label="优选理财" name="TAB1">-->
                <!--优选理财-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="散标投资" name="TAB1">
                    <el-row class="record-row" v-for="(bidInfo,index) in tableList.data" :key="bidInfo.id">
                        <router-link :to="{name:'InvestDetail',query: {id: bidInfo.id}}">
                            <el-col :span="3">
                                <p>预期年化收益</p>
                                <p><span>{{bidInfo.loan_rate}}</span>%</p>
                            </el-col>
                            <el-col :span="16" :offset="1">
                                <p>{{bidInfo.title}}</p>
                                <el-row>
                                    <el-col :span="6">
                                        <p>项目期限</p>
                                        <span><span v-if="bidInfo.term_unit == '月'">{{bidInfo.term}}个</span><span
                                                v-else>{{bidInfo.term}}</span>{{bidInfo.term_unit}}</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <p>项目金额</p>
                                        <span>{{bidInfo.amount}}元</span>
                                    </el-col>
                                    <el-col :span="12">
                                        <p>募集进度</p>
                                        <div style="width:220px;">
                                            <el-progress :percentage="getPercent(bidInfo.bid_amount,bidInfo.amount)"></el-progress>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="4">
                                <p
                                   v-show="showCountDown(bidInfo.status,bidInfo.gmt_start)">开标倒计时</p>
                                <el-button :plain="true" :disabled="!showBidBtn(bidInfo.status,bidInfo.gmt_start)">
                                    <span v-if="showCountDown(bidInfo.status,bidInfo.gmt_start)" style="font-size: 12px;">
                                        <count-down class="count-down" :currentTime="startTime" :startTime="startTime" :endTime="getBidTime(bidInfo.gmt_start)" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
                                    </span>
                                    <span v-else>{{bidInfo.status | getBtnTxt(bidInfo.gmt_start)}}</span>
                                </el-button>
                            </el-col>
                        </router-link>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="债权转让" name="TAB2">
                    债权转让
                </el-tab-pane>
                <el-tab-pane label="理财债权转让" name="TAB3">
                    理财债权转让
                </el-tab-pane>

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
            </el-tabs>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import CountDown from 'vue2-countdown'
    import enums from '../../utils/enums.js';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        components: {CountDown},
        data () {
            return {
                startTime: 0,
                activeName: 'TAB1',
                tableList: {
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                search: {
                    category: 1,
                    type: 0,
                    status: 0,
                    rate: 0,
                    term: 0,
                    page: 0
                },
                loading: false,
                select: {
                    type_arr: [],
                    term_arr: [],
                    rate_arr: [],
                    status_arr: [],
                },
                steps: {
                    type: 0,
                    status: 0,
                    term: 0,
                    rate: 0,
                }

            }
        },
        created(){
            this.getList();
            this.initSelect();
        },
        methods: {
            initSelect(){
                this.select.type_arr = enums.getItems('SELECT_TYPE');
                this.select.term_arr = enums.getItems('SELECT_TERM');
                this.select.rate_arr = enums.getItems('SELECT_RATE');
                this.select.status_arr = enums.getItems('SELECT_STATUS');
            },
            ...mapActions([
                'queryBidList'
            ]),
            getList(){
                this.loading = true;
                this.$store.dispatch('queryBidList', this.search)
                    .then(response => {
                        this.startTime = GV.now;
                        this.loading = false;
                        this.tableList = response;
                    });
            },
            handleCurrentChange(val) {
                this.tableList.current_page = val;
                this.search.page = val;
                this.getList();
            },
            handleClick(val){
                this.tableList.total = 0;
                this.search.category = enums.getValue('BID_TAB', val.name);
                this.getList();
            },
            handleCurrentStep(type, val){
                switch (type) {
                    case 'type' :
                        this.steps.type = val;
                        this.search.type = val;
                        break;
                    case 'status' :
                        this.steps.status = val;
                        this.search.status = val;
                        break;
                    case 'term' :
                        this.steps.term = val;
                        this.search.term = val;
                        break;
                    case 'rate' :
                        this.steps.rate = val;
                        this.search.rate = val;
                        break;
                    default :
                        this.steps.bid = val;
                        this.search.bid = val;
                        break;
                }

                this.getList();

            },
            getPercent(current, total) {
                let result = (current / total) * 100;
                return parseFloat(result.toFixed(2));
            },
            showCountDown(status, start){
                let now = this.startTime;
                let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;;

                if (status == 2 && begin > now) {
                    return true
                } else {
                    return false;
                }
            },
            showBidBtn(status, start){
                let now = this.startTime;
                let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;;

                if (status == 2 && begin <= now) {
                    return true
                } else {
                    return false;
                }
            },
            getBidTime(val) {
                if(val){
                    return new Date(Date.parse(val.replace(/-/g, "/"))).getTime() / 1000;
                }else{
                    return 0;
                }
            }
        },
        filters: {
            getBtnTxt(status, start){
                let now = GV.now;
                let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

                if (status == 2 && begin > now) {
                    return '倒计时中';
                } else if (status == 2 && begin <= now) {
                    return '进行中';
                } else if (status == 3) {
                    return '复审中';
                } else if (status == 4) {
                    return '还款中';
                } else if (status == 5) {
                    return '已还款';
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .topcod-container {
        width: 100%;
        padding: 50px 0;
        background: url('../../assets/images/reg-bg.jpg') no-repeat center center;
        background-size: cover;
    }

    .topcod-container .content {
        background: rgba(255, 255, 255, .9);
        padding: 30px 20px;
    }

    .topcod-container .content ul {
        margin-top: 20px;
    }

    .topcod-container .content ul:first-child {
        margin-top: 0;
    }

    .topcod-container .content ul li {
        float: left;
        font-size: 90%;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
    }

    .topcod-container .content ul li span {
        padding: 5px 10px;
        margin: 0px 15px;
    }

    .topcod-container .content ul li:first-child {
        cursor: auto;
    }

    .topcod-container .content ul li.active-item span {
        background: #d92818;
        color: #fff;
        display: inline-block;
        padding: 0 10px;
        line-height: 25px;
    }

    .invest-main {
        margin-top: 30px;
    }

    .record-row {
        padding: 30px;
        border: 1px solid #eee;
        text-align: left;
        display: flex;
        margin-top: 20px;
        background: #f5f5f5
    }

    .record-row > a {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
    }

    .record-row:hover {
        background: #fff;
    }

    .record-row .el-col-3:first-child, .record-row .el-col-16 {
        border-right: 1px solid #eee;
    }

    .record-row .el-col-3 p:first-child {
        color: #999;
        font-size: 120%;
    }

    .record-row .el-col-3 p:last-child {
        color: #dc2618;
        margin-top: 30px;
    }

    .record-row .el-col-3 p:last-child span {
        font-size: 200%;
    }

    .record-row .el-col-16 .el-row {
        margin-top: 20px;
    }

    .record-row .el-col-16 .el-row .el-col {
        line-height: 2em;
    }

    .record-row .el-col-16 .el-col p {
        color: #999;
    }

    .record-row .el-col-16 .el-col span {
        font-size: 130%;
    }
    .record-row .el-col-4:last-child p{
        text-align: center;
        font-size: 14px;
        color: #dc2618;
        height: 30px;
        line-height: 30px;
    }
    .record-row .el-col-4:last-child{
        text-align: center;
        margin-top: 30px;
    }
    .main-page {
        margin-top: 20px;
    }
</style>
