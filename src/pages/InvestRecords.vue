<template>
  <div class="mascro-content rel">
    <top-header></top-header>
    <header-nav></header-nav>
    <!-- <invest-banner :is-financial="isFinancial"></invest-banner> -->
    <invest-main></invest-main>
    <footer-wrap :is-login="false" :is-register="false"></footer-wrap>
  </div>
</template>

<script>
import TopHeader from '../components/common/TopHeader';
import HeaderNav from '../components/common/HeaderNav';
/*import InvestBanner from '../components/recordComponents/top';*/
import InvestMain from '../components/recordComponents/main';
import FooterWrap from '../components/common/Footer';
export default {
  components:{TopHeader,HeaderNav,InvestMain,FooterWrap},
  name: 'InvestRecords',
  data () {
    return {
      isFinancial: 'TAB2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
