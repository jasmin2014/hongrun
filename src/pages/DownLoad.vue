<template>
  <div class="download-content rel">
    <div class="frosted-glass">      
    </div>
    <div class="download-inr">
      <div class="download-left-content">
        <p class="download-left-tit">资金不站岗</p>
        <p class="download-left-stit">随时随地由我做主</p>
        <div class="download-code clear">
          <div class="code"><img src="../assets/images/bg_code.png"></div>
          <div class="btns">
            <div class="btn">
              <i class="icon iconfont">&#xe62d;</i>
              IOS版下载
            </div>
            <div class="btn">
              <i class="icon iconfont">&#xe62c;</i>
              Android版下载
            </div>
          </div>
        </div>
      </div>
      <div class="download-right-img">
        <img src="../assets/images/bg_iphone.png">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Guide',
  data () {
    return {     

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .download-content {
    width: 100%;
    height: 100vh;
    background: url("../assets/images/downloadbg.jpg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed; 
 }
 .frosted-glass {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: inherit;   
  -webkit-filter: blur(8px);   
  -moz-filter: blur(8px);   
  -ms-filter: blur(8px);   
  -o-filter: blur(8px);   
  filter: blur(8px);   
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);   
 }
 .download-inr {
    width: 1090px;
    height: 100vh;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -595px;
 }
 .download-right-img {
  width: 400px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -250px;
 }
 .download-right-img img {
  width: 100%;
 }
 .download-left-content {
  width: 400px;
  position: absolute;
  left: 80px;
  top: 50%;
  margin-top: -220px;
  text-align: left;
 }
 .download-left-tit {
  font-size: 350%;
  color: #fff;
  letter-spacing: 10px;
  margin-top: 50px;
 }
 .download-left-stit {
  font-size: 150%;
  color: #fff;
  margin-top: 20px;
  letter-spacing: 6px;
 }
 .download-code {
  margin-top: 30px;
 }
 .code {
  width: 150px;
  height: 150px;
  float: left;
 }
 .code img {
  width: 100%;
 }
 .btns {
  width: 180px;
  float: left;  
  margin-left: 15px;
 }
 .btns .btn {
  width:  100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #fff;
  color: #fff;
  margin-top: 22px;
  border-radius: 10px;
  font-size: 90%;
 }
</style>
