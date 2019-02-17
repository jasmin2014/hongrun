<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="mascro-content rel">
        <div class="login">
            <top-header :is-login="true"></top-header>
            <div class="log-headernav">
                <header-nav :is-login="true"></header-nav>
            </div>
            <div class="content clear rel">
                <section class="login-lefttxt abs">
                    <p>投资最高1%奖励</p>
                    <p class="second-child">邀请好友</p>
                    <p>邀请好友一起赚起投资奖励</p>
                </section>
                <div class="login-wrap right">
                    <section class="login-now">
                        <h2><i class="icon iconfont">&#xe619;</i>登录宏润共创
                            <router-link to="/findpass">忘记密码？</router-link>
                        </h2>
                        <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="loginForm"
                                 :rules="rules" ref="loginForm" class="form-custom flex">
                            <el-row>
                                <el-form-item label="登录账户" prop="username">
                                    <el-input v-model="loginForm.username" class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="登录密码" prop="password">
                                    <el-input type="password" v-model="loginForm.password"
                                              class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="15">
                                    <el-form-item class="login-yzcode" label="验证码" prop="code">
                                        <el-input v-model="loginForm.code" class="login-code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9" :offset="0">
                                    <el-form-item class="login-codepic">
                                        <img :src="yzmStr" @click="getCheckCode" style="width: 90%;height: 36px;">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="16" :offset="6">
                                    <div class="login-regNow">还没有账号？
                                        <router-link to="/reg">立即注册</router-link>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="login-nowbtn">
                                <el-col class="login">
                                    <button type="button" @click="submitForm('loginForm')" v-bind:disabled="!btnStatus"
                                            :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">
                                        &#xe61a;</i>{{btnTxt}}
                                    </button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </section>
                </div>
            </div>
        </div>
        <footer-wrap :is-login="true"></footer-wrap>
    </div>
</template>

<script type="text/ecmascript-6">
    import TopHeader from '../components/common/TopHeader';
    import HeaderNav from '../components/common/HeaderNav';
    import FooterWrap from '../components/common/Footer';
    import { mapGetters,mapActions } from 'vuex';
    import md5 from 'js-md5';
    export default {
        components: {TopHeader, HeaderNav, FooterWrap},
        name: 'Login',
        data () {
            return {
                labelPosition: 'right',
                btnStatus: true,
                btnTxt: '立即登录',
                loginForm: {
                    username: '',
                    password: '',
                    code: ''
                },
                yzmStr: '',
                rules: {
                    username: [
                        {required: true, message: '请输入登录账户', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '请输入6-18位字符', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getCheckCode();
        },
        methods: {
            ...mapActions([
                'login','getYzm'
            ]),
            getCheckCode(){
                let _this = this;
                this.getYzm().then(function (resp) {
                    _this.yzmStr = resp;
                });
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = {
                            username: this.loginForm.username,
                            password: md5(this.loginForm.password),
                            code: this.loginForm.code
                        };
                        this.btnStatus = false;
                        this.btnTxt = '正在登录中';
                        this.$store.dispatch('login', formData)
                                .then(response => {
                                    this.btnStatus = true;
                                    this.btnTxt = '立即登录';
                                    this.$router.push({path: '/personal/pandect'})
                                }, response => {
                                    this.btnStatus = true;
                                    this.btnTxt = '立即登录';
                                });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .login-wrap > .login-now {
        margin-top: -175px;
    }

    .login-yzcode label.el-form-item__label {
        letter-spacing: 8px;
    }

    .login-regNow {
        margin-bottom: 15px;

    }

    .login-codepic {
        cursor: pointer;
    }

    .login-regNow a {
        color: red;
        text-decoration: underline;
    }

    .login-now .form-custom {
        padding-left: 0;
    }

    .login-nowbtn .el-col.login button.disabled{
        background: #ccc;
    }
</style>
