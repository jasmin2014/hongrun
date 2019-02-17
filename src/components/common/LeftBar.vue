<template>
    <el-col :span="5" class="mess-left">
        <div>
            <router-link to="/personal/pandect"><i class="icon iconfont">&#xe619;</i>账户信息总览</router-link>
        </div>
        <ul class="m-itemlist">
            <li :class="{'active-item':isActiveIndex==='0'}">
                <p class="m-itemtitle" @click="isActiveIndex='0'">
                    <i class="icon iconfont m-iconleft">&#xe623;</i>基本设置
                    <i class="icon iconfont m-iconright">&#xe60e;</i>
                </p>
                <ul v-show="isActiveIndex==='0'">
                    <li :class="[routePath == '/personal/person' ? 'active-item':'','']">
                        <router-link to="/personal">基本资料</router-link>
                    </li>
                    <li :class="[routePath == '/personal/setpass' ? 'active-item':'','']">
                        <router-link to="/personal/setpass">头像与密码</router-link>
                    </li>
                    <li :class="[routePath == '/personal/varification' ? 'active-item':'','']">
                        <router-link to="/personal/varification">认证中心</router-link>
                    </li>
                    <!--<li @click="isChildActive='03'" :class="{'active-item':isActiveIndex==='0'&&isChildActive==='03'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">系统消息</a>-->
                    <!--</li>-->
                    <!--<li @click="isChildActive='04'" :class="{'active-item':isActiveIndex==='0'&&isChildActive==='04'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">积分</a>-->
                    <!--</li>-->
                </ul>
            </li>
            <li :class="{'active-item':isActiveIndex==='1'}">
                <p class="m-itemtitle" @click="isActiveIndex='1'">
                    <i class="icon iconfont m-iconleft">&#xe78b;</i>资金管理
                    <i class="icon iconfont m-iconright">&#xe60e;</i>
                </p>
                <ul v-show="isActiveIndex==='1'">
                    <!--<li>-->
                        <!--<a href="javascript:void(0);" @click="handleClick">资金统计</a>-->
                    <!--</li>-->
                    <li :class="[routePath == '/personal/recharge' ? 'active-item':'','']">
                        <router-link to="/personal/recharge">我要充值</router-link>
                    </li>
                    <li :class="[routePath == '/personal/withdraw' ? 'active-item':'','']">
                        <router-link to="/personal/withdraw">我要提现</router-link>
                    </li>
                    <li :class="[routePath == '/personal/account' ? 'active-item':'','']">
                        <router-link to="/personal/account">银行账户</router-link>
                    </li>
                    <li :class="[routePath == '/personal/redpackage' ? 'active-item':'','']">
                        <router-link to="/personal/redpackage">我的红包</router-link>
                    </li>
                </ul>
            </li>
            <li :class="{'active-item':isActiveIndex==='2'}">
                <p class="m-itemtitle" @click="isActiveIndex='2'">
                    <i class="icon iconfont m-iconleft">&#xe61e;</i>投资管理
                    <i class="icon iconfont m-iconright">&#xe60e;</i>
                </p>
                <ul v-show="isActiveIndex==='2'">
                    <li :class="[routePath == '/personal/spread' ? 'active-item':'','']">
                        <router-link to="/personal/spread">散标投资</router-link>
                    </li>
                    <!--<li @click="isChildActive='01'" :class="{'active-item':isActiveIndex==='2'&&isChildActive==='01'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">定期理财</a>-->
                    <!--</li>-->
                    <!--<li @click="isChildActive='02'" :class="{'active-item':isActiveIndex==='2'&&isChildActive==='02'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">散标债券转让</a>-->
                    <!--</li>-->
                    <!--<li @click="isChildActive='03'" :class="{'active-item':isActiveIndex==='2'&&isChildActive==='03'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">授权接口</a>-->
                    <!--</li>-->
                    <!--<li @click="isChildActive='04'" :class="{'active-item':isActiveIndex==='2'&&isChildActive==='04'}">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">自动投标</a>-->
                    <!--</li>-->
                </ul>
            </li>
            <li :class="{'active-item':isActiveIndex==='3'}">
                <p class="m-itemtitle" @click="isActiveIndex='3'">
                    <i class="icon iconfont m-iconleft">&#xe60b;</i>借款管理
                    <i class="icon iconfont m-iconright">&#xe60e;</i>
                </p>
                <ul v-show="isActiveIndex==='3'">
                    <li :class="[routePath == '/personal/borrowin' ? 'active-item':'','']">
                        <router-link to="/personal/borrowin">借款总表</router-link>
                    </li>
                    <li :class="[routePath == '/personal/quota' ? 'active-item':'','']">
                        <router-link to="/personal/quota">额度申请</router-link>
                    </li>
                    <li>
                        <a href="javascript:void(0);" @click="handleClick">资料上传</a>
                    </li>
                </ul>
            </li>
            <!--<li :class="{'active-item':isActiveIndex==='4'}">-->
                <!--<p class="m-itemtitle" @click="isActiveIndex='4'">-->
                    <!--<i class="icon iconfont m-iconleft">&#xe6a2;</i>邀请管理-->
                    <!--<i class="icon iconfont m-iconright">&#xe60e;</i>-->
                <!--</p>-->
                <!--<ul v-show="isActiveIndex==='4'">-->
                    <!--<li :class="[routePath == '/personal/account' ? 'active-item':'','']">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">邀请好友</a>-->
                    <!--</li>-->
                    <!--<li :class="[routePath == '/personal/account' ? 'active-item':'','']">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">资金记录</a>-->
                    <!--</li>-->
                    <!--<li :class="[routePath == '/personal/account' ? 'active-item':'','']">-->
                        <!--<a href="javascript:void(0);" @click="handleClick">推广明细</a>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</li>-->
        </ul>
        <div class="ips-btn">
            <el-button type="danger" round @click="registerAccount" v-show="!userInfo.ips_acct_no">开通托管账户</el-button>
            <el-button type="danger" round @click="LoginAccount" v-show="userInfo.ips_acct_no">登陆环迅</el-button>
        </div>
        <div id="ipsForm" style="border: none;"></div>
    </el-col>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    export default {
        props: ['isLogin', 'isRegister', 'activePage'],
        name: 'LeftBar',
        data () {
            return {
                isActiveIndex: '0',
                routePath: ''
            }
        },
        created(){
            this.routePath = this.$route.path;
        },
        watch: {
            '$route' (to, from) {
                this.routePath = this.$route.path;

                if(this.routePath == '/personal/person' || this.routePath == '/personal/setpass' || this.routePath == '/personal/varification'){
                    this.isActiveIndex = '0';
                }
                if(this.routePath == '/personal/recharge' || this.routePath == '/personal/withdraw' || this.routePath == '/personal/account'|| this.routePath == '/personal/redpackage'){
                    this.isActiveIndex = '1';
                }
                if(this.routePath == '/personal/spread'){
                    this.isActiveIndex = '2';
                }
                if(this.routePath == '/personal/borrowin' || this.routePath == '/personal/quota'){
                    this.isActiveIndex = '3';
                }

            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            ...mapActions([
                'ipsRegister','ipsLogin'
            ]),
            registerAccount(){
                let _this = this;
                if(this.userInfo.v_mobile && this.userInfo.v_identity){
                    this.ipsRegister(null).then(response => {
                        $('#ipsForm').html(response);
                    });
                }else{
                    window.vue.$alert('请先实名认证','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
                        _this.$router.push({path:'/personal/varification'});
                    }});
                }

            },
            LoginAccount(){
                let _this = this;
                if(this.userInfo.v_mobile && this.userInfo.v_identity){
                    this.ipsLogin(null).then(response => {
                        $('#ipsForm').html(response);
                    });
                }else{
                    window.vue.$alert('请先实名认证','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
                        _this.$router.push({path:'/personal/varification'});
                    }});
                }
            },
            handleClick() {
                window.vue.$alert('正在开发中,敬请期待~','提示信息',{confirmButtonText: '确定',type:'error'});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mess-left {
        padding: 10px 0;
        background: rgba(255, 255, 255, 1);
    }

    .mess-left > div {
        line-height: 40px;
        border-bottom: 1px solid #d92818;
    }

    .mess-left > div i {
        font-size: 130%;
        color: #d92818;
        margin-right: 10px;
    }

    .m-itemlist {
        padding: 0 20px;
        text-align: left;
    }

    .m-itemlist > li {
        line-height: 50px;
        position: relative;
        cursor: pointer;
    }

    .m-itemlist > li .m-itemtitle {
        border-bottom: 1px solid #ddd;
    }

    .m-iconleft {
        font-size: 110%;
        margin-right: 13px;
    }

    .m-iconright {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 0;
    }

    .m-itemtitle:hover, .m-itemtitle:hover i {
        color: #d92818;
    }

    .m-itemlist > li ul li {
        line-height: 40px;
        font-size: 85%;
    }

    .m-itemlist > li ul li a{
        display: block;
        padding-left: 40px;
    }

    .m-itemlist > li.active-item, .m-itemlist > li.active-item li.active-item a {
        color: #d92818;
    }

    /*.m-itemlist > li ul li a:hover,.m-itemlist > li ul li a:link,.m-itemlist > li ul li a:visited {
      color: #d92818;
    }*/
    .ips-btn{
        padding: 20px;
        border: none !important;
    }

    .ips-btn button{
        width: 100%;
        margin: 0;
    }
</style>
