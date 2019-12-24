<template>
  <div class="serveStop">
    <div class="center">
      <div><img class="img" src="@/assets/img/success/success.png" alt=""></div>
      <div class="title">系统维护</div>
      <div class="tips">
        <div>暂无法进行债仓操作</div>
        <div>您的抵押物是安全的，请您放心</div>
        <div>维护期间造成的不便敬请谅解，感谢您的支持！</div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '~style/color.scss';
@import '~style/mixin.scss';

.serveStop{
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(255, 255, 255, .9);
  text-align: center;
  font-size: 25px;
  @include flexCenter();

  .center{
    .img{
      width: 190px;
      height: 156px;
    }
    .title{
      color: $color-green;
      font-size: 30px;
      margin: 25px 0 20px;
    }
  }
}

</style>
