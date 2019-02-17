<template>
    <div class="pandect">
        <div class="pan-w1">
            <el-row class="pan-w1-con">
                <el-col :span="15">
                    <section>
                        <h2>{{userInfo.username}}</h2>
                        <p class="pan-txt">投资等级：<span>LV1</span>　　邀请码：{{userInfo.invite_code}}</p>
                        <p class="pan-icons">
                            <i class="icon iconfont" :class="{'validated':isIdentity}" title="实名认证未通过">&#xe6ba;</i>
                            <i class="icon iconfont" :class="{'validated':isMobileAuth}"  title="手机认证未通过">&#xe611;</i>
                            <!--<i class="icon iconfont" :class="{'validated':isEmailAuth}"  title="邮箱认证未通过">&#xe68b;</i>-->
                        </p>
                        <div class="pan-lefticon">
                            <i class="icon iconfont">&#xe605;</i>
                        </div>
                    </section>

                    <el-row class="pan-elrow">
                        <el-col :span="8">
                            <p>可用红包（元）</p>
                            <p>{{parseFloat(userInfo.bonus).toFixed(2)}}</p>
                        </el-col>
                        <el-col :span="8">
                            <p>可用积分</p>
                            <p>0</p>
                        </el-col>
                        <el-col :span="8">
                            <p>待收总额（元）</p>
                            <p>{{(parseFloat(userInfo.in_capital) + parseFloat(userInfo.in_interest)).toFixed(2)}}</p>
                        </el-col>
                    </el-row>

                </el-col>
                <el-col :span="8" :offset="1">
                    <el-row class="align-left">
                        <el-col :span="16">可用余额</el-col>
                        <el-col :span="8" class="align-right">
                            <router-link to="/" class="linkcolr">[对账查询]</router-link>
                        </el-col>
                        <el-col class="rig-amount"><span>￥{{userInfo.balance}}</span></el-col>
                        <el-col class="rig-btns">
                            <el-button type="primary" @click="handleCharge">充值</el-button>
                            <el-button @click="handleWithdraw">提现</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div class="pan-w1 mt20">
            <el-row class="pan-w2-con flex">
                <el-col :span="4">
                    总资产<br/><span>￥{{(parseFloat(userInfo.balance) + parseFloat(userInfo.in_capital) + parseFloat(userInfo.in_interest) + parseFloat(userInfo.freeze)).toFixed(2)}}</span>
                </el-col>
                <el-col :span="1">=</el-col>
                <el-col :span="4">
                    可用余额<br/><span>￥{{userInfo.balance}}</span>
                </el-col>
                <el-col :span="1">+</el-col>
                <el-col :span="4">
                    待收本金<br/><span>￥{{userInfo.in_capital}}</span>
                </el-col>
                <el-col :span="1">+</el-col>
                <el-col :span="4">
                    待收利息<br/><span>￥{{userInfo.in_interest}}</span>
                </el-col>
                <el-col :span="1">+</el-col>
                <el-col :span="4">
                    冻结资金<br/><span>￥{{userInfo.freeze}}</span>
                </el-col>
            </el-row>
            <el-row class="pan-w2-con mt20 flex">
                <el-col :span="4">
                    待还总额<br/><span>￥{{(parseFloat(userInfo.out_capital) + parseFloat(userInfo.out_interest)).toFixed(2)}}</span>
                </el-col>
                <el-col :span="1">=</el-col>
                <el-col :span="4">
                    待还本金<br/><span>￥{{userInfo.out_capital}}</span>
                </el-col>
                <el-col :span="1">+</el-col>
                <el-col :span="4">
                    待还利息<br/><span>￥{{userInfo.out_interest}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="pan-w1 mt20">
            <h2 class="pan-w3-title">交易记录</h2>

            <el-table :data="dealMessageData" class='table-center' border>
                <el-table-column prop="dealDate" label="发生日期"></el-table-column>
                <el-table-column prop="dealType" label="类型"></el-table-column>
                <el-table-column prop="affectAmount" label="影响金额"></el-table-column>
                <el-table-column prop="frozenAmount" label="冻结金额"></el-table-column>
                <el-table-column prop="collectAmount" label="待收金额"></el-table-column>
                <el-table-column prop="userfulAmount" label="可用金额"></el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'Pandect',
        data () {
            return {
                dealMessageData: [{  //交易记录表格字段描述
                    dealDate: '',  //发生日期
                    dealType: '',  //类型
                    affectAmount: '', //影响金额
                    frozenAmount: '',  //冻结金额
                    collectAmount: '',  //待收金额
                    userfulAmount: ''  //可用金额
                }],
                isIdentity:true,
                isMobileAuth:false,
                isEmailAuth:true
            }
        },
        created(){
            this.isMobileAuth = this.userInfo.v_mobile;
            this.isIdentity = this.userInfo.v_identity;
        },
        mounted (){
            let _this = this;

            // 重新设置用户信息
            this.queryUserInfo(null).then(function(resp){
                _this.setUserInfo(resp.account);
                sessionStorage.setItem('authUser',Base64.encode(JSON.stringify(resp.account)));
            });
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            ...mapActions([
                'queryUserInfo','setUserInfo'
            ]),
            handleCharge() {
                this.$router.push({path:'/personal/recharge'});
            },
            handleWithdraw() {
                this.$router.push({path:'/personal/withdraw'});
            }
        }
    }
