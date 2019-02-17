<template>
    <div class="mascro-content rel">
        <div id="ipsForm" style="border: none;"></div>
        <top-header></top-header>
        <header-nav></header-nav>
        <div class="rdetail-main" v-loading.body="loading">
            <div class="rdetail-main-w">
                <el-row class="content">
                    <el-col :span="15">
                        <el-row>
                            <el-col :span="18">{{bid.title}}</el-col>
                            <el-col :span="6">
                                <router-link to="/invest/agreement">投资协议范文预览</router-link>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="16">
                                <p>预期年化收益<span><i>{{bid.loan_rate}}</i>%</span></p>
                                <div style="width:80%;">
                                    <el-progress :percentage="getPercent(bid.bid_amount,bid.amount)"></el-progress>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <p>项目期限<span v-if="bid.term_unit == '月'">{{bid.term}}个</span><span
                                        v-else>{{bid.term}}</span>{{bid.term_unit}}</p>
                                <p>项目总额<span>{{bid.amount}}</span>元</p>
                                <p>项目奖励<span>0.00</span>%</p>
                            </el-col>
                        </el-row>
                        <el-row class="col-15-row">
                            <el-col :span="12"><span>还款方式 :</span> {{bid.useage | getBidRepayment}}</el-col>
                            <el-col :span="12"><span>起投金额 :</span> ￥{{bid.low_money}}</el-col>
                            <el-col :span="12"><span>借款用途 :</span> {{bid.useage | getBidUseage}}</el-col>
                            <el-col :span="12"><span>开标时间 :</span> {{bid.gmt_start}}</el-col>
                            <el-col><span>剩余时间 :</span><span v-if="getBidTime(bid.gmt_start) > startTime">
                                  <count-down class="count-down" :currentTime="startTime" :startTime="startTime"
                                              :endTime="getBidTime(bid.gmt_start)" :dayTxt="'天'" :hourTxt="'小时'"
                                              :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
                            </span>
                                <span v-else>00时00分00秒</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-row class="8-row-first">
                            <el-col :span="12">剩余可投</el-col>
                            <el-col :span="12">￥{{(bid.amount - bid.bid_amount).toFixed(2)}}元</el-col>
                            <el-col :span="12">账户余额</el-col>
                            <el-col :span="12" v-if="isEmptyObject(userInfo)">￥0.00元</el-col>
                            <el-col :span="12" v-else>￥{{userInfo.balance}}元</el-col>
                            <el-col class="earnings">预期收益：<b>0.00</b>元</el-col>
                            <el-col class="mt30" v-if="isEmptyObject(userInfo)">还未登录？请先
                                <router-link to="/login">登录</router-link>
                            </el-col>

                        </el-row>
                        <el-row class="lastrow">
                            <el-form v-if="!isEmptyObject(userInfo)" :inline="true" label-width="150px"
                                     :model="amountForm">
                                <div v-if="showBidInput(bid.status,bid.gmt_start)">
                                    <el-form-item label="输入投标金额：">
                                        <el-input v-model="amountForm.amount" placeholder="请输入投资金额"></el-input>
                                    </el-form-item>
                                    <el-form-item label="输入定向密码：" v-if="bid.is_specify">
                                        <el-input v-model="amountForm.password" placeholder="请输入定向标密码"></el-input>
                                    </el-form-item>
                                    <el-row v-show="hasBonus">
                                        <el-col class="usered">
                                            <el-checkbox v-model="useBonus">使用红包<span style="color: red;">（选中红包金额：{{selectAmount}}）</span></el-checkbox>
                                            <i class="icon iconfont" @click="handleShowCoupon">&#xe620;</i>
                                        </el-col>
                                    </el-row>
                                    <p style="color:red;height: 30px;line-height: 30px;font-size: 12px;"
                                       v-show="amountForm.shorError">{{amountForm.ErrorMsg}}</p>
                                    <el-button type="danger" @click="handleBid">立即投标</el-button>
                                </div>
                                <div v-else>
                                    <el-button type="danger" style="background: #999;border: 1px solid #999;">
                                        {{bid.status | getBtnTxt(bid.gmt_start)}}
                                    </el-button>
                                </div>
                            </el-form>
                            <el-col v-else>
                                <el-button type="primary" @click="handleLogin">立即登录</el-button>
                            </el-col>
                            <!-- <el-col>投资有风险，理财需谨慎</el-col> -->
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div class="content usermessage">
                <el-row>
                    <el-col :span="8">真实姓名：{{bid.user.name | hideName}}</el-col>
                    <el-col :span="8">性别：{{bid.user.sex | getSex}}</el-col>
                    <el-col :span="8">婚姻状况：{{bid.user.is_marry | getMarry}}</el-col>
                    <el-col :span="8">月收入(元)：{{bid.user.income | getIncome}}</el-col>
                    <el-col :span="8">年龄：{{bid.user.age}}岁</el-col>
                    <el-col :span="8">户籍所在地：{{bid.native_place}}</el-col>
                    <el-col :span="8">是否购车：{{bid.user.is_car | getBool}}</el-col>
                    <el-col :span="8">学历：{{bid.user.education | getEducation}}</el-col>
                    <!--<el-col :span="8">职位：{{bid.user.occupation}}</el-col>-->
                </el-row>
            </div>
            <div class="content userrecords">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="借款详情" name="first">
                        <div v-html="bid.desc"></div>
                        <div style="margin-top:20px;">
                            <p v-for="(image,index) in bid.images" @click="showBigPic(index)"
                               style="float: left;width: 180px;height: 180px;margin-top:10px;margin-right: 10px;">
                                <img :src="image" style="width: 100%;height: 100%;"/>
                            </p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="安全审核" name="second">
                        经平台风控部检验并商议审核通过同意其借款申请。
                    </el-tab-pane>
                    <el-tab-pane label="投资记录" name="third">
                        <el-row class="investlist">
                            <el-col :span="24">
                                <el-table :data="bid.bid_record" class='table-center' border>
                                    <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
                                    <el-table-column prop="username" :formatter="hideName"
                                                     label="投资人"></el-table-column>
                                    <el-table-column prop="amount" label="投资金额"></el-table-column>
                                    <el-table-column prop="gmt_create" label="投资时间"></el-table-column>
                                    <el-table-column prop="bid_type" label="投资方式"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
        <el-dialog title="请选择可使用红包" :visible.sync="showCoupDialog">
            <div class="m-box">
                <div class="m-box-content">
                    <el-checkbox-group v-model="checkedCoupons" @change="handleCheckedCouponsChange">
                        <el-row class="m-box-checkboxes">
                            <el-col :span="8" v-for="coupon in couponList" style="margin-bottom: 15px;">
                                <div class="m-checkbox-red">
                                    <img src="../assets/images/redPakage.png" style="margin-left: 30px;">
                                </div>
                                <el-checkbox :label="coupon.id">{{coupon.category | getCouponCategory}}(¥{{coupon.amount}})</el-checkbox>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                    <el-row class="m-red-txt">
                        <p>选择红包总额：<span>{{ selectAmount }}</span>元</p>
                    </el-row>
                    <el-row class="m-red-btns">
                        <el-button @click="handleOkCoupon">确定</el-button>
                        <el-button @click="handleCancelCoupon">取消</el-button>
                    </el-row>
                </div>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="showPic">
            <img :src="curPic" style="width: 100%"/>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import CountDown from 'vue2-countdown'
    import {MessageBox} from 'element-ui'
    import enums from '../utils/enums.js';
    import TopHeader from '../components/common/TopHeader';
    import HeaderNav from '../components/common/HeaderNav';
    import FooterWrap from '../components/common/Footer';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        components: {TopHeader, HeaderNav, FooterWrap, CountDown},
        name: 'InvestDetail',
        data () {
            return {
                startTime: 0,
                activeName: 'first',
                checked: false,
                curPic: '',
                showPic: false,
                bid: {
                    user: {},
                    bid_record: [],
                    currentTime: {}
                },
                amountForm: {
                    amount: '',
                    password: '',
                    shorError: false,
                    ErrorMsg: ''
                },
                loading: false,
                hasBonus: true,
                useBonus: false,
                showCoupDialog: false,
                checkedCoupons: [],
                couponList:[],
                selectAmount: '0.00',
                bidStatus: 0
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        created(){
            this.getDetail();
        },
        mounted (){
            let _this = this;
            if (this.userInfo.bonus) {
                this.hasBonus = true;
            }

            if (!_this.isEmptyObject(this.userInfo)) {
                if (this.userInfo.v_mobile && this.userInfo.v_identity && !this.userInfo.ips_acct_no) {
                    MessageBox.alert('请先开通托管账户', '提示信息', {
                        confirmButtonText: '确定', type: 'error', callback: action => {
                            _this.ipsRegister(null).then(response => {
                                $('#ipsForm').html(response);
                            });
                        }
                    });
                }
                // 重新设置用户信息
                this.queryUserInfo(null).then(function (resp) {
                    _this.setUserInfo(resp.account);
                    sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(resp.account)));
                });
            }
        },
        methods: {
            ...mapActions([
                'ipsRegister', 'queryUserInfo', 'queryBidDetail', 'ipsFreeze', 'ipsBid', 'setUserInfo','queryUserCoupon'
            ]),
            getDetail(){
                let me = this;
                me.loading = true;
                me.$store.dispatch('queryBidDetail', {id: me.$route.query.id})
                    .then(response => {
                        me.loading = false;
                        me.bid = response;
                        me.startTime = GV.now;
                        me.getBidStatus(response);
                    });
            },
            handleClick(){
//                this.getDetail();
            },
            handleBid(){
                let me = this;

                if (me.bid.is_specify && !me.amountForm.password) {
                    me.amountForm.shorError = true;
                    me.amountForm.ErrorMsg = '请输入定向标密码';
                    return;
                }

                if (me.amountForm.amount >= parseFloat(me.bid.low_money) && me.amountForm.amount <= (me.bid.amount - me.bid.bid_amount)) {
                    me.amountForm.shorError = false;

                    if (!this.userInfo.v_mobile || !this.userInfo.v_identity) {
                        window.vue.$alert('请先完成实名认证', '提示信息', {
                            confirmButtonText: '确定', type: 'error', callback: action => {
                                me.$router.push({path: '/personal/varification'});
                            }
                        });
                    }

                    if (me.amountForm.amount > parseFloat(this.userInfo.balance)) {
                        window.vue.$alert('余额不足，请先去充值', '提示信息', {
                            confirmButtonText: '确定', type: 'error', callback: action => {
                                me.$router.push({path: '/personal/recharge'});
                            }
                        });
                    } else {
                        if(this.useBonus){
                            // 使用红包
                            if(me.amountForm.amount < 10000){
                                me.amountForm.shorError = true;
                                me.amountForm.ErrorMsg = '投标金额大于10000才可使用红包';
                                return;
                            }
                            if(this.selectAmount > 0){
                                this.ipsBid({id: this.bid.id, amount: (this.amountForm.amount - this.selectAmount),bonus: this.selectAmount,password: this.amountForm.password, coupon_ids: this.checkedCoupons}).then(response => {
                                    $('#ipsForm').html(response);
                                });
                            }else{
                                me.amountForm.shorError = true;
                                me.amountForm.ErrorMsg = '请选择需要使用的红包';
                                return;
                            }
                        }else{
                            // 不使用红包
                            this.ipsFreeze({id: this.bid.id, amount: this.amountForm.amount,password: this.amountForm.password}).then(response => {
                                $('#ipsForm').html(response);
                            });
                        }
                    }
                } else {
                    me.amountForm.amount = '';
                    me.amountForm.shorError = true;
                    me.amountForm.ErrorMsg = me.bid.low_money + '元起投，不高于剩余可投金额，请重新输入！'
                }
            },
            handleLogin() {
                this.$router.push({path: '/login'});
            },
            getPercent(current, total) {
                if (total) {
                    let result = (current / total) * 100;
                    return Number.parseFloat(result.toFixed(2));
                }
            },
            isEmptyObject(val) {
                return $.isEmptyObject(val);
            },
            getBidStatus(val) {

            },
            hideName(item){
                if (item) {
                    if(item.username.length < 3){
                        return item.username.replace(/^(.{1}).*$/g, "$1**");
                    }else{
                        return item.username.replace(/^(.{1}).+(.{1})$/g, "$1**$2");
                    }
                }
            },
            showBidInput(status, start){
                if (start) {
                    let now = this.startTime;
                    let begin = new Date(Date.parse(start.replace(/-/g, "/"))).getTime() / 1000;

                    if (status == 2 && begin <= now) {
                        return true
                    } else {
                        return false;
                    }
                }
            },
            getBidTime(val) {
                if (val) {
                    return new Date(Date.parse(val.replace(/-/g, "/"))).getTime() / 1000;
                } else {
                    return 0;
                }
            },
            indexMethod(index) {
                return index;
            },
            handleShowCoupon(){
                let _this = this;
                // type 1:虚拟红包 status:未使用
                this.queryUserCoupon({noPage:true,type:1,status:2}).then(response => {
                    _this.couponList = response;
                    if(response.length){
                        this.showCoupDialog = true;
                    }else{
                        window.vue.$alert('您没有可以使用的红包', '提示信息', {confirmButtonText: '确定', type: 'error', callback: action => {}});
                    }
                });
            },
            handleCheckedCouponsChange(val){
                let couponAmount = 0;
                $.each(this.couponList,function (idx, item) {
                    if($.inArray(item.id,val) !== -1){
                        couponAmount += parseFloat(item.amount);
                    }
                });
                this.selectAmount = couponAmount.toFixed(2);
            },
            showBigPic(index){
                this.showPic = true;
                this.curPic = this.bid.images[index];
            },
            handleOkCoupon(){
                this.showCoupDialog = false;
                this.useBonus = true;
            },
            handleCancelCoupon(){
                this.showCoupDialog = false;
                this.useBonus = false;
                this.selectAmount = '0.00';
            }
        },
        filters: {
            getBool(val) {
                return enums.getDesc('BOOL', val);
            },
            getSex(val) {
                return enums.getDesc('SEX', val);
            },
            getEducation(val) {
                return enums.getDesc('EDUCATION', val);
            },
            getIncome(val) {
                return enums.getDesc('INCOME', val);
            },
            getHouse(val) {
                return enums.getDesc('HOUSE', val);
            },
            getBidUseage(val) {
                return enums.getDesc('BID_USEAGE', val);
            },
            getBidType(val) {
                return enums.getDesc('BID_TYPE', val);
            },
            getBidRepayment(val) {
                return enums.getDesc('BID_REPAYMENT', val);
            },
            getMarry(val) {
                return enums.getDesc('MARRY', val);
            },
            getCouponCategory(val) {
                return enums.getDesc('COUPON_CATEGORY', val);
            },
            hideName(val){
                if (val) {
                    return val.replace(/^(.).+$/g, "$1*");
                }
            },
            getBtnTxt(status, start){
                if (start) {
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rdetail-main {
        width: 100%;
    }
    .rdetail-main-w {
        width: 100%;
        padding: 30px 0;
        background: url('../assets/images/reg-bg.jpg') no-repeat center center;
        background-size: cover;
    }

    .rdetail-main-w .content {
        background: rgba(255, 255, 255, .9);
        padding: 20px 30px;
    }

    .rdetail-main {
        text-align: left;
    }

    .rdetail-main-w .el-col-15 .el-col-6 {
        text-align: right;
    }

    .rdetail-main-w .el-col-15 .el-col-6 a {
        color: #d92818;
        font-size: 85%;
    }

    .rdetail-main-w .el-col-15 .el-col-16 {
        margin-top: 50px;
    }

    .rdetail-main-w .el-col-15 .el-col-8 {
        margin-top: 40px;
    }

    .rdetail-main-w .el-col-15 .el-col-16 p {
        font-size: 90%;
        color: #999;
    }

    .rdetail-main-w .el-col-15 .el-col-16 p span {
        font-size: 150%;
        color: #d92818;
    }

    .rdetail-main-w .el-col-15 .el-col-16 span i {
        font-size: 180%;
        font-style: normal;
        margin: 0 10px;
    }

    .rdetail-main-w .el-col-15 .el-col-16 div {
        margin-top: 30px;
    }

    .rdetail-main-w .el-col-15 .el-col-8 p {
        margin-top: 20px;
        font-size: 90%;
        color: #999;
    }

    .rdetail-main-w .el-col-15 .el-col-8 p:first-child {
        margin-top: 0;
    }

    .rdetail-main-w .el-col-15 .el-col-8 p span {
        font-size: 150%;
        margin: 0 5px 0 15px;
        color: #333;
    }

    .col-15-row {
        background: #fff;
        padding: 20px;
        margin-top: 30px;
        border: 1px solid #eee;
        font-size: 85%;
    }

    .col-15-row .el-col-12, .col-15-row .el-col-24 {
        line-height: 36px;
    }

    .col-15-row .el-col-12 span, .col-15-row .el-col-24 span:first-child {
        color: #999;
    }

    .col-15-row .el-col-24 span:last-child {
        color: #d92818;
    }

    .rdetail-main-w > .el-row > .el-col-8 .el-row:first-child {
        padding: 20px;
        background: #fff;
        border: 1px solid #eee;
    }

    .rdetail-main-w > .el-row > .el-col-8 .el-row:first-child .el-col-12 {
        line-height: 36px;
    }

    .rdetail-main-w > .el-row > .el-col-8 .el-row:first-child .el-col-12:nth-child(2n-1) {
        font-size: 90%;
        color: #999;
    }

    .rdetail-main-w > .el-row > .el-col-8 .el-row:first-child .el-col-12:nth-child(2n) {
        text-align: right;
    }

    .mt30 {
        margin-top: 30px;
    }

    .rdetail-main-w > .el-row > .el-col-8 .el-row:first-child .el-col-24.mt30 {
        line-height: 36px;
        text-align: center;
        border: 1px solid #ddd;
        background: #fff;
        font-size: 90%;
        color: #999;
    }

    .rdetail-main-w .el-col-24.earnings {
        line-height: 40px;
        margin-top: 20px;
    }

    .rdetail-main-w .el-col-24.earnings b {
        color: #d92818;
        font-size: 150%;
        margin-right: 10px;
    }

    .lastrow {
        margin-top: 15px;
    }

    .lastrow .el-col-24:first-child {
        width: 100%;
        margin-top: 30px;
    }

    .lastrow .el-col-24.usered:first-child {
        position: relative;
        width: 80%;
        margin: 0 0 15px 35px;
        border: 1px dashed #ccc;
        text-align: left;
        padding-left: 10px;
    }

    .lastrow .el-col-24.usered i.iconfont {
        color: #d92818;
        position: absolute;
        right: 8px;
        top: 50%;
        margin-top: -18px;
        font-weight: bold;
        cursor: pointer;
    }

    .lastrow .el-col-24 .el-button {
        width: 100%;
        display: block;
    }

    .lastrow .el-col-24:last-child {
        line-height: 36px;
        font-size: 85%;
        color: #999;
        text-align: center;
    }

    .usermessage > .el-row {
        display: block;
        padding: 30px;
        margin-top: 30px;
        border: 1px solid #ddd;
        background: #eee;
        font-size: 85%;
        line-height: 30px;
    }

    .userrecords {
        margin: 30px auto;
    }

    .investlist {
        display: flex;
    }

    .investlist .el-col-5 {
        padding: 20px 0;
        border: 1px solid #ddd;
    }

    .investlist .el-col-5 p {
        text-align: center;
        line-height: 36px;
    }

    .investlist .el-col-5 p span {
        font-size: 180%;
    }

    .lastrow .el-form .el-button {
        width: 100%;
    }

    .lastrow .el-form .el-form-item {
        margin-bottom: 15px;
    }

    /*红包*/
    .messageBox {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
    }

    .messageBox .m-mask {
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }

    .messageBox .m-box {
        width: 500px;
        background: rgba(255, 255, 255, 1);
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -150px 0 0 -250px;
        border-radius: 8px;
    }

    .messageBox .m-box h3 {
        height: 40px;
        line-height: 40px;
        font-size: 90%;
        font-weight: normal;
        background: #e8e8e8;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        color: #d92818;
        text-align: left;
        padding-left: 20px;
    }

    .m-box-content {
        padding: 10px 20px;
        text-align: left;
    }

    .m-checked-all .m-checkbox {
        left: 0;
        top: 50%;
        margin-top: -8px;
    }

    .m-checkbox-red input {
        width: 16px;
        height: 16px;
        border: 1px solid #ccc;
        position: absolute;
        right: 0;
        bottom: 0;
        background: #fff;
        margin-bottom: 10px;
    }

    .m-checkbox-red {
        position: relative;
        width: 80px;
        margin-bottom: 10px;
    }

    .m-checkbox-red img {
        width: 100%;
    }

    .m-red-txt {
        margin-top: 10px;
    }

    .m-red-txt p {
        font-size: 90%;
        line-height: 30px;
    }

    .m-red-txt p span {
        color: #d92818;
    }

    .m-red-btns {
        text-align: center;
        margin-top: 20px;
    }

    .m-red-btns .el-button {
        padding-left: 30px;
        padding-right: 30px;
    }

    .m-red-btns .el-button:first-child {
        background: #d92818;
        color: #fff;
        border: none;
    }
</style>
