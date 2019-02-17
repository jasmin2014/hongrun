<template>
    <div class="gross-assets content clear">
        <section>
            <div class="icon-box abs"><span class="icon iconfont">&#xe612;</span></div>
            <div class="icon-txt abs">
                <p>累计交易额</p>
                <p><span class="gross-money">{{amount}}</span>元</p>
            </div>
        </section>
        <section>
            <div class="icon-box abs"><span class="icon iconfont">&#xe61b;</span></div>
            <div class="icon-txt abs">
                <p>累计收益金额</p>
                <p><span class="gross-money">{{profit}}</span>元</p>
            </div>
        </section>
        <section>
            <div class="icon-box abs"><span class="icon iconfont">&#xe65e;</span></div>
            <div class="icon-txt abs">
                <p>待收总额</p>
                <p><span class="gross-money">{{total}}</span>元</p>
            </div>
        </section>
        <section>
            <div class="icon-box abs iconuser"><span class="icon iconfont">&#xe61a;</span></div>
            <div class="icon-txt abs">
                <p>注册用户数</p>
                <p><span class="gross-money">{{userCnt}}</span>人</p>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'TopBanner',
        data () {
            return {
                amount: 0.00,   // 累计交易额
                profit: 0.00,   // 累计收益金额
                total: 0.00,    // 待收总额
                userCnt: 0,     // 注册用户数
            }
        },
        created(){
            this.getStatistics();
        },
        methods: {
            ...mapActions([
                'queryStatistics'
            ]),
            getStatistics() {
                let _this = this;
                this.queryStatistics(null).then(function(resp){
                    _this.amount = resp.amount;
                    _this.profit = resp.profit;
                    _this.total = resp.total;
                    _this.userCnt = resp.userCnt;
                });
            }
        }
    }
</script>

<style scoped>
    .gross-assets > section {
        width: 296px;
        height: 120px;
        float: left;
        margin: 30px 2px 30px 0;
        position: relative;
    }

    .gross-assets > section:last-child {
        margin-right: 0;
    }

    .gross-assets > section .icon-box {
        display: block;
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        border-radius: 50%;
        left: 20px;
        top: 20px;
        background: #b5b5b5;
    }

    .gross-assets > section:hover .icon-box {
        background: #e12315;
    }

    .gross-assets > section:hover .gross-money {
        color: #e12315;
    }

    .gross-assets > section .icon-box span {
        font-size: 240%;
        color: #fff;
    }

    .gross-assets > section .icon-box.iconuser {
        line-height: 60px;
    }

    .icon-txt {
        text-align: left;
        left: 110px;
        top: 25px;
    }

    .icon-txt p:last-child {
        margin-top: 5px;
    }

    .gross-money {
        font-size: 160%;
    }

</style>
