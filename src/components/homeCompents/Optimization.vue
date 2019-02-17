<template>
    <div class="optimization content clear rel">
        <div class="opt-left left rel">
            <section class="opt-toptxt">
                <h2>优选理财</h2>
                <p>满满收益不容错过</p>
            </section>
            <div class="opt-items abs">
                <p class="active">投资项目</p>
                <p>债券转让</p>
            </div>
            <ul class="opt-btmitem abs clear">
                <li><i class="icon iconfont">&#xe656;</i><br/>期限灵活</li>
                <li><i class="icon iconfont">&#xe730;</i><br/>转让自由</li>
                <li><i class="icon iconfont">&#xe668;</i><br/>多重保障</li>
                <li><i class="icon iconfont">&#xe788;</i><br/>公开透明</li>
            </ul>
        </div>
        <div class="opt-rig left clear" v-loading.body="loading">
            <section class="left" v-for="(bidInfo,index) in bidList">
                <router-link :to="{name:'InvestDetail',query: {id: bidInfo.id}}">
                <h2><span class="opt-mi" v-if="bidInfo.is_specify">密•</span><span class="opt-di">抵•</span>{{bidInfo.title}}</h2>
                <div class="opt-date"><span class="opt-starttime">{{bidInfo.low_money}}元起购，{{bidInfo.gmt_start | formatDate('MM月dd日 hh:mm')}}开标</span></div>
                <div class="opt-profit clear">
                    <div class="left">
                        <span>预期年化利率</span>
                        <p class="opt-bigorange">{{(parseFloat(bidInfo.loan_rate)).toFixed(2)}}%</p>
                    </div>
                    <div class="left">
                        <span>理财期限</span>
                        <p><span class="opt-bigdays">{{bidInfo.term}}<span v-show="bidInfo.term_unit == '月'">个</span></span>{{bidInfo.term_unit}}</p>
                    </div>
                </div>
                <div class="opt-countdown">
                    <div class="opt-ctdline rel"><el-progress :percentage="getPercent(bidInfo.bid_amount,bidInfo.amount)"></el-progress></div>
                    <div class="opt-cdwrap" v-if="showCountDown(bidInfo.status,bidInfo.gmt_start)">
                        <p>开标倒计时</p>
                        <div class="opt-cdbtn">
                            <count-down class="count-down" :currentTime="startTime" :startTime="startTime" :endTime="getBidTime(bidInfo.gmt_start)" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
                        </div>
                    </div>
                    <div class="opt-cdwrap" v-else>
                        <p style="color:red;" v-show="showStartBid(bidInfo.status,bidInfo.gmt_start)">抢标进行中...</p>
                        <div class="opt-cdwrap-btn" v-if="showStartBid(bidInfo.status,bidInfo.gmt_start)">{{bidInfo.status | getBtnTxt(bidInfo.gmt_start)}}</div>
                        <div class="opt-cdwrap-grey" v-else>{{bidInfo.status | getBtnTxt(bidInfo.gmt_start)}}</div>
                    </div>
                </div>
                </router-link>
            </section>
        </div>
        <div class="opt-more abs"><router-link :to="{name:'InvestRecords'}"  class="icon iconfont">&#xe687;</router-link></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import CountDown from 'vue2-countdown'
    import enums from '../../utils/enums.js';
    import {mapGetters, mapActions} from 'vuex';
    import {formatDate} from '../../utils/tools';
    
    export default {
        name: 'TopBanner',
        components: {CountDown},
        data () {
            return {
                startTime: 0,
                bidList: [],
                loading: false
            }
        },
        created(){
            let me = this;
            me.getList();             
        },
        methods: {
            ...mapActions([
                'queryBidList'
            ]),
            getList(){
                let me = this;
                me.loading = true;
                me.$store.dispatch('queryBidList',{pageSize:3,noPage:true})
                .then(response => {
                    me.startTime = GV.now;
                    me.loading = false;
                    me.bidList = response;
                });
            },
            getPercent(current,total) {
                let result = (current / total) * 100;
                return parseFloat(result.toFixed(2));
            },
            getBidTime(val) {
                if(val){
                    return new Date(Date.parse(val.replace(/-/g, "/"))).getTime() / 1000;
                }else{
                    return 0;
                }
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
            showStartBid(status, start){
                let now = this.startTime;
                let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;;

                if (status == 2 && begin <= now) {
                    return true
                } else {
                    return false;
                }
            }
        },
        filters: {
            formatDate(val,fmt) {
                return formatDate(new Date(val),fmt);
            },
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

<style scoped>
    .opt-left {
        width: 200px;
        height: 400px;
        background: url("../../assets/images/index_content_1.png") no-repeat top center #fa5e5e;
        padding-top: 68px;
    }

    .opt-toptxt h2, .opt-toptxt p {
        color: #fa5e5e;
    }

    .opt-toptxt h2 {
        font-weight: normal;
        line-height: 1.6em;
    }

    .opt-toptxt p {
        font-size: 85%;
    }

    .opt-items {
        width: 140px;
        left: 50%;
        top: 50%;
        margin: -30px 0 0 -70px;
    }

    .opt-items p {
        width: 100%;
        border-radius: 15px;
        line-height: 30px;
        background: #ffe591;
        margin-top: 10px;
        font-size: 85%;
        color: #fa5e5e;
    }

    .opt-items p:hover, .opt-items p.active {
        background: #fff;
    }

    .opt-btmitem {
        left: 0;
        bottom: 20px;
        width: 100%;
    }

    .opt-btmitem li {
        width: 50%;
        float: left;
        text-align: center;
        font-size: 75%;
        color: #ffe591;
        margin-top: 10px;
    }

    .opt-btmitem li i {
        font-weight: bold;
        font-size: 160%;
        color: #ffe591;
    }

    .opt-rig {
        overflow: hidden;
        width: 990px;
        height: 400px;
    }

    .opt-rig > section {
        width: 330px;
        height: 400px;
        float: left;
        border: 1px solid #eee;
        border-left: none;
    }

    .opt-rig > section:hover {
        box-shadow: 0 0 8px #ccc;
    }

    .opt-rig > section h2 {
        font-size: 100%;
        font-weight: normal;
        line-height: 40px;
        margin-top: 20px;
    }

    .opt-rig > section h2 span {
        font-size: 110%;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        margin-right: 5px;
        font-weight: bold;
    }

    .opt-rig > section h2 span.opt-mi {
        color: #fa5e5e;
    }

    .opt-rig > section h2 span.opt-di {
        color: #00d398;
    }

    .opt-rig > section .opt-date span.opt-starttime {
        display: inline-block;
        width: auto;
        padding: 3px 5px;
        color: #fdb563;
        border-radius: 0;
        font-size: 75%;
        line-height: 18px;
        font-weight: normal;
    }

    .opt-profit {
        width: 80%;
        margin: 50px auto 30px auto;
    }

    .opt-profit > div {
        width: 50%;
    }

    .opt-bigorange {
        font-size: 200%;
        color: #fa5e5e;
    }

    .opt-bigdays {
        font-size: 200%;
        color: #00d398;
    }

    .opt-profit > div > p, .opt-profit > div > p > span {
        line-height: 2em;
    }

    .opt-profit > div:first-child {
        border-right: 1px solid #eee;
    }

    .opt-countdown {
        width: 60%;
        margin: 40px auto 0 auto;
    }

    .opt-ctdline {
        height: 26px;
        line-height: 26px;
    }

    .opt-blankline {
        width: 100%;
        height: 5px;
        background: #eee;
        left: 0;
        top: 10px;
    }

    .opt-ctdline label {
        position: absolute;
        right: -30px;
        top: 0;
    }

    .opt-cdwrap {
        margin-top: 5px;
    }
    .opt-cdwrap-btn {
        width:  100%;
        height: 40px;
        line-height: 40px;
        background: #d92818;
        color: #fff;
        letter-spacing: 8px;
        margin-top: 10px;
    }
    .opt-cdwrap-grey {
        width:  100%;
        height: 40px;
        line-height: 40px;
        background: #b5b5b5;
        color: #fff;
        letter-spacing: 8px;
        margin-top: 10px;
    }
    /*.opt-cdwrap-btn a {
        color: #fff;
        letter-spacing: 8px;
    }*/
    .opt-cdbtn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #b5b5b5;
        color: #fff;
        font-size: 110%;
        margin-top: 10px;
    }

    .opt-more {
        right: 0;
        top: 20px;
        width: 20px;
        height: 100%;
        text-align: center;
        line-height: 40px;
        background: rgba(0, 0, 0, .1);
        margin-top: -20px;
    }

    .opt-more a {
        font-size: 160%;
        color: #fff;
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        margin-top: -20px;
    }

    .opt-more:hover {
        background: rgba(0, 0, 0, .6);
    }
</style>
