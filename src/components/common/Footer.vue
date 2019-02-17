<template>
  <div class="footer-content">
    <div class="footer content clear rel" :class="{'smlpad':isLogin||isRegister}">
      <div class="left">
        <p><img src="../../assets/images/logo.jpg"></p>
      </div>
      <div class="foo-copy left">
        <ul v-show="(!isLogin)&&(!isRegister)">
          <li><router-link :to="{name:'Platform'}">平台介绍</router-link></li>
          <li><router-link :to="{name:'Guide'}">新手指引</router-link></li>
          <li><router-link :to="{name:'Question'}">常见问题</router-link></li>
          <li><router-link :to="{name:'Law'}">资质证明</router-link></li>
          <li><router-link :to="{name:'Contact'}">联系我们</router-link></li>
        </ul>
        <div class="copyrighttxt" :class="{'smlpad':isLogin||isRegister}">copyright 温州宏润网络科技有限公司 版权所有     浙ICP备17045078号-2</div>
      </div>
      <div class="service-tel abs">
        <div class="ser-phone clear">
          <i class="icon iconfont left">&#xe604;</i>
          <div class="left"><p>0577-63191188</p><p>(服务时间：9:00-17:00)</p></div>
        </div>
        <p class="ser-friend">友情提醒：理财有风险，投资需谨慎</p>
      </div>
    </div>
    <div class="foo-friendship">
      <ul class="clear">
        <li><a href="#"><img src="../../assets/images/fpic1.jpg"></a></li>
        <li><a href="#"><img src="../../assets/images/fpic2.jpg"></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  props: ["isLogin",'isRegister'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer {
  padding: 50px 0;
  margin-top: 30px;
}
.footer-content .footer.smlpad {
  padding: 20px 0;
  margin: 0 auto;
}
.footer >div:first-child p {
  width: 200px;
}
.footer >div:first-child p img {
  width: 100%;
}
.footer >div.foo-copy {
  padding-left: 40px;
}
.footer >div ul li{
  float: left;
  width: 120px;
  text-align: left;
  margin-top: 10px;
}
.footer >div ul li a {
  color: #999;
}
.footer >div ul li a:hover {
  color: #333;
}
.copyrighttxt {
  text-align: left;
  font-size: 85%;
  line-height: 3em;
}
.copyrighttxt.smlpad {
  margin-top: 12px;
}
.service-tel {
  right: 0;
  top: 50%;
  margin-top: -30px;
}
.service-tel  i.iconfont {
  font-size: 260%;
  color: #999;
  margin-right: 10px;
}
.ser-phone {
  line-height: 40px;
}
.ser-phone >div p {
  line-height: 1.4em;
  font-size: 85%;
  text-align: left;
}
.ser-phone >div p:first-child {
  font-size: 120%;
}
.ser-phone span {
  font-size: 120%;
}
.ser-time {
  font-size: 85%;
}
.ser-friend {
  font-size: 75%;
}
.foo-friendship {
  width: 100%;
  background: #f5f5f5;
  padding: 10px 0;
}
.foo-friendship ul {
  width: 308px;
  margin: 0 auto;
}
.foo-friendship ul li {
  float: left;
  margin-right: 30px;
}
.foo-friendship ul li:last-child {
  margin-right: none;
}
</style>
