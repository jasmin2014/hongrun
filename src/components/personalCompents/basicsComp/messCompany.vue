<template>
    <el-form :inline="true" :label-position="labelPosition" label-width="100px" :rules="rules" ref="companyInfo"
             :model="companyInfo" class="form-custom flex mcompany">
        <el-row>
            <el-form-item label="单位名称" prop="company_name">
                <el-input v-model="companyInfo.company_name"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="电话" prop="company_tel">
                <el-input v-model="companyInfo.company_tel"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="地址" prop="company_address">
                <el-input v-model="companyInfo.company_address"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="工作年限" prop="company_year">
                <el-select v-model="companyInfo.company_year">
                    <el-option v-for="item in year_arr" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-row>
        <el-row>
            <el-col :span="16" :offset="4" class="cus-btns">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('companyInfo')">保存并继续</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import enums from '../../../utils/enums.js';
    export default {
        name: 'TopBanner',
        props: {
            userCompanyInfo: {
                type: Object
            }
        },
        data () {
            return {
                labelPosition: 'right',
                companyInfo: {
                    company_name: '',
                    company_tel: '',
                    company_address: '',
                    company_year: ''
                },
                year_arr: [],
                rules: {
                    company_name: [
                        {required: true, message: '请输入单位名称', trigger: 'blur'}
                    ],
                    company_tel: [
                        {required: true, message: '请输入电话', trigger: 'blur'}
                    ],
                    company_address: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ],
                    company_year: [
                        {required: true,type: 'number',  message: '请输入工作年限', trigger: 'blur'}
                    ],
                }
            }
        },
        created () {
            this.initSelect();
        },
        watch: {
            userCompanyInfo(val) {
                this.companyInfo = this.userCompanyInfo;
            }
        },
        methods: {
            initSelect(){
                this.year_arr = enums.getItems('WORK_YEAR');
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('supplementInfo', this.companyInfo)
                            .then(response => {

                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .mcompany .el-input {
        width: 360px;
    }

    .cus-btns button.skip {
        background: #fff;
        border-radius: 5px;
        border: 1px solid #ddd;
        color: #333;
        margin-left: 10px;
    }
</style>
