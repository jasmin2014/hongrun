<template>
  <div class="mascro-content rel">
    <top-header></top-header>
    <header-nav></header-nav>
    <div class="mess-wrap big-calcbg">
      <div class="content clear">
          <router-view></router-view> 
      </div>
    </div>
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
  </div>
</template>

<script>
import TopHeader from '../components/common/TopHeader';
import HeaderNav from '../components/common/HeaderNav';

import FooterWrap from '../components/common/Footer';
export default {
  components:{TopHeader,HeaderNav,FooterWrap},
  name: 'Calculator',
  data () {
    return {
      isFinancial: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.big-calcbg {
  background: url('../assets/images/calculaterbg.jpg') no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

</style>
