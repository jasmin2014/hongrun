<template>
    <div class="mascro-content rel">
        <!--顶部导航条-->
        <top-header></top-header>
        <!--主导航条-->
        <header-nav></header-nav>

        <div class="mess-wrap big-bg">
            <div class="content clear">
                <el-row class="cus-flex">
                    <!--个人中心左侧导航条-->
                    <left-bar></left-bar>

                    <el-col :span="18" :offset="1" class="mess-right">
                        <router-view></router-view>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--底部版权区域-->
        <footer-wrap></footer-wrap>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapGetters,mapActions } from 'vuex';
    import TopHeader from '../components/common/TopHeader';
    import HeaderNav from '../components/common/HeaderNav';
    import LeftBar from '../components/common/LeftBar';
    import FooterWrap from '../components/common/Footer';

    export default {
        components: {TopHeader, HeaderNav, LeftBar, FooterWrap},
        name: 'Personal',
        data () {
            return {}
        },
        computed: mapGetters([
            'userInfo'
        ]),
        methods: {
            handleClick() {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
