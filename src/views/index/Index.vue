<template>
  <div>
    <div class="swiperDiv">
      <Swiper/>
    </div>
    <!--公告 -->
    <notice/>
    <div class="debtDiv">
      <div class="mydebt">
        <span>全站债仓</span>
        <!-- <span class="color-this">债仓记录＞</span> -->
      </div>
      <div class="debtData">
        <!-- 生成总额 -->
        <div>
          <div class="subTitle">
            <span>生成总额</span>
            <!-- <span class="detail">提醒</span> -->
          </div>
          <div class="num">123456.3215 USN</div>
        </div>
        <!-- 抵押总量 -->
        <div>
          <div class="subTitle">
            <span>抵押总量</span>
          </div>
          <div class="num"></div>
        </div>
        <!-- 24H生成总额 -->
        <div>
          <div class="subTitle">
            <span>24H生成总额</span>
          </div>
          <div class="num color-add">+22323.1234 USN</div>
        </div>
        <!-- 24H抵押量 -->
        <div>
          <div class="subTitle">
            <span>24H抵押量</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <!-- 平均抵押率 -->
        <div>
          <div class="subTitle">
            <span>平均抵押率</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <!-- 年化利率 -->
        <div>
          <div class="subTitle">
            <span>年化利率</span>
          </div>
          <div class="num">0.0000</div>
        </div>
      </div>
    </div>
    <!-- 什么是USN -->
    <div class="whatUsn">
      <div class="title"> <i class="line"></i> 什么是USN？</div>
      <div class="tips">
        <div class="logoDiv">
          <img src="../../assets/img/chain/EOS.png" alt="">
        </div>
        <div class="tip">USN是基于EOS抵押发行的新一代去中心化稳定币，它1:1锚定美元；</div>
        <div class="tip">通过超额抵押与爆仓抢拍的风控机制，有效规避市场风险，确保有足额抵押物为每个USN提供价值支撑。</div>
        <div class="tip">基于智能合约运行，信息公开透明，数据在链上实时可查。</div>
        <div class="tip">抵押发行USN，可满足杠杆交易、获取流动资金等多种金融交易场景。</div>
      </div>
    </div>
    <!-- 我们的优势 -->
    <div class="aboutUsn">
      <div class="title"> <i class="line"></i> 我们的优势</div>
      <div class="tips">
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">价格稳定</div>
            <div class="tip">锚定美元，价格稳定，规避市场下沉风险</div>
          </div>
        </div>
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">资金安全</div>
            <div class="tip">基于EOS去中心化发行，链上交易，信息公开透明</div>
          </div>
        </div>
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">良好的用户体验</div>
            <div class="tip">杠杆交易，对冲市场风险</div>
          </div>
        </div>
      </div>
    </div>
    <div class="qaqDiv">
      <div class="title"> <i class="line"></i> 常见问题 </div>
      <div class="tips">
        <ul>
          <li>Sktaing挖矿真的安全吗？</li>
          <li>挖矿收益从哪里来？</li>
          <li>EOS如何挖矿？</li>
          <li>COSMOS如何挖矿？</li>
          <li>IOST如何挖矿？</li>
          <li class="more">更多问题 ＞</li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      <span>Copyright© Newdex.io,All rights reserved</span>
      <span class="desc">USN 新一代去中心化稳定币</span>
    </div>
  </div>
</template>
<script>
import Swiper from './components/Swiper'
import Notice from './components/Notice'
export default {
  components:{
    Swiper,
    Notice
  }
}
</script>
<style lang="scss" scoped>
.swiperDiv {
  height: 380px;
  background: rgba(234, 87, 60, 0.15);
}
.debtDiv {
  padding: 0 25px;
  box-sizing: border-box;
  background-color: #fff;
  .mydebt {
    @include flexbothSides;
    height: 90px;
    padding: 0 10px;
    font-size: 25px;
    color: #333333;
    box-sizing: border-box;
    border-bottom: 2px solid #c7c7c7;
  }
  .debtData {
    display: flex;
    flex-wrap: wrap;
    padding: 36px 6px 0;
    // border-bottom: 2px solid #C7C7C7;
    & > div {
      width: 50%;
      margin-bottom: 58px;

      &:nth-child(2n) {
        box-sizing: border-box;
        padding-left: 50px;
      }
    }
    .subTitle {
      font-size: 25px;
      color: #999999;
      margin-bottom: 10px;
      .detail {
        margin-left: 25px;
        font-size: 24px;
        color: $color-this;
      }
    }
    .num {
      font-size: 30px;
      color: #333333;
    }
  }
  .usnDiv {
    font-size: 24px;
    color: #333333;
    display: flex;

    // justify-content: space-around;
    .usn {
      padding: 46px 0 46px 0;
      flex: 1;
      @include flexCenter;
      flex-direction: column;
      p {
        margin-top: 20px;
      }
    }
  }
}
.whatUsn{
  .title {
    height: 90px;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-left: 20px;
    .line{
      height: 28px;
      width: 4px;
      display: block;
      background: #32AF8D;
      margin-right: 12px;
    }
  }
  .tips {
    background: $color-white;
    padding: 20px 30px 20px 20px;
    font-size: 24px;
    color: #9B9B9B;
    .logoDiv{
      height: 236px;
      display: flex;
      justify-content: center;
      margin: 50px 0;
      img{
        width: 236px;
        height: 236px;
      }
    }
    .tip{
      font-size: 27px;
      color: #3A3949;
      padding-left: 30px;
      position: relative;
      margin-bottom: 25px;

    &::before{
      content: '';
      position: absolute;
      width: 9px;
      height: 9px;
      background: #8197D3;
      border-radius: 20px;
      left: 15px;
      top: 18px;
      transform: translate(-50%, -50%);
      }
    }
  }
}
.aboutUsn {
  .title {
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-left: 20px;
    .line{
      height: 28px;
      width: 4px;
      display: block;
      background: #32AF8D;
      margin-right: 12px;
    }
  }
  .tips {
    background: $color-white;
    padding: 60px;
    font-size: 24px;
    color: #9B9B9B;

    .tipItem {
      display: flex;
      margin-bottom: 58px;

      &:last-child {
        margin-bottom: 0px;
      }
      .imgDiv {
        width: 72px;
        height: 72px;
        background: #999;
        margin-right: 41px;
      }

      .subTitle {
        color: $color-333;
        font-size: 30px;
        margin-bottom: 9px;
      }
    }
  }
}
.qaqDiv{
  .title {
    height: 90px;
    display: flex;
    align-items: center;
    font-size: 25px;
    padding-left: 20px;
    .line{
      height: 28px;
      width: 4px;
      display: block;
      background: #32AF8D;
      margin-right: 12px;
    }
  }
  .tips{
    padding: 0 30px;
    background: $color-white;
    font-size: 27px;
    color: #3A3949;
    li{
      height: 98px;
      line-height: 98px;
      border-bottom: 2px solid #C7C7C7;
    }
    .more{
      color: $color-this;
      text-align: center;
      border-bottom: none;
      font-size: 25px;
    }
  }
}
.copyright{
  background: #06042B;
  height: 210px;
  @include flexCenter;
  flex-direction: column;
  font-size: 21px;
  color: #9B9B9B;
  .desc{
    color: #fff;
    margin-top: 25px;
  }
}
</style>