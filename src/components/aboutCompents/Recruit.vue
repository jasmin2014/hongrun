<template>
    <div class="main-wrap">
        <h3 class="main-title">发标预告</h3>
        <div class="main-content" v-loading.body="loading">
            <ul>
                <li v-for="notice in tableList.data"><router-link :to="{path:'/about/detail',query: {type:type,id: notice.id}}">{{notice.title}}</router-link><span>{{notice.gmt_create}}</span></li>
            </ul>

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
    </div>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'Recruit',
        data () {
            return {
                type: enums.getValue('NOTICE_TYPE', 'BIDDING'),
                tableList: {
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
                loading: false
            }
        },
        created(){
            this.getList();
        },
        methods: {
            ...mapActions([
                'queryNoticeList'
            ]),
            getList(){
                this.loading = true;
                this.$store.dispatch('queryNoticeList', {type: this.type, page: this.tableList.current_page})
                        .then(response => {
                            this.loading = false;
                            this.tableList = response;
                        });
            },
            handleCurrentChange(val) {
                this.tableList.current_page = val;
                this.getList();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.main-wrap {
        width: 1190px;
        margin: 0px auto;
        background: #fff;
        overflow: hidden;
        padding: 30px;
    }

    h3.main-title {
        text-align: left;
        height: 40px;
        line-height: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e3e3e3;
        font-size: 20px;
        font-weight: 500;
        font-family: "Microsoft Yahei";
        color: #666;
        letter-spacing: 1px;
    }

    div.main-content ul li {
        text-align: left;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #e3e3e3;
    }

    div.main-content ul li span {
        float: right;
    }

    div.main-content div.main-page {
        clear: both;
        margin-top: 20px;
    }
</style>
