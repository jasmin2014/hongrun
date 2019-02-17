<template>
    <div class="header-nav">
        <div class="content clear">
            <div class="nav-left left">
                <a href="/#/" class="logo">宏润共创</a>
            </div>
            <ul class="navs right clear" v-if="!isLogin&!isRegister">
                <li>
                    <router-link to="/">网站首页</router-link>
                </li>
                <li>
                    <router-link to="/invest">我要投资</router-link>
                </li>
                <li>
                    <router-link to="/iborrow">我要借款</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Guide'}">新手指引</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Platform'}">关于我们</router-link>
                </li>
                <li><router-link to="/download" target="_blank">APP下载</router-link></li>
                <li class="user-account">
                    <div>
                        <router-link to="/login" v-if="isEmptyObject(userInfo)">
                            <span class="icon iconfont icon-denglu"></span>请先登录<span class="icon iconfont icon-down">&#xe607;</span>
                        </router-link>
                        <router-link to="/personal/pandect" v-else>
                            <span class="icon iconfont icon-user"></span>个人中心<span class="icon iconfont icon-down">&#xe607;</span>
                        </router-link>
                    </div>
                </li>
            </ul>
            <div v-else-if="isLogin&&!isRegister" class="welcome-login left"><p>欢迎登录</p></div>
            <div v-else-if="!isLogin&&isRegister" class="welcome-login left"><p>欢迎注册</p></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    export default {
        props: ['isLogin', 'isRegister'],
        name: 'HeaderNav',
        data () {
            return {
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            isEmptyObject(val) {
                return $.isEmptyObject(val);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header-nav {
        width: 100%;
        display: block;
        margin: 0 auto;
        height: 80px;
        line-height: 80px;
        font-size: 100%;
        overflow: hidden;
    }

    .header-nav .content {
        display: block;
        width: 1190px;
        margin: 0 auto;
    }

    .nav-left {
        width: 280px;
    }

    .logo {
        display: block;
        width: 240px;
        height: 80px;
        background: url('../../assets/images/logo.jpg') no-repeat center center;
        text-indent: -9999em;
        overflow: hidden;
    }

    .navs {
        margin-left: 20px;
        width: 835px;
    }

    .navs li {
        float: left;
        line-height: 36px;
        padding: 22px 25px;
    }

    .navs li.user-account {
        position: relative;
        width: 130px;
        font-size: 14px;
        height: 36px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #e5e5e5;
        overflow: visible;
        background-color: #f6f6f6;
        padding: 0;
        margin: 22px 0 0 20px;
    }

    .user-account .icon {
        position: absolute;
        top: 50%;
        margin-top: -17px;
        display: block;
        width: 20px;
        height: 20px;
        color: #d92818;
    }

    .user-account > div a .icon.icon-denglu, .user-account > div a .icon.icon-user {
        left: 6px;
    }

    .user-account .icon-down {
        right: 6px;
        font-size: 120%;
        font-weight: bold;
    }

    .welcome-login {
        height: 80px;
    }
</style>
