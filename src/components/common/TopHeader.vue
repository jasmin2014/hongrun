<template>
    <div class="top-header">
        <div class="content clear" v-if="isEmptyObject(userInfo)">
            <div class="left">欢迎致电：0577-63191188　服务时间：9:00-17:00</div>
            <ul class="top-rig right clear">
                <li><a href="#" class="icon iconfont">&#xe643;</a></li>
                <li><a href="#" class="icon iconfont">&#xe66f;</a></li>
                <li>
                    <router-link to="/reg">注册</router-link>
                </li>
                <li>
                    <router-link to="/login">登录</router-link>
                </li>
            </ul>
        </div>
        <div class="content clear logined" v-else>
            <div class="left">欢迎致电：4008016299　服务时间：9:00-18:00</div>
            <ul class="top-rig right clear">
                <li><a href="#" class="icon iconfont">&#xe643;</a></li>
                <li><a href="#" class="icon iconfont">&#xe66f;</a></li>
                <li><a href="javascript:void(0);" @click="handleLogout">退出</a></li>
                <li><a href="#">消息（0）</a></li>
                <li>
                    <router-link to="/personal/pandect">{{userInfo.username}}</router-link>
                    ，欢迎您登录！
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'TopHeader',
        data () {
            return {
            }
        },
        created () {
            this.initUserInfo();
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            ...mapActions([
                'setUserInfo'
            ]),
            initUserInfo() {
                let authUser = sessionStorage.getItem('authUser');
                if (authUser) {
                    let authUser = JSON.parse(Base64.decode(sessionStorage.getItem('authUser')));
                    this.setUserInfo(authUser);
                }else{
                }
            },
            handleLogout(val) {
                sessionStorage.clear();
                this.setUserInfo('');
                this.$router.push({path: '/login'});
            },
            isEmptyObject(val) {
                return $.isEmptyObject(val);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .logined .left a {
        font-size: 160%;
        color: #6d839c;
        margin-left: 15px;
    }

    .logined .right {
        width: 350px;
    }

    .top-header {
        background: #f9f9f9;
        color: #a3a3a3;
        border-bottom: 1px solid #e3e3e3;
        height: 35px;
        line-height: 35px;
        font-size: 75%;
    }

    .top-rig {
        width: 130px;
    }

    .top-rig li {
        float: right;
        padding: 0 5px;
    }

    .top-rig li .icon {
        font-size: 160%;
        color: #6d839c;
    }
</style>
