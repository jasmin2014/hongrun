<template>
  <div class="mascro-content rel">
    <!--顶部导航条-->
    <top-header></top-header>
    <!--主导航条-->
    <header-nav></header-nav>

    <div class="guide-wrap">
      <div class="guide-img">
        <div class="content">
          <div class="guide-title">
            <h3>新手指南</h3>
            <p>新手指南将会帮助您更快捷更方便的了解我们为您提供的金融服务！</p>
          </div>
        </div>
      </div>
      <div class="guide-main">
        <section class="guide-step step1 clear">
          <div class="step-left">
            <img src="../assets/images/guide/t01.jpg">
          </div>
          <div class="step1-icon step-icon">
            <i class="icon iconfont">&#xe61a;</i>
          </div>
          <div class="step1-txt step-txt">
            <h3>注册成为我们的新用户</h3>
            <p>根据要求填写好注册信息，</p>
            <p>并同意《用户服务协议》，最后点击“立即注册”按钮</p>
            <router-link to="/reg">点击去注册</router-link>
          </div>
        </section>
        <section class="guide-step step2 clear">
          <div class="step-right">
            <img src="../assets/images/guide/t02.jpg">
          </div>
          <div class="step2-icon step-icon">
            <p>
              <i class="icon iconfont">&#xe65f;</i>
            </p>
          </div>
          <div class="step2-txt step-txt">
            <h3>开通环迅支付第三方资金托管账户</h3>
            <p>注册成功后，进入我的账户进行第三方支付账户的开通，</p>
            <p>通过真实姓名、身份证号以及手机验证码提交开通，成功开通后不可修改</p>
            <a href="http://www.ips.com/">了解环迅</a>
          </div>
        </section>
        <section class="guide-step step3 clear">
          <div class="step-left">
            <img src="../assets/images/guide/t04.jpg">
          </div>
          <div class="step3-icon step-icon">
            <p>
              <i class="icon iconfont">&#xe78b;</i>
            </p>
          </div>
          <div class="step3-txt step-txt">
            <h3>完成绑定银行卡</h3>
            <p>在我的账户-资金管理菜单下进行银行卡绑定，完成绑定后即</p>
            <p>可通过成功绑定的银行卡进行快捷充值，取现操作.</p>
            <!-- <a href="http://www.ips.com/">了解环迅</a> -->
          </div>
        </section>
        <section class="guide-step step4 clear">
          <div class="step-right">
            <img src="../assets/images/guide/t03.jpg">
          </div>
          <div class="step4-icon step-icon">
            <p>
              <i class="icon iconfont">&#xe65e;</i>
            </p>
          </div>
          <div class="step4-txt step-txt">
            <h3>账户充值</h3>
            <p>进入个人中心，在左侧的“资金管理”的选项下面选择“我要充值”，然后选择充值方式，</p>
            <p>输入需要充值的金额以及支付的银行，提交后即可成功充值</p>
            <!-- <a href="http://www.ips.com/">了解环迅</a> -->
          </div>
        </section>
        <section class="guide-step step5 clear">
          <div class="step-left">
            <img src="../assets/images/guide/t05.jpg">
          </div>
          <div class="step5-icon step-icon">
            <i class="icon iconfont">&#xe620;</i>
          </div>
          <div class="step5-txt step-txt">
            <h3>选择合适的项目进行投资</h3>
            <p>进入我要投资页面，选择您想要的投资项目，</p>
            <p>进入详情页输入您的投资金额，点击确认按钮后，即完成投资。</p>
            <router-link to="/invest">查看投资列表</router-link>
          </div>
        </section>
        <section class="guide-step step6 clear">
          <div class="step-right">
            <img src="../assets/images/guide/t06.jpg">
          </div>
          <div class="step6-icon step-icon">
            <p>
              <i class="icon iconfont">&#xe61b;</i>
            </p>
          </div>
          <div class="step6-txt step-txt">
            <h3>账户提现</h3>
            <p>进入个人中心，在左侧的“资金管理”的选项下面选择“我要提现”，</p>
            <p>然后在对应框中输入要提现的金额，提交后即可提现成功</p>
            <router-link to="/login">立即加入我们</router-link>
          </div>
        </section>
      </div>
    </div>
    <!--底部版权区域-->
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
  </div>
