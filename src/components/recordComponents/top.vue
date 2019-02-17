<template>
  <div class="topcod-container">
    <div class="content" v-if="isFinancial==='TAB2'">
      <ul class="clear">
        <li>理财状态：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>进行中</span></li>
        <li><span>复审中</span></li>
        <li><span>还款中</span></li>
        <li><span>已完成</span></li>
      </ul>
      <ul class="clear">
        <li>借款期限：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>3个月以内</span></li>
        <li><span>4-6个月</span></li>
        <li><span>7-12个月</span></li>
        <li><span>13-24个月</span></li>
      </ul>
      <ul class="clear">
        <li>年化收益：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>10%以下</span></li>
        <li><span>10%-15%</span></li>
        <li><span>15%以上</span></li>
      </ul>
    </div>
    <div class="content" v-else>
      <ul class="clear">
        <li>标的状态：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>进行中</span></li>
        <li><span>复审中</span></li>
        <li><span>还款中</span></li>
        <li><span>已完成</span></li>
      </ul>
      <ul class="clear">
        <li>借款期限：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>3个月以内</span></li>
        <li><span>4-6个月</span></li>
        <li><span>7-12个月</span></li>
        <li><span>13-24个月</span></li>
      </ul>
      <ul class="clear">
        <li>信用等级：</li>
        <li class="active-item"><span>不限制</span></li>
        <li><span>HR</span></li>
        <li><span>E</span></li>
        <li><span>D</span></li>
        <li><span>C</span></li>
        <li><span>B</span></li>
        <li><span>A</span></li>
      </ul>
    </div>    
  </div>
</template>

<script>

export default {
  props: ['isFinancial'],
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
.topcod-container {
  width: 100%;
  padding: 50px 0;
  background: url('../../assets/images/reg-bg.jpg') no-repeat center center;
  background-size: cover;
}
.topcod-container .content {
  background: rgba(255,255,255,.9);
  padding: 30px 20px;
}
.topcod-container .content ul {
  margin-top: 20px;
}
.topcod-container .content ul:first-child {
  margin-top: 0;
}
.topcod-container .content ul li {
  float: left;
  padding: 5px 25px;
  font-size: 90%;
}
.topcod-container .content ul li:first-child {
  padding: 5px 0 5px 10px;
}
.topcod-container .content ul li.active-item span{
  background: #d92818;
  color: #fff;
  display: inline-block;
  padding: 0 10px;  
  line-height: 25px;
}

</style>
