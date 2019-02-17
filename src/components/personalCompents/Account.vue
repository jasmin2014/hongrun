<template>
    <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
        <el-tab-pane label="银行账号" name="first" class="mess-rigitem" v-loading.body="loading">
            <el-row class="bank-account" v-if="bankInfo">
                <el-col :span="5">您当前的银行名称：</el-col>
                <el-col :span="19">{{bankInfo.bankName}}</el-col>
                <el-col :span="5">您当前的银行账号：</el-col>
                <el-col :span="19">**************{{bankInfo.bankCard}}</el-col>
                <el-col>
                    <el-button type="primary" @click="LoginAccount">立即更换提现银行卡</el-button>
                </el-col>
            </el-row>
            <el-row v-else>
                <el-col>您还未绑定任何银行卡</el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'Account',
        data () {
            return {
                activeName: 'first',
                bankInfo: '',
                loading:false
            }
        },
        computed: mapGetters([
            'userInfo'
        ]),
        mounted (){
            let _this = this;
            // 查询用户银行卡信息
            this.loading = true;
            this.queryAccount({type:'01'}).then(function(resp){
                _this.loading = false;
                if(resp){
                    _this.bankInfo = resp;
                }
            });
        },
        methods: {
            ...mapActions([
                'ipsRegister','ipsLogin','queryAccount'
            ]),
            handleClick() {

            },
            LoginAccount(){
                let _this = this;
                if(this.userInfo.v_mobile && this.userInfo.v_identity && this.userInfo.ips_acct_no){
                    this.ipsLogin(null).then(response => {
                        $('#ipsForm').html(response);
                    });
                }else{
                    if(!this.userInfo.v_mobile || !this.userInfo.v_identity){
                        window.vue.$alert('请先实名认证','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
                            _this.$router.push({path:'/personal/varification'});
                        }});
                    }
                    if(!this.userInfo.ips_acct_no){
                        window.vue.alert('请先开通托管账户','提示信息',{confirmButtonText: '确定',type:'error', callback: action => {
                            _this.ipsRegister(null).then(response => {
                                $('#ipsForm').html(response);
                            });
                        }});
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .cp-tips p i {
        color: #20a0ff;
        margin-right: 10px;
    }

    .bank-account {
        text-align: left;
        line-height: 40px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    .bank-account .el-col {
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        padding-left: 30px;
        font-size: 85%;
    }

    .bank-account .el-col .el-button {
        margin: 20px 0;
    }
</style>
