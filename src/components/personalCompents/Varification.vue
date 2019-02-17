<template>
    <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
        <el-tab-pane label="手机认证" name="first" class="mess-rigitem">
            <div v-if="!v_mobile">
                <div class="cp-warn">
                    <i class="icon iconfont">&#xe60f;</i>为了您的充值提现便捷安全操作，请输入真实的手机号码，完成手机验证
                </div>
                <el-form :inline="true" :label-position="labelPosition" label-width="100px" :model="mobileForm"
                         :rules="rules" ref="mobileForm" class="form-custom flex mcompany">
                    <el-row>
                        <el-form-item label="手机号码：" prop="mobile">
                            <el-input v-model="mobileForm.mobile" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-button @click="senderCode('VarifyPhone')"
                                   v-if="!mobileForm.sendDisabled||!mobileForm.verifySuccess">
                            <span>获取验证码</span>
                        </el-button>
                        <el-button type="primary" :disabled="true" v-else>
                            <span>{{mobileForm.time+'秒后重新获取'}}</span>
                        </el-button>
                    </el-row>
                    <el-row>
                        <el-form-item label="验证码：" prop="code">
                            <el-input v-model="mobileForm.code" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="cus-btns">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('mobileForm')">提交更新</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
            <div class="verify-succes" v-else>
                <div class="iconStar">
                    <i class="icon iconfont">&#xe615;</i>您可以通过经常性修改您的密码确保您的账户安全，以免受到意外损失
                </div>
                <el-form :inline="true" :model="mobileFormNew" :rules="rules3" ref="mobileFormNew">
                    <el-row class="varif-items">
                        <el-col :span="4">
                            <i class="icon iconfont">&#xe611;</i>
                        </el-col>
                        <el-col :span="20">
                            <div>温馨提示：您好！您已经验证了号码为{{userInfo.mobile | hideMobile}}的号码</div>
                        </el-col>
                    </el-row>
                    <div class="step1">
                        <p>通过验证码修改您原有的手机</p>
                        <p class="mt20">您已绑定的手机号码为{{userInfo.mobile | hideMobile}}，如要修改，请单击下面按钮。收到验证码短信后，请将收到的验证码短信在第二步输入。</p>
                        <el-row>
                            <el-col class="mt20">
                                <el-form-item label="新手机号码：" prop="newMobile">
                                    <el-input v-model="mobileFormNew.newMobile"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="senderCode('VarifySuccess')"
                                               v-if="!mobileFormNew.sendDisabled||!mobileFormNew.verifySuccess">
                                        <span>获取验证码</span>
                                    </el-button>
                                    <el-button type="primary" :disabled="true" v-else>
                                        <span>{{mobileFormNew.time+'秒后重新获取'}}</span>
                                    </el-button>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item label="手机验证码：" prop="code">
                                    <el-input v-model="mobileFormNew.code"></el-input>
                                    <el-button type="primary" class="mt20" @click="submitForm('mobileFormNew')">完成手机验证</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="实名认证" name="second" class="mess-rigitem">
            <div v-if="!v_identity">
                <div class="cp-warn">
                    <i class="icon iconfont">&#xe60f;</i>为了您能顺利通过验证，请填写您真实的姓名和身份证号码
                </div>
                <el-form :inline="true" :label-position="labelPosition" label-width="130px" :model="CertificationForm"
                         :rules="rules2" ref="CertificationForm" class="form-custom flex mcompany">
                    <el-row>
                        <el-form-item label="真实姓名：" prop="trueName">
                            <el-input v-model="CertificationForm.trueName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="身份证号码：" prop="userCode">
                            <el-input v-model="CertificationForm.userCode" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="cus-btns">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('CertificationForm')">提交更新</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </div>
            <div class="verify-succes" v-else>
                <div class="iconStar">
                    <i class="icon iconfont">&#xe615;</i>您可以通过经常性修改您的密码确保您的账户安全，以免受到意外损失
                </div>
                <el-row class="varif-items">
                    <el-col :span="4">
                        <i class="icon iconfont">&#xe6ba;</i>
                    </el-col>
                    <el-col :span="20">
                        <div class="tips">温馨提示：您好！您已经验证了号码为{{userInfo.mobile | hideMobile}}的号码</div>
                        <el-row>
                            <p><b>真实姓名：</b>{{userInfo.name}}</p>
                        </el-row>
                        <el-row>
                            <p><b>身份证号：</b>{{userInfo.identity | hideIdentity}}</p>
                        </el-row>

                    </el-col>
                </el-row>
            </div>
        </el-tab-pane>
        <!--<el-tab-pane label="身份证图片上传" name="third" class="mess-rigitem">-->

            <!--<el-form>-->
                <!--<el-row>-->
                    <!--<el-form-item style="text-align:left">-->
                        <!--<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"-->
                                   <!--:on-preview="handlePreview" :on-remove="handleRemove" :file-list="codePhotos">-->
                            <!--<el-button size="small" type="primary">上传文件</el-button>-->
                            <!--<div slot="tip" class="el-upload__tip">请上传 身份证正反面照片</div>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->
                <!--</el-row>-->
            <!--</el-form>-->
            <!--<div class="cp-tips">-->
                <!--<p><i class="icon iconfont">&#xe60f;</i>请注意以下事项：</p>-->
                <!--<p>1、我们将通过全国公民身份信息中心（NCIIC）系统对您提交的身份进行审核</p>-->
                <!--<p>2、实名认证是您绑定银行卡和使用慧鑫财富|P2P投资理财平台核心功能的必要条件,提现时的银行帐户名以您提交的认证信息为准。</p>-->
                <!--<p>3、如果您在验证过程中，出现任何问题，请联系网站客服。</p>-->
            <!--</div>-->
        <!--</el-tab-pane>-->

    </el-tabs>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'HeadAndPass',
        data () {
            var validatePhone = (rule, value, callback) => {
                let _r = /^1[34578]\d{9}$/;
                if (!value) {
                    this.mobileForm.sendDisabled = true;
                    this.mobileForm.verifySuccess = false;
                    callback(new Error('请输入手机号'));
                } else {
                    if (!_r.test(value)) {
                        this.mobileForm.sendDisabled = true;
                        this.mobileForm.verifySuccess = false;
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        this.mobileForm.sendDisabled = false;
                        this.mobileForm.verifySuccess = true;
                        callback();
                    }
                }
            };
            var validatePhone2 = (rule, value, callback) => {
                let _r = /^1[34578]\d{9}$/;
                if (!value) {
                    this.mobileFormNew.sendDisabled = true;
                    this.mobileFormNew.verifySuccess = false;
                    callback(new Error('请输入手机号'));
                } else {
                    if (!_r.test(value)) {
                        this.mobileFormNew.sendDisabled = true;
                        this.mobileFormNew.verifySuccess = false;
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        this.mobileFormNew.sendDisabled = false;
                        this.mobileFormNew.verifySuccess = true;
                        callback();
                    }
                }
            };
            var validateUserCode = (rule, value, callback) => {
                let _r = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!value) {
                    callback(new Error('请输入身份证号'));
                } else {
                    if (!_r.test(value)) {
                        callback(new Error('请输入正确的身份证号'));
                    } else {
                        callback();
                    }
                }

            };
            return {
                activeName: 'first',
                labelPosition: 'right',
                v_mobile: false,
                v_identity: false,
                mobileForm: {
                    mobile: '',
                    code: '',
                    time: 60,
                    sendDisabled: false,
                    verifySuccess: false
                },
                rules: {
                    mobile: [
                        {validator: validatePhone, required: true, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                CertificationForm: {
                    trueName: '',
                    userCode: ''
                },
                rules2: {
                    trueName: [
                        {required: true, message: '请输入您的真实姓名', trigger: 'blur'}
                    ],
                    userCode: [
                        {validator: validateUserCode, required: true, trigger: 'blur'}
                    ]
                },
                mobileFormNew: {
                    changeVerify: '',
                    newMobile: '',
                    code: '',
                    time: 60,
                    sendDisabled: false,
                    verifySuccess: false
                },
                rules3: {
                    newMobile: [
                        {validator: validatePhone2, required: true, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                codePhotos: []
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        created(){
            this.v_mobile = this.userInfo.v_mobile;
            this.v_identity = this.userInfo.v_identity;
        },
        methods: {
            handleClick() {

            },
            ...mapActions([
                'sendCode','verifyMobile','verifyIdentity','setUserInfo'
            ]),
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //验证成功后所需调用的方法
                        if (formName === 'mobileForm') {
                            this.verifyMobile({mobile:this.mobileForm.mobile,code:this.mobileForm.code}).then(response => {
                                // 手机号验证成功
                                this.v_mobile = true;
                                this.userInfo.v_mobile = 1;
                                this.userInfo.mobile = this.mobileForm.mobile;
                                this.setUserInfo(this.userInfo);
                                sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(this.userInfo)));
                            });
                        } else if (formName === 'mobileFormNew') {
                            this.verifyMobile({mobile:this.mobileFormNew.newMobile,code:this.mobileFormNew.code}).then(response => {
                                // 手机号验证成功
                                this.v_mobile = true;
                                this.userInfo.v_mobile = 1;
                                this.userInfo.mobile = this.mobileFormNew.newMobile;
                                this.setUserInfo(this.userInfo);
                                sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(this.userInfo)));
                                this.mobileFormNew.newMobile = '';
                                this.mobileFormNew.code = '';
                            });
                        } else if (formName === 'CertificationForm') {
                            this.verifyIdentity({name:this.CertificationForm.trueName,identity:this.CertificationForm.userCode}).then(response => {
                                // 身份证验证成功
                                this.v_identity = true;
                                this.userInfo.v_identity = 1;
                                this.userInfo.identity = this.CertificationForm.userCode;
                                this.userInfo.name = this.CertificationForm.trueName;
                                this.setUserInfo(this.userInfo);
                                sessionStorage.setItem('authUser', Base64.encode(JSON.stringify(this.userInfo)));
                            });
                        } else {

                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handlePreview(){
            },
            handleRemove(){
            },
            senderCode(type){
                let me = this;
                if (type === 'VarifyPhone') {
                    if (me.mobileForm.verifySuccess) {
                        me.mobileForm.sendDisabled = true;
                        let interval = window.setInterval(function () {
                            if ((me.mobileForm.time--) <= 0) {
                                me.mobileForm.time = 60;
                                me.mobileForm.sendDisabled = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    }
                    this.sendCode({mobile:this.mobileForm.mobile});

                } else {
                    if (me.mobileFormNew.verifySuccess) {
                        me.mobileFormNew.sendDisabled = true;
                        let interval = window.setInterval(function () {
                            if ((me.mobileFormNew.time--) <= 0) {
                                me.mobileFormNew.time = 60;
                                me.mobileFormNew.sendDisabled = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    }
                    this.sendCode({mobile:this.mobileFormNew.newMobile});
                }

            }

        },
        filters: {
            hideMobile(val){
                if(val){
                    return val.replace(/^(.{3}).+(.{4})$/g,"$1****$2");
                }
            },
            hideIdentity(val){
                if(val){
                    return val.replace(/^(.{3}).+(.{4})$/g,"$1***********$2");
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mcompany {
        margin-top: 20px;
    }

    .mcompany .el-input {
        width: 360px;
    }

    .upload-demo {
        width: 500px;
        margin-left: 56px;
    }

    .verify-succes .iconStar {
        padding: 10px;
        text-align: left;
        background: #fff;
    }

    .iconStar i {
        font-size: 100%;
        margin-right: 5px;
        color: #d92818;
    }

    .v-btn {
        text-align: center;
        margin-top: 30px;
    }

    .varif-items {
        text-align: left;
        display: flex;
        margin-top: 20px;
        background: #fff;
        border: 1px solid #ddd;
    }

    .varif-items .tips {
        color: #d92818;
    }

    .varif-items .el-col-4 {
        text-align: center;
        position: relative;
        border-right: 1px solid #ddd;
    }

    .varif-items .el-col-4 i {
        font-size: 300%;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -26px 0 0 -26px;
        color: #d92818;
    }

    .varif-items .el-col-20 {
        padding: 0 0 10px 20px;
    }

    .varif-items .el-col-20 > div:first-child {
        line-height: 36px;
        padding-top: 10px;
    }

    .varif-items .el-col-20 .el-form-item {
        margin-bottom: 0;
    }

    .step1 {
        margin-top: 20px;
        background: #fff;
        text-align: left;
        padding: 10px 20px 20px 20px;
    }

    .step1 .mt20 {
        margin-top: 20px;
    }

    .step1 p:first-child {
        line-height: 36px;
        border-bottom: 1px dashed #ddd;
    }

    .varif-items .el-col-20 .el-row p {
        font-size: 90%;
        line-height: 36px;
    }
</style>
