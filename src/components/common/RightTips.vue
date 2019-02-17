<template>
    <div class="caculator">
        <div>
            <router-link to='/'><i class="icon iconfont">&#xe69b;</i></router-link>
            <div class="telephone">0577-63191188</div>
        </div>
        <div class="right-qqs">
            <router-link to='/'><i class="icon iconfont">&#xe627;</i></router-link>
            <div>
                <a href="tencent://message/?uin=2742689774&Site=zjhrgc.com&Menu=yes">{{hideQQ('2742689774')}} 宏润客服—丹丹</a>
                <a href="tencent://message/?uin=3305199700&Site=zjhrgc.com&Menu=yes">{{hideQQ('3305199700')}} 宏润客服—倩倩 </a>
                <a href="tencent://message/?uin=2576359642&Site=zjhrgc.com&Menu=yes">{{hideQQ('2576359642')}} 宏润客服—依伊</a>
                <a href="tencent://message/?uin=2982653021&Site=zjhrgc.com&Menu=yes">{{hideQQ('2982653021')}} 宏润客服—安安</a>
                <a href="tencent://message/?uin=2843885132&Site=zjhrgc.com&Menu=yes">{{hideQQ('2843885132')}} 宏润客服—晓美</a>
                <a href="tencent://message/?uin=2080866037&Site=zjhrgc.com&Menu=yes">{{hideQQ('2080866037')}} 宏润客服—君君</a>
                <a href="tencent://message/?uin=3078541156&Site=zjhrgc.com&Menu=yes">{{hideQQ('3078541156')}} 宏润客服—嗨嗨</a>
                <a href="tencent://message/?uin=2509303781&Site=zjhrgc.com&Menu=yes">{{hideQQ('2509303781')}} 宏润客服—边边</a>
                <a href="tencent://message/?uin=2631627136&Site=zjhrgc.com&Menu=yes">{{hideQQ('2631627136')}} 宏润客服—小梅</a>
                <a href="tencent://message/?uin=1587785839&Site=zjhrgc.com&Menu=yes">{{hideQQ('1587785839')}} 宏润客服—瑶瑶</a>
            </div>
        </div>
        <div>
            <router-link to='/calculator'><i class="icon iconfont">&#xe787;</i></router-link>
        </div>
        <div @click="backToTop" v-show="showReturnToTop" @mouseenter="show" @mouseleave="hide">
            <i class="icon iconfont">&#xe629;</i>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {scrollIt} from '../../utils//scrollIt'; // 引入动画过渡的实现
    export default {
        name: 'RightTips',
        props: {
            pageY: { // 默认在哪个视图显示返回按钮
                type: Number,
                default: 400
            },
            transitionName: { // 过渡动画名称
                type: String,
                default: 'linear'
            }
        },
        data () {
            return {
                showTooltips: false,
                showReturnToTop: false
            }
        },
        created () {
            window.addEventListener('scroll', this.currentPageYOffset);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.currentPageYOffset)
        },
        methods: {
            show () { // 显示隐藏提示文字
                return this.showTooltips = true;
            },
            hide () {
                return this.showTooltips = false;
            },
            currentPageYOffset () {
                // 判断滚动区域大于多少的时候显示返回顶部的按钮
                window.pageYOffset > this.pageY ? this.showReturnToTop = true : this.showReturnToTop = false;

            },
            backToTop () {
                scrollIt(0, 1500, this.transitionName, this.currentPageYOffset);
            },
            hideQQ(val){
                if(val){
                    return val.replace(/^(.{2}).+(.{3})$/g,"$1**$2");
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .caculator {
        position: fixed;
        right: 20px;
        top: 50%;
        z-index: 9999;
        width: 50px;
        margin-top: -30px;
    }

    .caculator > div {
        position: relative;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: #fff;
        border-bottom: 1px solid #d5d5d5;
    }

    .caculator > div:last-child {
        line-height: 40px;
        border-bottom: none;
    }

    .caculator > div i {
        color: #999;
        font-size: 200%;
    }

    .caculator > div:hover i {
        color: #d92818;
    }

    .telephone, .caculator > div.right-qqs > div {
        display: none;
    }

    .caculator > div:first-child:hover .telephone {
        display: block;
        width: 150px;
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: -150px;
        top: -1px;
        background: rgba(255, 255, 255, .9);
        border: 1px solid #d92818;
    }

    .caculator > div:first-child:hover, .caculator > div.right-qqs:hover {
        border: 1px solid #d92818;
        border-left: none;
    }

    .caculator > div.right-qqs:hover > div {
        display: block;
        width: 230px;
        position: absolute;
        left: -230px;
        top: -130px;
        line-height: 26px;
        font-size: 90%;
        background: rgba(255, 255, 255, .9);
        border: 1px solid #d92818;
    }

    .caculator > div.right-qqs > div a {
        border-bottom: 1px solid #ddd;
        height: 30px;
        line-height: 30px;
        display: block;
        width: 100%;
    }

    .caculator > div.right-qqs > div a:last-child {
        border-bottom: none;
    }
</style>