</script>

<style scoped>
    .align-left {
        text-align: left;
    }

    .align-right {
        text-align: right;
    }

    .pandect {
        font-size: 85%;
    }

    .pan-w1 {
        background: rgba(255, 255, 255, 1);
        padding: 20px;
    }

    .pan-w1.mt20 {
        margin-top: 20px;
    }

    .pan-w1 .el-row .el-col-9 {
        border-left: 1px solid #ddd;
    }

    .pan-w1-con .el-col-15 section h2 {
        color: #d92818;
        font-size: 140%;
        line-height: 1.6em;
        font-weight: normal;
    }

    .pan-w1-con .el-col-15 .pan-txt {
        color: #666;
    }

    .pan-w1-con .el-col-15 section {
        text-align: left;
        position: relative;
        padding-left: 140px;
    }

    .pan-icons {
        margin-top: 10px;
    }

    .pan-icons i {
        font-size: 150%;
        color: #999;
        margin-right: 10px;
    }
    .pan-icons i.validated {
        color: #d92818;
    }

    .pan-icons i:first-child {
        font-size: 160%;
    }

    .pan-lefticon {
        width: 86px;
        height: 86px;
        text-align: center;
        line-height: 76px;
        background: #ddd;
        position: absolute;
        left: 20px;
        top: 5px;
        border-radius: 50%;
    }

    .pan-lefticon i {
        font-size: 240%;
        color: #bbb;
    }

    .pan-txt span {
        color: #fff;
        background: #ff9502;
        padding: 1px 8px;
        border-radius: 2px;
        text-shadow: 0 0 2px #d92818;
    }

    .pan-elrow {
        width: 86%;
        margin: 40px auto 0 auto;
    }

    .pan-elrow .el-col {
        text-align: left;
    }

    .pan-elrow .el-col p:last-child {
        font-size: 160%;
        font-weight: bold;
        color: #666;
        line-height: 2em;
    }

    .pan-elrow .el-col:first-child p:last-child {
        color: #d92818;
    }

    .pan-w1 .el-row .el-col-15 {
        border-right: 1px solid #eee;
    }

    .rig-amount {
        margin-top: 40px;
    }

    .rig-amount span {
        font-size: 200%;
        color: #d92818;
        margin-right: 10px;
    }

    .linkcolr {
        color: #00A4FC;
    }

    .rig-btns {
        padding-top: 35px;
    }

    .rig-btns .el-button {
        width: 80px;
    }

    .rig-btns .el-button--default {
        margin-left: 20px;
    }

    .pan-w2-con {
        display: flex;
        margin-top: 20px;
    }

    .pan-w2-con .el-col-4 span {
        font-size: 160%;
        line-height: 2em;
    }

    .pan-w2-con .el-col-4:first-child span {
        color: #d92818;
    }

    .pan-w2-con .el-col-1 {
        line-height: 70px;
    }

    .pan-w2-con:first-child {
        border-bottom: 1px dashed #eee;
    }

    .pan-w3-title {
        line-height: 2em;
        font-size: 100%;
        font-weight: normal;
        text-align: left;
    }
</style>
