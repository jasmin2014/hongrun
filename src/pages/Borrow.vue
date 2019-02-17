<template>
  <div class="mascro-content rel">
    <top-header></top-header>
    <header-nav></header-nav>
    
    <div class="borrow-bnr">
      <div class="content">
        <div class="borrow-toptxt">
          <p>宏润共创网络借款服务平台</p>
          <p>专注于服务小微企业、个体、商铺等</p>
        </div>
      </div>
    </div>
    <div class="borrow-main">
      <div class="content">
        <div class="borrow-items clear">
          <section>
            <div class="item-icon">
              <i class="icon iconfont">&#xe617;</i>
            </div>
            <div class="item-txt">
              <h3>门槛低</h3>
              <p>满18周岁即可申请</p>
            </div>
          </section>
          <section>
            <div class="item-icon">
              <i class="icon iconfont">&#xe61f;</i>
            </div>
            <div class="item-txt">
              <h3>额度高</h3>
              <p>最高借款额度可达500万</p>
            </div>
          </section>
          <section>
            <div class="item-icon">
              <i class="icon iconfont">&#xe618;</i>
            </div>
            <div class="item-txt">
              <h3>利率低</h3>
              <p>月利率低至0.78%</p>
            </div>
          </section>
          <section>
            <div class="item-icon">
              <i class="icon iconfont">&#xe621;</i>
            </div>
            <div class="item-txt">
              <h3>放款快</h3>
              <p>资料齐全 当天放款</p>
            </div>
          </section>
        </div>
        <div class="borrow-types clear">
          <section>
            <div class="borrow-typepic">
              <img src="../assets/images/borrow-typepic01.jpg" >
              <div>
                <p>车抵贷</p>
                <p>解决不时之需　车抵随借随还</p>
              </div>
            </div>
            <p>车抵贷标显示标记"车"，是网站运营方经过线下严格核查借款人资产负债,抵押手续（不仅限）、有关政府以及商业银行推荐、优质资产和股权质押，确保风险控制在合理的范围内。 对象一般为地区优质中小微企业，是网站运营方重点发展对象.</p>
            <div class="borrow-btn" @click="gotoApply()">立即申请</div>
          </section>
          <section>
            <div class="borrow-typepic">
              <img src="../assets/images/borrow-typepic02.jpg" >
              <div>
                <p>房抵贷</p>
                <p>解决不时之需　房抵随借随还</p>
              </div>
            </div>
            <p>房抵贷标显示标记"房"，是网站运营方经过线下严格核查借款人资产负债,抵押手续（不仅限）、有关政府以及商业银行推荐、优质资产和股权质押，确保风险控制在合理的范围内。 对象一般为地区优质中小微企业，是网站运营方重点发展对象.</p>
            <div class="borrow-btn">立即申请</div>
          </section>
          <section>
            <div class="borrow-typepic">
              <img src="../assets/images/borrow-typepic03.jpg" >
              <div>
                <p>企业贷</p>
                <p>服务小微企业　践行无微不至</p>
              </div>
            </div>
            <p>企业抵押贷款是指企业作为借款人，以不动产抵押作为抵押物，获得贷款的方式。办理不动产抵押贷款的渠道一般是厚银行、信托公司、小额贷款公司。</p>
            <div class="borrow-btn">立即申请</div>
          </section>
          <section>
            <div class="borrow-typepic">
              <img src="../assets/images/borrow-typepic04.jpg" >
              <div>
                <p>信用贷</p>
                <p>免抵押、免担保、纯信用</p>
              </div>
            </div>
            <p>信用借款标显示"信"字标记，是一种免抵押、免担保、纯信用的小额个人信用贷款标，主要面向固定收入群体开放。如借款人到期还款出现困难，逾期约定时间由网站运营方垫付本金息还款， 债权转让为网站运营方所有。</p>
            <div class="borrow-btn">立即申请</div>
          </section>
        </div>
        <div class="borrow-steps">
          <h2>借款步骤</h2>
          <div>
            <img src="../assets/images/liuchen.jpg" style="width: 100%;">
          </div>
        </div>
      </div>
    </div>

    <right-tips></right-tips>
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
  </div>
</template>

<script>
import TopHeader from '../components/common/TopHeader';
import HeaderNav from '../components/common/HeaderNav';
import RightTips from '../components/common/RightTips'

import FooterWrap from '../components/common/Footer';
export default {
  components:{TopHeader,HeaderNav,RightTips,FooterWrap},
  name: 'Borrow',
  data () {
    return {
    }
  },
  methods: {
    gotoApply(){
      this.$router.push({"path":'/iborrow/apply'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borrow-bnr {
  width: 100%;
  background: url("../assets/images/borrowbg.jpg") no-repeat center center;
  background-size: cover;
  height: 305px; 
}
.borrow-bnr .content {
  height: 100%;
  position: relative;
}
.borrow-toptxt >p:first-child {
  font-size: 160%;
  line-height: 3em;
  margin-top: 15px;
  color: #d92818;
  letter-spacing: 5px;
}
.borrow-toptxt {
  width: 40%;
  background: rgba(255,255,255,.7);
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -80px;
  height: 160px;
  border-radius: 8px;
}
.borrow-items {
  text-align: left;
  margin-top: 50px;
}
.borrow-items > section {
  position: relative;
  padding: 20px 0 20px 70px;
  width: 25%;
  float: left;
}
.borrow-items section .item-txt h3 {
  font-size: 120%;
  line-height: 36px;
  font-weight: normal;
}
.borrow-items section .item-txt p {
  font-size: 90%;
  color: #999;
}
.borrow-items section .item-icon {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -25px;
}
.borrow-items section .item-icon i{
  font-size: 320%;
  color: #b5b5b5;
}
.borrow-items section:hover .item-icon i {
  color: #d92818;
}
.borrow-types {
  margin-top: 50px;
}
.borrow-types > section {
  width: 280px;
  height: 450px;
  float: left;
  margin-right: 23px;
  border:1px solid #ddd;
  text-align: left;
  position: relative;
}
.borrow-types > section >p {
  padding: 10px;
  font-size: 85%;
  line-height: 30px;
  text-indent: 2em;
  text-align:justify; 
  text-justify:distribute-all-lines; 
  text-align-last:justify; 
}
.borrow-types > section .borrow-typepic {
  position: relative;
}
.borrow-types > section .borrow-typepic img {
  width: 100%;
}
.borrow-types > section .borrow-typepic > div {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 5px 15px 15px 15px;
  margin: -45px 0 0 -45%;
  background: rgba(255,255,255,.9);
}
.borrow-types > section .borrow-typepic > div p:first-child {
  font-size: 120%;
  line-height: 40px;
  color: #d92818;
}
.borrow-types > section:last-child {
  margin-right: 0;
}
.borrow-types > section .borrow-btn {
  width: 90%;
  height: 36px;
  border: 1px solid #d92818;
  line-height: 36px;
  border-radius: 5px;
  color: #d92818;
  position: absolute;
  left: 5%;
  bottom: 20px;
  text-align: center;
  cursor: pointer;
}
.borrow-steps {
  /*background: #eee;*/
  padding: 30px 0px 40px 0px;
}
.borrow-steps,.borrow-steps ul {
  margin-top: 50px;
}
.borrow-steps h2 {
  font-size: 180%;
  font-weight: normal;
  line-height: 50px;
}
</style>
