<template>
    <el-form :inline="true" :label-position="labelPosition" label-width="100px" :model="basicInfo" :rules="rules"
             ref="basicInfo" class="form-custom flex">
        <el-row>
            <el-col :span="12">
                <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="basicInfo.name" placeholder="请输入真实姓名" readonly="readonly"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="身份证号" prop="identity">
                    <el-input v-model="basicInfo.identity" placeholder="请输入身份证号" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="basicInfo.mobile" placeholder="请输入手机号码" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="basicInfo.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="籍贯" prop="native_place">
                    <native-place :nativeId="basicInfo.native_place" @setNativeId="setNativeId" @setNativeName="setNativeName" ref="native_place"></native-place>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="住址" prop="live_place">
                    <live-place :liveId="basicInfo.live_place" @setLiveId="setLiveId" @setLiveName="setLiveName" ref="live_place"></live-place>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="basicInfo.sex">
                        <el-radio class="radio" :label="sex.value" v-for="sex in sex_arr" :key="sex.value">{{sex.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="婚姻状况" prop="marry">
                    <el-radio-group v-model="basicInfo.is_marry">
                        <el-radio class="radio" :label="marry.value" v-for="marry in marry_arr" :key="marry.value">{{marry.label}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item label="最高学历" prop="education">
                <el-radio-group v-model="basicInfo.education">
                    <el-radio class="radio" :label="education.value" v-for="education in education_arr" :key="education.value">{{education.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="月收入" prop="income">
                <el-radio-group v-model="basicInfo.income">
                    <el-radio class="radio" v-model="basicInfo.income" :label="income.value" v-for="income in income_arr" :key="income.value">{{income.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="个人描述" prop="desc">
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="basicInfo.desc" class="textarea">
                </el-input>
            </el-form-item>
        </el-row>
        <el-row class="cus-btns">
            <el-form-item>
                <el-button type="primary" @click="submitForm('basicInfo')">保存并继续</el-button>
            </el-form-item>
        </el-row>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import enums from '../../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    import NativePlace from '../../common/NativePlace.vue';
    import LivePlace from '../../common/LivePlace.vue';

    export default {
        name: 'TopBanner',
        components :{
            NativePlace,LivePlace
        },
        props: {
            userInfo: {
                type: Object
            }
        },
        data () {
            var validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                } else {
                    if (!parseInt(value)) {
                        callback(new Error('请输入数字值'));
                    } else if (parseInt(value) < 18) {
                        callback(new Error('必须年满18岁'));
                    } else if (parseInt(value) > 70) {
                        callback(new Error('年龄低于70岁'));
                    } else {
                        callback();
                    }
                }
            };
            var validateMobile = (rule, value, callback) => {
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
            var validateIdentity = (rule, value, callback) => {
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
                labelPosition: 'right',
                basicInfo: {
                    name: '',
                    identity: '',
                    mobile: '',
                    age: '',
                    native_place: '',
                    live_place: '',
                    sex: '',
                    is_marry: '',
                    education: '',
                    income: '',
                    desc: ''
                },
                native_name: '',
                live_name: '',
                sex_arr:[],
                marry_arr:[],
                education_arr: [],
                income_arr: [],
                rules: {
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'}
                    ],
                    identity: [
                        {validator: validateIdentity, required: true, trigger: 'blur'}
                    ],
                    mobile: [
                        {validator: validateMobile, required: true, trigger: 'blur'}
                    ],
                    age: [
                        {validator: validateAge, required: true, trigger: 'blur'}
                    ],
                    sex: [
                        {required: true,type: 'number', message: '请选择性别', trigger: 'change'}
                    ],
                    is_marry: [
                        {required: true,type: 'number', message: '请选择婚姻状况', trigger: 'change'}
                    ],
                    native_place: [
                        {required: true,type: 'number', message: '请选择籍贯', trigger: 'blur'}
                    ],
                    live_place: [
                        {required: true,type: 'number', message: '请选择住址', trigger: 'blur'}
                    ],
                    education: [
                        {required: true,type: 'number', message: '请选择最高学历', trigger: 'change'}
                    ],
                    income: [
                        {required: true,type: 'number', message: '请选择收入情况', trigger: 'change'}
                    ]
                }
            }
        },
        watch: {
            userInfo(val) {
                this.basicInfo = this.userInfo;
            }
        },
        created () {
            this.initSelect();
        },
        methods: {
            ...mapActions([
                'ipsRegister','supplementInfo'
            ]),
            initSelect(){
                this.sex_arr = enums.getItems('SEX');
                this.marry_arr = enums.getItems('MARRY');
                this.education_arr = enums.getItems('EDUCATION');
                this.income_arr = enums.getItems('INCOME');
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('supplementInfo', this.basicInfo)
                            .then(response => {

                            });
                    } else {
                        return false;
                    }
                });
            },
            setNativeId: function (cityId) {
                this.basicInfo.native_place  = cityId;
                this.setNativeName()
            },
            setNativeName: function () {
                this.native_place = this.$refs.native_place.getCurrentLabels();
            },
            setLiveId: function (cityId) {
                this.basicInfo.live_place  = cityId;
                this.setLiveName()
            },
            setLiveName: function () {
                this.live_place = this.$refs.live_place.getCurrentLabels();
            },
        }
    }
</script>

<style scoped>
    .textarea {
        width: 610px;
    }

    .textarea textarea {
        width: 100%;
    }

    .el-icon-loading {
        display: none;
    }
</style>
