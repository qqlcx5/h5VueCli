<template>
  <div>
    <div class="alertDiv">
      <div>请完成实名认证后，进行交易。</div>
      <div>x</div>
    </div>
    <div class="debtDiv">
      <div class="mydebt">
        <span>您的债仓</span>
        <span class="color-this" @click="handleToDebtRecord" >债仓记录＞</span>
      </div>
      <div class="debtData">
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>
        <div>
          <div class="subTitle">
            <span>生成总额</span><span class="detail">提醒</span>
          </div>
          <div class="num">0.0000</div>
        </div>

      </div>
      <div class="usnDiv">
        <div class="usn" @click="handleToUsn">
          <svg-icon :icon="'tijiaogongdan'" :size="50" :svgClass="'color-green'" />
          <p>生成USN</p>
        </div>
        <div class="usn">
          <svg-icon :icon="'tijiaogongdan'" :size="50" :svgClass="'color-red'" />
          <p>生成USN</p>
        </div>
        <div class="usn">
          <svg-icon :icon="'tijiaogongdan'" :size="50" :svgClass="'color-this'"  />
          <p>生成USN</p>
        </div>
      </div>
    </div>
    <div class="exponentDiv">
      <span>EOS价格指数</span>
      <span class="color-add">3.2324 USN</span>
    </div>
    <div class="filmingDiv">
      <span>正在抢拍：<span class="num">4123.1234 EOS</span> </span>
      <span>爆仓抢拍 ></span>
    </div>
    <div class="listDiv">
      <div class="subTitle">债仓排行</div>
      <div class="list">
        <div class="name">
          <div class="acount mg6">账户名</div>
          <div class="total">借出总量(USN）</div>
          <div class="price">爆仓价格(EOS）</div>
        </div>
        <div class="item" v-for="(item, index) in rankList" :key="index">
          <div class="rank">{{index+1}}</div>
          <div class="acount">{{item.user}}</div>
          <div class="total">{{item.issue}}</div>
          <div class="price color-add ">{{item.risk}}</div>
        </div>
      </div>
    </div>
    <!-- 最新记录 -->
      <div class="newList">
        <div class="subTool">
          <span>最新记录</span>
          <!-- <span class="minsTip">22222</span> -->
        </div>
        <div class="lists">
          <div class="list" v-for="(item, $index) in 2" :key="$index">
            <div>
              <!-- <div class="time">{{ handleToLocalTime(item.createTs).substr(0, 16) }}</div> -->
              <div class="time">2019-10-27   10:36:22</div>
              <div class="type color-green">借出USN</div>
            </div>
            <div>
              <div class="account">lov*****han</div>
              <div class="get">1230.1223USN</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { EosModel } from '@/utils/eos';

export default {
  data() {
    return {
      rankList: [],
    }
  },
  mounted () {
    this.handleGetStablecoinInfo();
  },
  methods:{
    handleToDebtRecord(){
      this.$router.push({name:'debtRecord'})
    },
    handleToUsn(){
      this.$router.push({name:'actionForUsn'})
    },
    // id: 3, label: '债仓榜', key: 'byissue',
    // id: 2, label: '预警榜', key: 'byrisk'
    // 获取债仓榜 预警榜
    handleGetStablecoinInfo() {
      const params = {
        limit: 10,
        tableKey: 'byissue',
        indexPosition: 3
      }
      EosModel.getStablecoinInfo(params, (res) => {
        if (res && res.rows) {
          this.rankList = res.rows;
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
// @import "~style/public.scss";
// @import "~style/mixin.scss";
.alertDiv {
  @include flexbothSides;
  padding: 0 24px;
  box-sizing: border-box;
  font-size: 24px;
  color: #EA573C;
  height: 65px;
  background: rgba(234, 87, 60,0.15);
}
.debtDiv{
  padding: 0 25px;
  box-sizing: border-box;
  background-color: #fff;
  .mydebt{
    @include flexbothSides;
    height: 93px;
    padding: 0 10px;
    font-size: 25px;
    color: #333333;
    box-sizing: border-box;
    border-bottom: 2px solid #C7C7C7;
  }
   .debtData {
    display: flex;
    flex-wrap: wrap;
    padding: 36px 6px 0;
    border-bottom: 2px solid #C7C7C7;
    & > div {
      width: 50%;
      margin-bottom: 58px;

      &:nth-child(2n) {
        box-sizing: border-box;
        padding-left: 50px;
      }
    }
    .subTitle{
      font-size: 25px;
      color: #999999;
      margin-bottom: 10px;
      .detail{
        margin-left: 25px;
        font-size: 24px;
        color: $color-this;
      }
    }
    .num{
      font-size: 30px;
      color: #333333;
    }
  }
  .usnDiv{
    font-size: 24px;
    color: #333333;
    display: flex;

    // justify-content: space-around;
    .usn{
      padding: 46px 0 46px 0;
      flex: 1;
      @include flexCenter;
      flex-direction: column;
      p{
        margin-top: 20px;
      }
    }
  }
}
.exponentDiv{
  @include flexbothSides;
  border-top: 12px solid #f3f3f3;
  padding: 35px 30px 33px;
  font-size: 25px;
  color: #333333;
  box-sizing: border-box;
  background-color: #fff;
}
.filmingDiv{
  @include flexbothSides;
  padding: 31px 30px;
  font-size: 24px;
  color: $color-green;
  box-sizing: border-box;
  background: rgba(1,181,164,0.15);
  .num{
    font-size: 30px;
    color: $color-add;
  }
}
.listDiv{
  .subTitle{
    padding: 24px 30px;
    box-sizing: border-box;
    background: #f3f3f3;
    font-size: 25px;
    color: #333333;
  }
  .list{
    padding: 0 25px;
    box-sizing: border-box;
    background-color: #fff;
    .name{
      display: flex;
      align-items: center;
      height: 82px;
      border-bottom: 2px solid #C7C7C7;
      // padding: 29px 0 17px;
      font-size: 25px;
      color: #999999;

    }
    .item{
      display: flex;
      align-items: center;
      height: 80px;
      padding: 0 5px;
      box-sizing: border-box;
      font-size: 28px;
      color: #333333;
    }
    .rank{
        width: 55px;
      }
      .acount{
        flex: 1;
        &.mg6{
          margin-left: 60px;
        }
      }
    .total,.price{
      width: 250px;
      text-align: right;
    }


  }
}
 .newList {
    .subTool {
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px 0 25px;
      font-size: 25px;
      background: #F3F3F3;

      .minsTip {
        color: $color-999;
      }
    }
    .lists {
      background: #fff;
      .list {
        padding: 25px 0px;
        margin: 0rem 30px;
        font-size: 28px;
        color: #333333;
        border-bottom: 2px solid $color-input;

        &:last-child {
          border-bottom: none;
        }

        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:last-child {
            margin-top: 11px;
          }

          .time {
            font-size: 24px;
            color: $color-999;
          }
          .type {
            font-size: 24px;
          }
          // .account {
          //   font-size: 28px;
          // }
          // .get {
          //   font-size: 28px;
          // }
        }
      }
    }
  }
</style>
