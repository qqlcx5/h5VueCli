<template>
  <div class="indicators">
    <div class="data">
      <div class="flex">
        <div class="item">
          <div class="title">EOS价格指数</div>
          <div class="price color-green">3.1234 USD</div>
        </div>
        <div class="item">
          <div class="title">
            <span>爆仓罚金</span>
            <svg-icon :icon="'xinxi'" :svgClass="'color-999'"/>
          </div>
          <div class="price">15%</div>
        </div>
      </div>
      <div class="flex">
        <div class="item">
          <div class="title">
            <span>爆仓比率</span>
            <svg-icon :icon="'xinxi'" :svgClass="'color-999'"/>
          </div>
          <div class="price">123%</div>
        </div>
        <div class="item">
          <div class="title">
            <span>年化利率</span>
            <svg-icon :icon="'xinxi'" :svgClass="'color-999'"/>
          </div>
          <div class="price">1.23%</div>
        </div>
      </div>
    </div>

    <!-- 关于USN -->
    <div class="aboutUsn">
      <div class="title">关于USN</div>
      <div class="tips">
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">生成USN - 盘活存量资产</div>
            <div class="tip">杠杆交易，对冲市场风险</div>
            <div class="tip">法币出金，获取流动性现金</div>
          </div>
        </div>
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">偿还USN - 调整债仓规模</div>
            <div class="tip">杠杆交易，对冲市场风险</div>
            <div class="tip">法币出金，获取流动性现金</div>
          </div>
        </div>
        <div class="tipItem">
          <div class="imgDiv"></div>
          <div>
            <div class="subTitle">管理抵押量 - 管控债仓风险</div>
            <div class="tip">杠杆交易，对冲市场风险</div>
            <div class="tip">法币出金，获取流动性现金</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '~style/color.scss';
@import '~style/mixin.scss';

.indicators{
  padding-top: 9px;
  background: $color-f3f3f3;
  // padding: 25px 29px 16px;
  font-size: 24px;

  .data{
    background: $color-white;
    padding: 27px 22px 36px 40px;
    font-size: 25px;

    .flex{
      @include flexbothSides();
      margin-bottom: 38px;

      &>div{
        &:last-child{
          width: 300px;
        }

        .title{
          color: $color-999;
          margin-bottom: 8px;

          &>span{
            margin-right: 11px;
          }
        }
        .price{
          font-size: 30px;
        }
      }
    }
  }

  .aboutUsn{
    .title{
      height: 76px;
      display: flex;
      align-items: center;
      font-size: 25px;
      padding-left: 40px;
    }
    .tips{
      background: $color-white;
      padding: 60px;

      .tipItem{
        display: flex;
        margin-bottom: 80px;

        &:last-child{
          margin-bottom: 0px;
        }
        .imgDiv{
          width: 72px;
          height: 72px;
          background: #fafafa;
          margin-right: 41px;
        }

        .subTitle{
          color: $color-green;
          font-size: 30px;
          margin-bottom: 9px;
        }
      }
    }
  }
}

</style>
