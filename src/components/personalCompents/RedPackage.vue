<template>
    <div v-loading.body="loading">
        <el-tabs v-model="activeName" type="card" class="cus-tabs" @tab-click="handleClick">
            <el-tab-pane label="我的红包" name="first" class="mess-rigitem">
                <el-form :inline="true" :label-position="labelPosition" label-width="50px" :model="search"
                         class="mess-from">
                    <el-form-item label="类型">
                        <el-select v-model="search.type">
                            <el-option v-for="item in type_arr" :label="item.label" :value="item.value"
                                       :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="search.category">
                            <el-option v-for="item in category_arr" :label="item.label" :value="item.value"
                                       :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="search.status">
                            <el-option v-for="item in status_arr" :label="item.label" :value="item.value"
                                       :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch()">搜索</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableList.data" class='table-center' border>
                    <!--<el-table-column prop="title" label="红包名称"></el-table-column>-->
                    <el-table-column prop="category" label="红包种类" :formatter="getCouponCategory"></el-table-column>
                    <el-table-column prop="amount" label="金额"></el-table-column>
                    <el-table-column prop="type" label="类型" :formatter="getCouponType"></el-table-column>
                    <el-table-column prop="gmt_receive" width="150" label="发放时间"></el-table-column>
                    <el-table-column prop="status" label="状态" :formatter="getCouponStatus"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <div class="main-page">
            <el-pagination
                    v-if="tableList.total > 0"
                    @current-change="handleCurrentChange"
                    :current-page="tableList.current_page"
                    :page-size="tableList.per_page"
                    layout="total, prev, pager, next, jumper"
                    :total="tableList.total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'RedPackage',
        data () {
            return {
                labelPosition: 'right',
                activeName: 'first',
                search: {
                    type: '',
                    category: '',
                    status: ''
                },
                type_arr:[],
                category_arr:[],
                status_arr: [],
                tableList:{
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                loading:false,
            }
        },
        created () {
            this.initSelect();
            this.getList();
        },
        methods: {
            ...mapActions([
                'queryUserCoupon'
            ]),
            initSelect(){
                this.type_arr = enums.getItems('COUPON_TYPE');
                this.category_arr = enums.getItems('COUPON_CATEGORY');
                this.status_arr = enums.getItems('COUPON_STATUS');
            },
            handleClick(){
                this.getList();
            },
            getList() {
                this.loading = true;
                this.$store.dispatch('queryUserCoupon',this.search)
                    .then(response => {
                        this.loading = false;
                        this.tableList = response;
                    });
            },
            handleCurrentChange(val) {
                this.tableList.current_page = val;
                this.search.page = val;
                this.getList();
            },
            handleSearch(){
                this.getList();
            },
            getCouponType(val) {
                return enums.getDesc('COUPON_TYPE', val.type);
            },
            getCouponCategory(val) {
                return enums.getDesc('COUPON_CATEGORY', val.category);
            },
            getCouponStatus(val) {
                return enums.getDesc('COUPON_STATUS', val.status);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*.mess-from {
      text-align: right;
    }*/
    .mess-from .el-form-item .el-form-item__content .el-select {
        width: 150px;
    }
</style>
