<template>
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
                        <h2><i class="icon iconfont">&#xe619;</i>找回密码 </h2>
                        <el-form :inline="true" :label-position="labelPosition" label-width="80px" :model="findPassForm"
                                 :rules="rules" ref="findPassForm" class="form-custom flex">
                            <el-row>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input v-model="findPassForm.mobile" class="login-input" id="mobile"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="验证码" prop="code">
                                    <el-input v-model="findPassForm.code"
                                              class="login-input code-input"></el-input>
                                    <el-button @click="senderCode" v-if="!findPassForm.sendMsgDisabled||!findPassForm.verifyMobileSuccess">
                                        <span>获取手机验证码</span>
                                    </el-button>
                                    <el-button type="primary" :disabled="true" v-else>
                                        <span>{{findPassForm.time}}秒后重新获取</span>
                                    </el-button>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="新密码" prop="password">
                                    <el-input type="password" v-model="findPassForm.password"
                                              class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="确认密码" prop="repassword">
                                    <el-input type="password" v-model="findPassForm.repassword"
                                              class="login-input"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row class="login-nowbtn">
                                <el-col class="login">
                                    <button type="button" @click="submitForm('findPassForm')"  v-bind:disabled="!btnStatus"
                                            :class="[btnStatus ? '':'disabled']"><i class="icon iconfont">
                                        &#xe61a;</i>立即找回
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
    import { mapGetters, mapActions } from 'vuex';
    import md5 from 'js-md5';
    export default {
        components: {TopHeader, HeaderNav, FooterWrap},
        name: 'Login',
        data () {
            var validatePhone = (rule, value, callback) => {
                let _r = /^1[34578]\d{9}$/;
                if (!value) {
                    this.findPassForm.sendMsgDisabled = true;
                    this.findPassForm.verifyMobileSuccess = false;
                    console.log(this.findPassForm.verifyMobileSuccess);
                    callback(new Error('请输入手机号'));
                } else {
                    if (!_r.test(value)) {
                        this.findPassForm.sendMsgDisabled = true;
                        this.findPassForm.verifyMobileSuccess = false;
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        this.findPassForm.sendMsgDisabled = false;
                        this.findPassForm.verifyMobileSuccess = true;
                        callback();
                    }
                }
            };
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入登录密码'));

                } else {
                    if (value.length < 6) {
                        console.log("gaegwg");
                        callback(new Error('请输入6-18位字符'));
                    } else if (value.length >= 6 && value.length <= 10) {
                        callback();
                    } else if (value.length > 10 && value.length <= 18) {
                        callback();
                    } else {
                        callback(new Error('请输入6-18位字符'));
                    }
                }
            };
            var validateRePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (value != this.findPassForm.password) {
                        callback(new Error('两次输入密码不一致'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                labelPosition: 'right',
                btnStatus: true,
                btnTxt: '立即登录',
                findPassForm: {
                    mobile: '',
                    code: '',
                    password: '',
                    repassword: '',
                    sendMsgDisabled: false,
                    verifyMobileSuccess:false,
                    time: 60
                },
                rules: {
                    mobile: [
                        {validator: validatePhone, required: true, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入短信验证码', trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, required: true, trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validateRePass, required: true, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'sendCode','findPassword'
             ]),
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         let formData = {
                             mobile:this.findPassForm.mobile,
                             code:this.findPassForm.code,
                             password: md5(this.findPassForm.password)
                         };

                         this.btnStatus = false;
                         this.btnTxt = '找回密码中';
                         this.$store.dispatch('findPassword',formData).then(response => {
                             this.btnStatus = true;
                             this.btnTxt = '立即找回';
                             this.$router.push({path:'login'})
                         });
                    } else {
                        return false;
                    }
                });
            },
            senderCode(){
                let me = this;

                if(me.findPassForm.verifyMobileSuccess){
                    me.findPassForm.sendMsgDisabled = true;
                    let interval = window.setInterval(function() { 
                        if ((me.findPassForm.time--) <= 0) {
                            me.findPassForm.time = 60;
                            me.findPassForm.sendMsgDisabled = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
                }

                this.sendCode({mobile:this.findPassForm.mobile});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .login-wrap > .login-now {
        margin-top: -200px;
    }

    .login-yzcode label.el-form-item__label {
        letter-spacing: 8px;
    }

    .login-regNow {
        margin-bottom: 15px;

    }

    .login-regNow a {
        color: red;
        text-decoration: underline;
    }

    .login-now .form-custom {
        padding-left: 0;
    }

    .login-now .el-form-item__content .el-input.login-input.code-input {
        width: 114px;
    }
</style>
