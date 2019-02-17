<template>
  <div class="main-wrap">
     <h3 class="main-title">联系我们</h3>
     <div class="main-content">
       <p>联系电话：0577-63191188</p>
       <p>联系地址：浙江省温州市平阳县昆阳镇体育馆路42号</p>
       <img src="../../assets/images/contact.jpg" style="width: 100%;">
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
  div.main-content p{
    text-align: left;
    height: 30px;
    line-height: 30px;
  }
  div.main-content p:first-child{
    margin-top: 10px;
  }
</style>
