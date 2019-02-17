<template>
  <div class="mascro-content rel">
    <top-header></top-header>
    <header-nav></header-nav>
    <top-banner></top-banner>

    <!--投资总额-->
    <gross-assets></gross-assets>

    <!--优选理财-->
    <optimization></optimization>

    <!--排行榜-->
    <ranking-list></ranking-list>

    <!--行业资讯-->
    <message></message>
    
    <!--bid:大家都在抢模块-->
    <bid></bid>
    <right-tips></right-tips>
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
    
  </div>
</template>

<script>
import TopHeader from '../components/common/TopHeader';
import HeaderNav from '../components/common/HeaderNav';
import RightTips from '../components/common/RightTips'
import TopBanner from '../components/homeCompents/TopBanner';

import GrossAssets from '../components/homeCompents/GrossAssets';
import Optimization from '../components/homeCompents/Optimization';
import RankingList from '../components/homeCompents/RankingList';
import Message from '../components/homeCompents/Message';
import Bid from '../components/homeCompents/Bid';
import FooterWrap from '../components/common/Footer';
export default {
  components:{TopHeader,HeaderNav,RightTips,TopBanner,GrossAssets,Optimization,RankingList,Message,Bid,FooterWrap},
  name: 'Home',
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
