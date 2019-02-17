<template>
    <div class="rankinglist content clear" v-loading.body="loading">
        <div class="rank-left left clear">
            <div class="left">
                <h2><i class="icon iconfont">&#xe67e;</i>本月排行榜</h2>
                <section class="rank-No rel" v-for="(month,index) in monthRank" :key="index">
                    <div class="rank-icon abs">
                        <p class="rank-icon-c rank-no-icon1"></p>
                        <p>{{month.username | hideName}}</p>
                    </div>
                    <div class="rank-no-con">
                        <p><span class="rank-no1">NO{{index + 1}}.</span>占领榜首</p>
                        <p>总共投资<span class="rank-amount">{{month.amount}}</span>元</p>
                    </div>
                </section>
            </div>
            <div class="right">
                <h2><i class="icon iconfont">&#xe67e;</i>总排行榜</h2>
                <section class="rank-No rel" v-for="(all,index) in allRank" :key="index">
                    <div class="rank-icon abs">
                        <p class="rank-icon-c rank-no-icon1"></p>
                        <p>{{all.username | hideName}}</p>
                    </div>
                    <div class="rank-no-con">
                        <p><span class="rank-no1">NO{{index + 1}}.</span>占领榜首</p>
                        <p>总共投资<span class="rank-amount">{{all.amount}}</span>元</p>
                    </div>
                </section>
            </div>
        </div>
        <div class="rank-rig left rel">
            <section class="rank-tit">
                <h2><i class="icon iconfont">&#xe696;</i>排行榜</h2>
                <p>首榜排名，乐享生活</p>
            </section>
            <section class="rank-btns abs">
                <i class="icon iconfont">&#xe602;</i>
            </section>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'RankingList',
        data () {
            return {
                monthRank: [],
                allRank: [],
                loading: false
            }
        },
        created(){
            this.getRankList();
        },
        methods: {
            ...mapActions([
                'queryRankList'
            ]),
            getRankList() {
                let _this = this;
                _this.loading = true;
                this.queryRankList(null).then(function(resp){
                    _this.loading = false;
                    _this.monthRank = resp.monthRank;
                    _this.allRank = resp.allRank;
                });
            }
        },
        filters: {
            hideName(val){
                if(val){
                    return val.replace(/^(.{1}).+(.{1})$/g,"$1**$2");
                }
            }
        }
    }
</script>

<style scoped>
    .rankinglist {
        margin-top: 30px;
    }

    .rankinglist > div {
        height: 400px;
    }

    .rank-left {
        width: 990px;
    }

    .rank-rig {
        width: 200px;
        background: #00d2a7;
    }

    .rank-left > div {
        width: 480px;
    }

    .rank-left > div:first-child {
        border-right: 1px solid #eee;
    }

    .rank-left > div h2 {
        font-size: 120%;
        font-weight: normal;
        text-align: left;
        padding: 15px 0;
    }

    .rank-left > div h2 i {
        font-size: 110%;
        margin-right: 5px;
        color: #ffbd00;
    }

    .rank-tit {
        margin-top: 30px;
    }

    .rank-tit h2 {
        font-size: 160%;
        font-weight: normal;
        color: #fff;
        letter-spacing: 4px;
    }

    .rank-tit h2 i {
        font-size: 130%;
        color: #fff;
    }

    .rank-tit p {
        color: #fff;
        line-height: 2em;
        margin-top: 5px;
    }

    .rank-btns {
        width: 140px;
        top: 50%;
        left: 50%;
        margin: -20px 0 0 -70px;
    }

    .rank-btns i {
        font-size: 500%;
        color: #fff;
    }

    .rank-btns > div {
        width: 100%;
        border-radius: 20px;
        height: 30px;
        line-height: 30px;
        background: #00b9aa;
        color: #fff;
        font-size: 75%;
        margin-top: 10px;
    }

    .rank-btns > div.active {
        background: #fff;
        color: #00b9aa;
    }

    .rank-No {
        height: 100px;
        padding-left: 115px;
        margin-top: 15px;
    }

    .rank-icon {

        left: 0;
        top: 0;

    }

    .rank-icon p:last-child {
        font-size: 85%;
    }

    .rank-icon-c {
        width: 60px;
        height: 60px;
        background: url('../../assets/images/sprite_zmj.png');
    }

    .rank-no-icon1 {
        background-position: 0 -78px;
    }

    .rank-no-icon2 {
        background-position: 0 -150px;
    }

    .rank-no-icon3 {
        background-position: 0 -218px;
    }

    .rank-no-con {
        text-align: left;
        padding-top: 10px;
    }

    .rank-no-con p:first-child {
        line-height: 2em;
    }

    .rank-no1 {
        font-weight: bold;
        color: #fa5e5e;
        font-size: 120%;
    }

    .rank-amount {
        color: #00d398;
        font-size: 120%;
        margin: 0 10px;
    }
</style>
