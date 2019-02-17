<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="个人资料" name="first" class="mess-rigitem">
            <mess-personal :userInfo="basicInfo"></mess-personal>
        </el-tab-pane>
        <el-tab-pane label="单位资料" name="second" class="mess-rigitem">
            <mess-company :userCompanyInfo="companyInfo"></mess-company>
        </el-tab-pane>
        <el-tab-pane label="财务状况" name="third" class="mess-rigitem">
            <mess-fianncial :userFinanceInfo="financeInfo"></mess-fianncial>
        </el-tab-pane>

    </el-tabs>
</template>

<script type="text/ecmascript-6">
    import MessPersonal from './basicsComp/messPersonal'
    import MessCompany from './basicsComp/messCompany'
    import MessFianncial from './basicsComp/messFinancial'
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {MessPersonal, MessCompany, MessFianncial},
        name: 'Home',
        data () {
            return {
                activeName: 'first',
                basicInfo: {},
                companyInfo: {},
                financeInfo: {}
            }
        },
        created(){
            this.getUserInfo();
        },
        methods: {
            ...mapActions([
                'queryUserInfo'
            ]),
            getUserInfo() {
                let _this = this;
                this.queryUserInfo(null).then(function(resp){
                    _this.basicInfo = {
                        name: resp.name,
                        identity: resp.identity,
                        mobile: resp.mobile,
                        age: resp.age,
                        native_place: resp.native_place,
                        live_place: resp.live_place,
                        sex: resp.sex,
                        is_marry: resp.is_marry,
                        education: resp.education,
                        income: resp.income,
                        desc: resp.desc
                    };
                    _this.companyInfo = {
                        company_name: resp.company_name,
                        company_tel: resp.company_tel,
                        company_address: resp.company_address,
                        company_year: resp.company_year
                    };
                    _this.financeInfo = {
                        house: resp.house,
                        house_value: resp.house_value,
                        is_car: resp.is_car,
                        car_value: resp.car_value
                    }
                });
            },
            handleClick() {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
