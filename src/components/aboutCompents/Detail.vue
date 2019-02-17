<template>
    <div class="main-wrap">
        <h3 class="main-title">{{type | getTitle}}</h3>
        <div class="main-content" v-html="notice.content" v-loading.body="loading">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'AboutDetail',
        data () {
            return {
                loading: false,
                notice: '',
                type:this.$route.query.type
            }
        },
        created(){
            this.getDetail();
        },
        methods: {
            ...mapActions([
                'queryNoticeDetail'
            ]),
            getDetail(){
                this.loading = true;
                this.$store.dispatch('queryNoticeDetail',{id:this.$route.query.id})
                        .then(response => {
                            this.loading = false;
                            this.notice = response;
                        });
            }
        },
        filters: {
            getTitle(val){
                return enums.getDesc('NOTICE_TYPE',val);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img{
        margin: auto;
    }
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
    div.main-content{
        text-align:justify;
    }
</style>