</template>

<script>
import TopHeader from '../components/common/TopHeader';
import HeaderNav from '../components/common/HeaderNav';
import AboutNav from '../components/aboutCompents/AboutNav';
import FooterWrap from '../components/common/Footer';

export default {
  components:{TopHeader,HeaderNav,AboutNav,FooterWrap},
  name: 'Guide',
  data () {
    return {     

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.guide-wrap div.guide-img{
    width: 100%;
    height: 305px;
    background: url('../assets/images/guide/banner.jpg') no-repeat center;
    background-size: cover;
  }
  div.guide-wrap div.guide-img .content {
    position: relative;
    height: 305px;
  }
  div.guide-wrap div.guide-main{
    width: 1190px;
    margin: 0px auto;
  }
  div.guide-wrap div.guide-main img{
    width: 100%;
  } 
  .guide-img .guide-title {
    background: rgba(255,255,255,.9);
    width: 476px;
    height: 160px;
    position: absolute;
    left: 0;
    top: 50%;
    padding: 20px 20px 30px 20px;
    margin: -80px 0 0 0;
    text-align: left;
    border-radius: 8px;
  }
  .guide-img .guide-title h3 {
    font-size: 160%;
    line-height: 50px;
    font-weight: normal;
    color: #d92818;
  }
  .guide-img .guide-title p {
    line-height: 30px;
  }
  .guide-step {
    width: 100%;
    position: relative;
    background: #f7f6f4;
    margin-top: 30px;
  }
  .guide-step.step1 .step-left,.guide-step.step3 .step-left,.guide-step.step5 .step-left{
    width: 300px;
    margin-left: 60px;
  }
  .step-icon {
    position: absolute;
    width: 160px;
    height: 115px;
    top: 0;    
  }
  .step-icon i {
    display: block;
    font-size: 160%;
  }
  .step1-icon {
    right: 40px;
    background: url('../assets/images/guide/step01.png') no-repeat center center;
  }
  
  .step1-icon i,.step3-icon i,.step5-icon i {    
    position: absolute;
    top: 30px;
    left: 94px;
    color: #fff;
  }
  .step2-icon {
    left: 40px;        
    background: url('../assets/images/guide/step02.png') no-repeat center center;
  }
  
  .step2-icon i, .step4-icon i, .step6-icon i {    
    position: absolute;
    top: 30px;
    left: 40px;
    color: #fff;
  }

  .step3-icon {
    right: 40px;        
    background: url('../assets/images/guide/step03.png') no-repeat center center;
  }
  
  .step4-icon {
    left: 40px;        
    background: url('../assets/images/guide/step04.png') no-repeat center center;
  }

  .step5-icon {
    right: 40px;        
    background: url('../assets/images/guide/step05.png') no-repeat center center;
  }
  .step6-icon {
    left: 40px;        
    background: url('../assets/images/guide/step06.png') no-repeat center center;
  }
  .step-txt {    
    position: absolute;
  }
  .step-txt h3 {
    font-size: 160%;
    font-weight: normal;
    line-height: 2em;
  }
  .step-txt p {
    line-height: 30px;
  }
  .step-txt a{
    width: 170px;
    background: #f74a4d;
    border-radius: 4px;
    margin-top: 20px;
    display: block;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
  .step1-txt,.step3-txt,.step5-txt {
    text-align: left;    
    left: 50%;
    top: 50%;
    margin: -100px 0 0 -105px;
  }  
  .step2 .step-right,.step4 .step-right,.step6 .step-right{
    width: 300px;
    float: right;
    padding: 30px 0;
  }  
  .step2-txt,.step4-txt,.step6-txt {
    text-align: left;
    left: 180px;
    top: 50%;
    margin: -100px 0 0 0;
  }
  .step2-txt a {
    background: #ffba43;
    color: #fff;
  }
  .step4-txt {
    margin: -70px 0 0 0;
  }
  .step5-txt a {
    background: #4e95b2;
    color: #fff;
  }
  .step6-txt a {
    background: #595a56;
    color: #fff;
  }
</style>
