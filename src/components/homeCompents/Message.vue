<template>
    <div class="message content clear">
        <div class="mes-left left rel">
            <section>
                <h2><i class="icon iconfont">&#xe601;</i>动态资讯</h2>
                <p>新闻动态 资讯精选</p>
            </section>
            <ul class="abs">
                <li class="active">前沿资讯</li>
                <li>网站公告</li>
            </ul>
        </div>
        <div class="mes-rig left clear">
            <div class="left">
                <img src="../../assets/images/mess-pic01.jpg">
                <section class="mes-rig-mlist">
                    <h3 class="rel">前沿资讯 <router-link :to="{name:'News'}" class="abs">MORE></router-link></h3>
                    <ul v-loading.body="newsLoading">
                        <li class="clear rel" v-for="news in newsList">
                            <p class="left"><router-link :to="{path:'/about/detail',query: {type:news.type ,id: news.id}}">{{news.title}}</router-link></p>
                            <span class="right">{{news.gmt_create | formatDate('yyyy-MM-dd')}}</span>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="left">
                <img src="../../assets/images/mess-pic02.jpg">
                <section class="mes-rig-mlist">
                    <h3 class="rel">网站公告 <router-link :to="{name:'Notice'}" class="abs">MORE></router-link></h3>
                    <ul v-loading.body="noticeLoading">
                        <li class="clear rel" v-for="notice in noticeList">
                            <p class="left"><router-link :to="{path:'/about/detail',query: {type:notice.type ,id: notice.id}}">{{notice.title}}</router-link></p>
                            <span class="right">{{notice.gmt_create | formatDate('yyyy-MM-dd')}}</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import enums from '../../utils/enums.js';
    import { mapGetters,mapActions } from 'vuex';
    import {formatDate} from '../../utils/tools';
    export default {
        name: 'Message',
        data () {
            return {
                'newsList': [],
                'noticeList': [],
                'newsLoading': false,
                'noticeLoading': false
            }
        },
        created(){
            this.getNewsList();
            this.getNoticeList();
        },
        methods: {
            ...mapActions([
                'queryNoticeList'
            ]),
            getNewsList(){
                let type = enums.getValue('NOTICE_TYPE','REPORT');
                this.newsLoading = true;
                this.$store.dispatch('queryNoticeList',{type:type,pageSize:4,noPage:true})
                    .then(response => {
                        this.newsLoading = false;
                        this.newsList = response;
                    });
            },
            getNoticeList(){
                let type = enums.getValue('NOTICE_TYPE','WEBSITE');
                this.noticeLoading = true;
                this.$store.dispatch('queryNoticeList',{type:type,pageSize:4,noPage:true})
                    .then(response => {
                        this.noticeLoading = false;
                        this.noticeList = response;
                    });
            },
        },
        filters: {
            formatDate(val,fmt) {
                return formatDate(new Date(val),fmt);
            }
        }
    }
</script>

<style scoped>
    .message {
        margin-top: 30px;
    }

    .mes-left {
        width: 200px;
        height: 400px;
        background: #d2ad88;
    }

    .mes-left > section:first-child {
        padding-top: 30px;
    }

    .mes-left > section:first-child h2 {
        font-size: 160%;
        font-weight: normal;
        color: #fff;
    }

    .mes-left > section:first-child h2 i {
        font-size: 120%;
        color: #fff;
        margin-right: 5px;
    }

    .mes-left > section:first-child p {
        color: #fff;
        line-height: 2em;
        margin-top: 5px;
    }

    .mes-left ul {
        width: 115px;
        right: 0;
        top: 50%;
    }

    .mes-left ul li {
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: #b28862;
        margin-top: 10px;
        color: #fff;
        font-size: 90%;
    }

    .mes-left ul li.active {
        background: #fff;
        color: #b28862;
    }

    .mes-rig {
        height: 400px;
        border: 1px solid #eee;
        border-left: none;
    }

    .mes-rig img {
        margin: 20px auto 0 auto;
    }

    .mes-rig > div {
        width: 494px;
    }

    .mes-rig > div section {
        width: 376px;
        margin: 30px auto 0 auto;
        text-align: left;
    }

    .mes-rig-mlist h3 {
        font-size: 110%;
        font-weight: normal;
        border-left: 3px solid #b28862;
        padding-left: 10px;
        margin: 15px 0;
    }

    .mes-rig-mlist h3 a {
        font-size: 75%;
        line-height: 24px;
        right: 0;
        top: 0;
        color: #b28862;
    }

    .mes-rig-mlist ul li {
        line-height: 2em;
        padding: 6px 0 6px 15px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }

    .mes-rig-mlist ul li:before {
        width: 4px;
        height: 4px;
        display: inline-block;
        background: #b28862;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
    }

    .mes-rig-mlist ul li p {
        width: 74%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
