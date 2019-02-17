<template>
  <div class="about-nav">
      <div class="about-nav-main">
        <ul class="navs">
          <li><router-link :to="{name:'Platform'}" :class="[routeName == 'Platform' ? 'active':'','']">平台简介</router-link></li>
          <li><router-link :to="{name:'Recruit'}" :class="[routeName == 'Recruit' ? 'active':'','']">发标预告</router-link></li>
          <li><router-link :to="{name:'Notice'}" :class="[routeName == 'Notice' ? 'active':'','']">网站公告</router-link></li>
          <li><router-link :to="{name:'News'}" :class="[routeName == 'News' ? 'active':'','']">前沿资讯</router-link></li>
          <li><router-link :to="{name:'Question'}" :class="[routeName == 'Question' ? 'active':'','']">常见问题</router-link></li>
          <li><router-link :to="{name:'Law'}" :class="[routeName == 'Law' ? 'active':'','']">资质证明</router-link></li>
          <li><router-link :to="{name:'Contact'}" :class="[routeName == 'Contact' ? 'active':'','']">联系我们</router-link></li>
          <li><router-link :to="{name:'Security'}" :class="[routeName == 'Security' ? 'active':'','']">安全保障</router-link></li>
        </ul>
      </div>
      </div>
</template>

<script>
export default {
  name: 'AboutNav',
  data () {
    return {
      routeName: ''
    }
  },
  created(){
    this.routeName = this.$route.name;
  },
  watch: {
    '$route'() {
      this.routeName = this.$route.name;
      if(this.routeName == 'Detail'){
        switch(this.$route.query.type){
          case 1:
            this.routeName = 'Recruit';
            break;
          case 2:
            this.routeName = 'Notice';
            break;
          case 3:
            this.routeName = 'News';
            break;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.about-nav{
    background: #fff;
    border-bottom: 1px solid #eaeaea;
  }
  div.about-nav-main{
    width: 1190px;
    margin: 0 auto;
    overflow: hidden;
  }
  div.about-nav .navs {
    /*margin: 0px auto;*/
    /*margin-left: 20px;*/
  }
  div.about-nav .navs li {
    float: left;
    height: 50px;
    line-height: 50px;
    margin-right: 80px;
  }
  div.about-nav .navs li a{
    display: block;
    height: 98%;
  }
  div.about-nav .navs li a.active{
    border-bottom: 2px solid red;
  }
</style>
