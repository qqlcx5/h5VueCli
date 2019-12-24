<template>
  <div class="popupTip">
    <span class="iconfont icon-huaban17 popupClose" @click="handleClosePopup"></span>
    <slot />
    <!-- <mt-popup class="mtPopup" popup-transition="vant-fade">
    </mt-popup> -->
    <!-- <div class="popupTitle">提示</div>
    <div class="popupContent">
      Newpool遵循每条公链的质押/解押规则，不会额外添加限制。
    </div> -->
    <!-- <div class="popupBtn" @click="handleClosePopup">{{ $t('public.sure') }}</div> -->
  </div>
</template>

<script>
export default {
  methods: {
    // 关闭弹窗
    handleClosePopup() {
      this.$emit('listenClose', false)
    },
  }
}
</script>

<style scoped lang="scss">

.popupTip{
  padding: 41px;
  box-sizing: border-box;
  background: #FFF;
  border-radius: 10px;
  width: 621px;
  text-align: center;
  position: relative;

  .popupClose{
    position: absolute;
    right: 20px;
    top: 20px;
    color: $color-999;
    font-size: 25px;
  }

  .popupTitle{
    font-size: 36px;
    color: $color-this;
    margin-bottom: 33px;
  }

  .popupContent{
    text-align: center;
    font-size: 28px;
    color: $color-333;
    margin-bottom: 44px;
  }

  .popupBtn{
    margin-top: 24px;
    background: $color-this;
    border-radius: 9.6px;
    width: 100%;
    height: 77px;
    line-height: 77px;
    font-size: 27px;
    color: #fff;
    text-align: center;
  }
}
</style>
