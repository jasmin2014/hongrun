<template>
  <div class="mascro-content rel">
    <!--顶部导航条-->
    <top-header></top-header>
    <!--主导航条-->
    <header-nav></header-nav>

    <div class="about-wrap">
      <div class="about-img">
        <div class="content">
          <div class="about-title">
            <h3>关于我们</h3>
            <p>我们为您提供专业便捷的金融服务，让您和家人尽享尊荣富厚，品质生活触手可及！</p>
          </div>
        </div>
      </div>
      <about-nav></about-nav>
      <div class="about-main">
        <router-view></router-view>
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
  name: 'Home',
  data () {
    return {
      activeName:'first',
      
      companyForm:{},
      financeForm:{}

    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.about-wrap{
    background: rgb(250,250,250);
    padding-bottom: 20px;
  }
  div.about-wrap div.about-img{
    width: 100%;
    height: 305px;
    background: url('../assets/images/about.jpg') no-repeat center;
    background-size: cover;
  }
  .about-img .content {
    height: 100%;
    position: relative;
  }
  .about-img .about-title {
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
  .about-img .about-title h3 {
    font-size: 160%;
    line-height: 50px;
    font-weight: normal;
    color: #d92818;
  }
  .about-img .about-title p {
    line-height: 30px;
  }
  div.about-wrap div.about-main{
    margin: 20px 0px;
  }
</style>
