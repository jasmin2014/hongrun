<template>
    <div class="bid content clear">
        <div class="bid-left left clear">
            <div class="left" v-loading.body="loading">
                <h2><i class="icon iconfont iconred">&#xe650;</i>大家都在抢</h2>
                <ul class="bid-list">
                    <li class="clear" v-for="(bid,index) in bidRecord" :key="index">
                        <span class="left">{{bid.gmt_create | calcDateDiff}}</span>
                        <span class="left">{{bid.username | hideName}}</span>
                        <span class="left">投资{{bid.amount}}元</span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <h2><i class="icon iconfont iconblue">&#xe61d;•</i>合作伙伴</h2>
                <div><img src="../../assets/images/paylogo.jpg"></div>
                <!-- <ul class="clear">
                  <li><a href="#"><img src="../../assets/images/logo1.jpg"></a></li>
                  <li><a href="#"><img src="../../assets/images/logo2.jpg"></a></li>
                </ul> -->
            </div>
        </div>
        <div class="bid-rig right rel">
            <section class="bid-tit">
                <h2><i class="icon iconfont">&#xe608;</i>抢标 • 合作</h2>
                <p>大家都在抢，赶紧来合作吧</p>
            </section>
            <section class="bid-btns abs">
                <i class="icon iconfont">&#xe7c3;</i>
            </section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {GetDateTimeDiff,formatDate} from '../../utils/tools';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'RankingList',
        data () {
            return {
                bidRecord: [],
                loading: false
            }
        },
        created(){
            this.getBidRecord();
        },
        methods: {
            ...mapActions([
                'queryBidRecord'
            ]),
            getBidRecord() {
                let _this = this;
                _this.loading = true;
                this.queryBidRecord(null).then(function(resp){
                    _this.loading = false;
                    _this.bidRecord = resp
                });
            }
        },
        filters: {
            hideName(val){
                if(val){
                    if(val.length < 3){
                        return val.replace(/^(.{1}).*$/g, "$1**");
                    }else{
                        return val.replace(/^(.{1}).+(.{1})$/g, "$1**$2");
                    }
                }
            },
            calcDateDiff(val){
                if(val){
                    return GetDateTimeDiff(new Date(val),new Date()).PubTime;
                }
            }
        }
    }
</script>

<style scoped>
    .bid {
        margin-top: 30px;
    }

    .bid-rig {
        width: 200px;
        height: 300px;
        background: #05a5c4;
    }

    .bid-tit {
        padding-top: 20px;
    }

    .bid-tit h2 {
        font-size: 150%;
        font-weight: normal;
        color: #fff;
    }

    .bid-tit h2 i {
        font-size: 140%;
        color: #fff;
        margin-right: 5px;
    }

    .bid-tit > p {
        font-size: 95%;
        line-height: 2.4em;
        margin-top: 10px;
        color: #fff;
    }

    .bid-btns {
        width: 140px;
        top: 50%;
        left: 50%;
        margin: -20px 0 0 -70px;
    }

    .bid-btns i {
        font-size: 500%;
        color: #fff;
    }

    .bid-left {
        width: 990px;
        padding: 20px 0 20px 20px;
        border: 1px solid #eee;
        border-right: none;
        height: 300px;
    }

    .bid-left > div {
        width: 470px;
    }

    .bid-left > div h2 {
        font-size: 120%;
        font-weight: normal;
        text-align: left;
        padding: 15px 0;
    }

    .bid-left > div h2 i {
        font-size: 120%;
        margin-right: 5px;
    }

    .bid-left > div h2 i.iconred {
        color: #fa5e5e;
    }

    .bid-left > div h2 i.iconblue {
        color: #05a5c4;

    }

    .bid-list li {
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }

    .bid-list li > span {
        width: 33%;
        text-align: left;
    }

    .bid-list li > span:last-child {
        text-align: right;
    }

    .bid-left > div:last-child ul li {
        width: 50%;
        float: left;
        text-align: left;
    }

    .bid-left > div:last-child ul li img {
        border: 1px solid #eee;
    }
</style>
