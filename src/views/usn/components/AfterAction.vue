<template>
  <div class="afterAction">
    <div class="title">
      <span v-if="type === 'generate'">生成USN后</span>
      <span v-else-if="type === 'repay'">偿还USN后</span>
      <span v-else-if="type === 'add'">增加USN后</span>
      <span v-else>减少USN后</span>
    </div>
    <div class="bg">
      <!-- 生成总额 -->
      <div class="item">
        <div class="subTitle">生成总额</div>
        <div class="num">
          <span>{{ afterActionData.allGenerate || '0.0000' }}</span>
          <span class="coin"> USN</span>
        </div>
      </div>
      <!-- 抵押总量 -->
      <div class="item">
        <div class="subTitle">抵押总量</div>
        <div class="num">
          <span>{{ afterActionData.allStaked || '0.0000' }}</span>
          <span class="coin"> EOS</span>
        </div>
      </div>
      <!-- 抵押比率 -->
      <div class="item">
        <div class="subTitle">抵押比率</div>
        <div class="num color-yellow">{{ afterActionData.percent || '0.00' }}%</div>
      </div>
      <!-- 爆仓价格 -->
      <div class="item">
        <div class="subTitle">
          <span>爆仓价格</span>
          <span class="iconfont"></span>
        </div>
        <div class="num">
          <span>{{ afterActionData.snatchPrice || '0.0000' }}</span>
          <span class="coin"> USN/EOS</span>
        </div>
      </div>
      <!-- 待还利息 -->
      <div class="item" v-if="false">
        <div class="subTitle">待还利息</div>
        <div class="num color-add">
          <span>1233.0021</span>
          <span class="coin"> USN</span>
        </div>
      </div>
      <!-- 待还金额 -->
      <div class="item" v-if="false">
        <div class="subTitle">
          <span>待还金额</span>
          <span class="iconfont"></span>
        </div>
        <div class="num">
          <span>1233.0021</span>
          <span class="coin"> USN</span>
        </div>
      </div>
      <!-- 什么是爆仓？ -->
      <div class="what">什么是爆仓？</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    type: {
      type: String,
    },
    afterActionData: {
      type: Object,
      default: () => {
        return {
          allstaked: '0.0000',
          allGenerate: '0.0000',
          snatchPrice: '0.0000',
          percent: '0.0000',
        }
      }
    }
  },
  watch: {
    type() {
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '~style/color.scss';
@import '~style/mixin.scss';

.afterAction{
  width: 300px;
  margin: 36px 22px 68px 0;
  font-size: 24px;

  .title{
    font-size: 25px;
  }

  .bg{
    margin-top: 21px;
    background: $color-fafafa;
    padding: 22px 6px 22px 26px;
    box-sizing: border-box;
    border-radius: 5px;

    .item{
      margin-bottom: 15px;

      .subTitle{
        color: $color-999;
        margin-bottom: 2px;
      }
      .num{
        line-height: 40px;

        .coin{
          font-size: 21px;
        }
      }
    }

    .what{
      margin-top: 110px;
      font-size: 24px;
      color: $color-999;
      text-align: right;
    }
  }
}

</style>
