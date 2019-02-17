<template>
  <div class="main-wrap">
     <h3 class="main-title">安全保障</h3>
     <div class="main-content">
       <img src="../../assets/images/security.jpg" style="width: 100%;">
     </div>
  </div>
</template>

<script>
export default {
  name: 'AboutNav',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.main-wrap{
    width: 1190px;
    margin: 0px auto;
    background: #fff;
    overflow: hidden;
    padding: 30px;
  }
  h3.main-title{
    text-align: left;
    height: 40px;
    line-height: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e3e3;
    font-size: 20px;
    font-weight: 500;
    font-family: "Microsoft Yahei";
    color: #666;
    letter-spacing: 1px;
  }
  div.main-content{
    padding-top: 20px;
  }
</style>
