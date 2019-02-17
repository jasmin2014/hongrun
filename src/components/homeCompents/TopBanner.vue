<template>
    <div class="top-banner rel">

        <el-carousel :interval="5000" height="380px" arrow="always" v-loading.body="loading">
            <el-carousel-item v-for="item in focusList" :key="item">
                <!-- <h3>{{ item }}</h3> -->
                <div><img :src="item.image_file.path" style="width: 100%;height:380px;"/></div>
            </el-carousel-item>
        </el-carousel>
        <div class="bnr-left abs">
            <section>
                <p class="bnr-lefttit">投资安全有担保</p>
                <p>第三方资金托管</p>
                <p>借贷资金一分不碰</p>
            </section>
            <section>
                <p class="bnr-lefttit">理财更轻松</p>
                <p>轻轻松松3步</p>
                <p>高收益、优服务助赢未来</p>
            </section>
            <section>
                <p class="bnr-lefttit">投资无门槛</p>
                <p>100元起步</p>
                <p>轻松开启财富人生</p>
            </section>
        </div>
        <div class="bnr-right abs">
            <section class="rel">
                <div class="bnr-rigtxt abs">
                    <p>预期年化收益率</p>
                    <p><span>7.0-18%</span></p>
                    <p>多投多收益</p>
                </div>
                <div class="bnr-regorlogin abs clear">
                    <div class="bnr-reg left">
                        <router-link to="/reg">注册</router-link>
                    </div>
                    <div class="bnr-login right">
                        <router-link to="/login">登录</router-link>
                    </div>
                </div>
            </section>
            <div class="bnr-advertise abs"></div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'TopBanner',
        data () {
            return {
                focusList: [],
                loading: false
            }
        },
        created(){
            this.queryFocusList();
        },
        methods: {
            ...mapActions([
                'getFocusList'
            ]),
            queryFocusList(){
                this.loading = true;
                this.$store.dispatch('getFocusList', {type: 1})
                    .then(response => {
                        this.focusList = response;
                        this.loading = false;
                    });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .top-banner .el-carousel, .top-banner .el-carousel .el-carousel__container {
        height: 380px;
    }

    .bnr-content {
        width: 1190px;
        height: 380px;
        position: absolute;
        left: 50%;
        top: 0;
        z-index: 99;
        margin-left: -595px;
    }

    .bnr-pic {
        width: 740px;
        margin: 0 auto;
    }

    .top-banner {
        width: 100%;
        background: #1a1e25;
        height: 380px;
        overflow: hidden;
    }

    .bnr-left {
        width: 200px;
        height: 380px;
        position: fixed;
        left: 50px;
        top: 50%;
        margin-top: -190px;
        z-index: 999;
        background: #fff;
    }

    .bnr-left > section > p {
        font-size: 14px;
        color: #999;
        text-align: left;
        padding-left: 15px;
        line-height: 24px;
    }

    .bnr-left > section > p.bnr-lefttit {
        font-size: 100%;
        color: #333;
        margin-top: 20px;
        line-height: 32px;
    }

    .bnr-right {
        width: 220px;
        height: 380px;
        position: fixed;
        right: 50px;
        top: 50%;
        margin-top: -190px;
        z-index: 999;
    }

    .bnr-right > section {
        height: 264px;
        background-image: -webkit-linear-gradient(to top, #00c9d6, #00d397);
        background-image: linear-gradient(to top, #00c9d6, #00d397);
    }

    .bnr-right .bnr-rigtxt {
        left: 50%;
        top: 35px;
        margin: 0 0 0 -93px;
    }

    .bnr-right .bnr-rigtxt p {
        text-align: center;
        margin-top: 10px;
        font-size: 120%;
    }

    .bnr-right .bnr-rigtxt p, .bnr-right .bnr-rigtxt span {
        color: #fff;
    }

    .bnr-right .bnr-rigtxt span {
        font-size: 260%;
    }

    .bnr-regorlogin {
        width: 100%;
        height: 40px;
        line-height: 40px;
        bottom: 0;
        left: 0;
    }

    .bnr-reg, .bnr-login {
        text-align: center;
        font-size: 120%;
    }

    .bnr-reg {
        width: 60%;
        background: rgba(255, 255, 255, 0.8);
        color: #059ea6;
    }

    .bnr-login {
        width: 40%;
        background: #00b5c2;
        color: #5eecf6;
    }

    .bnr-advertise {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 110px;
        background: url("../../assets/images/bnr-advertise.jpg");
    }
</style>
