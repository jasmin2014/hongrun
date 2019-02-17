<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的头像" name="first" class="mess-rigitem">
            我的头像区域：页面待写
        </el-tab-pane>
        <el-tab-pane label="修改登录密码" name="second" class="mess-rigitem">

            <div class="cp-warn">
                <i class="icon iconfont">&#xe60f;</i>您可以通过经常性修改密码更好的保护您的账号安全，以避免您受到意外损失
            </div>
            <div class="cp-tips">
                <p>1、经常性修改密码能有效的保护您的帐号安全</p>
                <p>2、涉及到您的资金安全，请勿设置简单的密码，不要设置和其它网站相同的密码</p>
            </div>
            <el-form :inline="true" :label-position="labelPosition" label-width="150px" :model="messPassForm"
                     :rules="rules" ref="messPassForm" class="form-custom flex mcompany">
                <el-row>
                    <el-form-item label="用户名：">
                        {{messPassForm.authUser.username}}
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="请输入原密码：" prop="oldPass">
                        <el-input type="password" v-model="messPassForm.oldPass"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="请输入新密码：" prop="newPass">
                        <el-input type="password" v-model="messPassForm.newPass"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="请再输入新密码：" prop="reNewPass">
                        <el-input type="password" v-model="messPassForm.reNewPass"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="cus-btns">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('messPassForm')">提交更新</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-tab-pane>

    </el-tabs>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    import md5 from 'js-md5';
    export default {
        name: 'HeadAndPass',
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.messPassForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                activeName: 'second',
                labelPosition: 'right',
                messPassForm: {
                    authUser: JSON.parse(Base64.decode(sessionStorage.getItem('authUser'))),
                    oldPass: '',
                    newPass: '',
                    reNewPass: ''
                },
                rules: {
                    oldPass: [
                        {required: true, message: '原始密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePass, required: true, trigger: 'blur'}
                    ],
                    reNewPass: [
                        {validator: validatePass2, required: true, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'modifyPassword'
            ]),
            handleClick() {

            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = {
                            oldPassword: md5(this.messPassForm.oldPass),
                            newPassword: md5(this.messPassForm.newPass)
                        };
                        this.$store.dispatch('modifyPassword', formData)
                                .then(response => {
                                    this.messPassForm.oldPass = '';
                                    this.messPassForm.newPass = '';
                                    this.messPassForm.reNewPass = '';
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
    .mcompany {
        margin-top: 20px;
    }

    .mcompany .el-input {
        width: 360px;
    }

</style>
