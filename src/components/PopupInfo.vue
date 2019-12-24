<template>
  <div class="popupTip">
    <span class="iconfont icon-huaban17 popupClose" @click="handleClosePopup(false)"></span>
    <div class="popupTitle">{{json.title}}</div>
    <div class="popupContent">
      <div>{{json.content}}</div>
    </div>
    <div class="btnDiv" v-if="!json.nobtn">
      <div class="popupBtn cancel" v-if="json.mulbtn" @click="handleClosePopup(false)">{{json.mulbtn}}</div>
     <div class="popupBtn" @click="handleClosePopup(true)">{{json.btn}}</div>
    </div>
  </div>
</template>

<script>
export default {
  /*
   * json{
   * title:标题
   * content 内容
   * btn 按钮文字
   * mulbtn 按钮文字
   * nobtn 没按钮 默认 false
   * }
   */
  props: {
    json:{
      type:Object,
      required:true,
      default:()=>{},
    }
  },
  methods: {
    /**
     * false 逻辑一
     * true 逻辑二 默认
     * */
    handleClosePopup(val) {
      this.$emit("listenClose", val);
    },
    // handleClosePopup() {
    //   this.$emit("listenSure", false);
    // }
  }
};
</script>

<style scoped lang="scss">

.popupTip {
  padding: 41px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  width: 621px;
  text-align: center;
  position: relative;

  .popupClose {
    position: absolute;
    right: 20px;
    top: 20px;
    color: $color-999;
    font-size: 25px;
  }

  .popupTitle {
    font-size: 36px;
    color: $color-this;
    margin-bottom: 33px;
  }

  .popupContent {
    text-align: left;
    font-size: 28px;
    color: $color-333;
    margin-bottom: 40px;
  }
  .btnDiv{
    display: flex;
    .popupBtn {
      margin-top: 20px;
      border-radius: 10px;
      flex:1;
      height: 77px;
      line-height: 77px;
      font-size: 27px;
      color: #ffffff;
      text-align: center;
      background: $color-green;
      &.cancel{
        background: #C7C7C7;
        margin-right: 20px;
      }
    }
  }

}
</style>
