<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="mascro-content rel">
        <div class="login">
            <top-header :is-register="true"></top-header>
            <div class="log-headernav">
                <header-nav :is-register="true"></header-nav>
            </div>
            <div class="content reg-wrap clear rel">
                <section class="login-lefttxt abs">
                    <p>投资最高1%奖励</p>
                    <p class="second-child">邀请好友</p>
                    <p>邀请好友一起赚起投资奖励</p>
                </section>
                <div class="login-wrap right">
                    <section class="login-now register">
                        <h2><i class="icon iconfont">&#xe619;</i>注册宏润共创<a href="/login">去登录</a></h2>
                        <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="RegisterForm"
                                 :rules="rules" ref="RegisterForm" class="form-custom flex reg-input">
                            <el-row>
                                <el-form-item label="用户昵称" prop="username">
                                    <el-input v-model="RegisterForm.username" class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="RegisterForm.mobile" class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="登录密码" prop="password">
                                    <el-input type="password" v-model="RegisterForm.password"
                                              class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="6" class="reg-passStre">密码强度：</el-col>
                                <el-col :span="17" class="reg-strength">
                                    <el-row v-if="RegisterForm.passwordWeal">
                                        <el-col :span="8" class="isweal">弱</el-col>
                                        <el-col :span="8">中</el-col>
                                        <el-col :span="8">强</el-col>
                                    </el-row>
                                    <el-row v-else-if="RegisterForm.passwordMiddle">
                                        <el-col :span="8" class="ismiddle">弱</el-col>
                                        <el-col :span="8" class="ismiddle">中</el-col>
                                        <el-col :span="8">强</el-col>
                                    </el-row>
                                    <el-row v-else-if="RegisterForm.passwordStrength">
                                        <el-col :span="8" class="isStrength">弱</el-col>
                                        <el-col :span="8" class="isStrength">中</el-col>
                                        <el-col :span="8" class="isStrength">强</el-col>
                                    </el-row>
                                    <el-row v-else>
                                        <el-col :span="8">弱</el-col>
                                        <el-col :span="8">中</el-col>
                                        <el-col :span="8">强</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row style="margin-top: 15px;">
                                <el-form-item label="确认密码" prop="repassword">
                                    <el-input type="password" v-model="RegisterForm.repassword"
                                              class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-col :span="15">
                                    <el-form-item label="图形验证" prop="code">
                                        <el-input v-model="RegisterForm.code" class="login-code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item class="login-codepic">
                                        <img :src="yzmStr" @click="getCheckCode" style="width: 90%;height: 36px;">
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="邀请码：">
                                        <el-input type="text" v-model="RegisterForm.invite_code"
                                                  class="login-input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="18" :offset="6">
                                    <el-form-item>
                                        <template>
                                            <el-checkbox v-model="RegisterForm.agreeChecked" disabled><a href="#">同意《注册服务协议》</a>
                                            </el-checkbox>
                                        </template>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="login-nowbtn">
                                <el-col class="login">
                                    <button type="button" @click="submitForm('RegisterForm')" v-bind:disabled="!btnStatus"
                                            :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">
                                        &#xe609;</i>{{btnTxt}}
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
        name: 'Register',
        data () {
            var validateUsername = (rule, value, callback) => {
                let _r = /^[a-zA-Z0-9]{3,15}$/;
                if (!value) {
                    callback(new Error('请输入用户名'));
                } else {
                    if (!_r.test(value)) {
                        callback(new Error('用户名为4-16位字母或数字'));
                    } else {
                        callback();
                    }
                }

            };
            var validatePhone = (rule, value, callback) => {
                let _r = /^1[34578]\d{9}$/;
                if (!value) {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!_r.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }

            };
            var validatePass = (rule, value, callback) => {
                let _f = this.RegisterForm;
                if (!value) {
                    callback(new Error('请输入登录密码'));

                } else {
                    if (value.length < 6) {
                        console.log("gaegwg");
                        _f.passwordWeal = false;
                        _f.passwordMiddle = false;
                        _f.passwordStrength = false;
                        callback(new Error('请输入6-18位字符'));
                    } else if (value.length >= 6 && value.length <= 10) {
                        _f.passwordWeal = true;
                        _f.passwordMiddle = false;
                        _f.passwordStrength = false;
                        callback();
                    } else if (value.length > 10 && value.length <= 14) {
                        _f.passwordWeal = false;
                        _f.passwordMiddle = true;
                        _f.passwordStrength = false;
                        callback();
                    } else if (value.length > 14 && value.length <= 18) {
                        _f.passwordWeal = false;
                        _f.passwordMiddle = false;
                        _f.passwordStrength = true;
                        callback();
                    } else {
                        _f.passwordWeal = false;
                        _f.passwordMiddle = false;
                        _f.passwordStrength = false;
                        callback(new Error('请输入6-18位字符'));
                    }
                }
            };
            var validateRePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (value != this.RegisterForm.password) {
                        callback(new Error('两次输入密码不一致'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                labelPosition: 'right',
                btnStatus: true,
                btnTxt: '立即注册',
                RegisterForm: {
                    username: '',
                    mobile: '',
                    password: '',
                    repassword: '',
                    code: '',
                    invite_code: '',
                    passwordWeal: false,
                    passwordMiddle: false,
                    passwordStrength: false,
                    referrerName: '',
                    agreeChecked: true
                },
                yzmStr: '',
                rules: {
                    username: [
                        {validator: validateUsername, required: true, trigger: 'blur'}
                    ],
                    mobile: [
                        {validator: validatePhone, required: true, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, required: true, trigger: 'change'}
                    ],
                    repassword: [
                        {validator: validateRePass, required: true, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入图形验证码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getCheckCode();
        },
        methods: {
            ...mapActions([
                'register','getYzm'
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
                           username: this.RegisterForm.username,
                           password: md5(this.RegisterForm.password),
                           mobile: this.RegisterForm.mobile,
                           invite_code: this.RegisterForm.invite_code
                        };
                        this.btnStatus = false;
                        this.btnTxt = '正在注册中';
                        this.$store.dispatch('register',formData)
                                .then(response => {
                                    this.btnStatus = true;
                                    this.btnTxt = '立即注册';
                                    this.$router.push({path:'/personal/pandect'})
                                }, response => {
                                    this.btnStatus = true;
                                    this.btnTxt = '立即注册';
                                });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login-wrap > .login-now.register {
        margin-top: -300px;
    }
    .reg-input .el-form-item {
        margin-bottom: 20px;
    }

    .content.reg-wrap {
        padding: 30px 0;
    }

    .reg-strength {
        background: #ccc;
        font-size: 75%;
        margin-top: 10px;
    }

    .reg-strength .isweal {
        background: red;
    }

    .reg-strength .ismiddle {
        background: #ffbd00;
    }

    .reg-strength .isStrength {
        background: #00d398;
    }

    .reg-passStre {
        font-size: 14px;
        line-height: 36px;
    }

    .reg-passTxt {
        font-size: 85%;
        margin-top: -8px;
        color: red;
    }

    .login-codepic {
        cursor: pointer;
    }

    .login-wrap .form-custom {
        padding-left: 0;
    }

    .login-nowbtn .el-col.login button.disabled{
        background: #ccc;
    }
</style>
