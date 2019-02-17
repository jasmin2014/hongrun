<template>
    <el-form :inline="true" :label-position="labelPosition" label-width="100px" :rules="rules" ref="financeInfo"
             :model="financeInfo" class="form-custom flex mcompany">
        <el-row>
            <el-form-item label="住房条件" prop="house">
                <template>
                    <el-radio-group v-model="financeInfo.house">
                        <el-radio class="radio" :label="house.value" v-for="house in house_arr" :key="house.value">{{house.label}}</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="房产价值" prop="house_value">
                <el-input v-model="financeInfo.house_value"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="是否购车" prop="is_car">
                <template>
                    <el-radio-group v-model="financeInfo.is_car">
                        <el-radio class="radio" :label="car.value" v-for="car in car_arr" :key="car.value">{{car.label}}</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="车辆价值" prop="car_value">
                <el-input v-model="financeInfo.car_value"></el-input>
            </el-form-item>
        </el-row>
        <el-row class="cus-btns">
            <el-col :span="10" :offset="5">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('financeInfo')">保存并继续</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import enums from '../../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'MessFinancial',
        props: {
            userFinanceInfo: {
                type: Object
            }
        },
        data () {
            return {
                labelPosition: 'right',
                financeInfo: {
                    house: '',
                    house_value: '',
                    is_car: '',
                    car_value: ''
                },
                house_arr: [],
                car_arr: [],
                rules: {
                    house: [
                        {required: true,type: 'number', message: '请选择一项', trigger: 'change'}
                    ],
                    house_value: [
                        {required: true, message: '请输入房产价值', trigger: 'blur'}
                    ],
                    is_car: [
                        {required: true,type: 'number', message: '请选择一项', trigger: 'change'}
                    ],
                    car_value: [
                        {required: true, message: '请输入车辆价值', trigger: 'blur'}
                    ]
                }

            }
        },
        watch: {
            userFinanceInfo(val) {
                this.financeInfo = this.userFinanceInfo;
            }
        },
        created () {
            this.initSelect();
        },
        methods: {
            initSelect(){
                this.house_arr = enums.getItems('HOUSE');
                this.car_arr = enums.getItems('BOOL');
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('supplementInfo', this.financeInfo)
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

</style>
