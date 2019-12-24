<template>
  <div>
    <div class="emailDiv">
      <div class="item">
        <div class="name">邮箱地址</div>
        <div class="arrow">otc******@qq.com <span @click="handleToSetEmail">修改</span> </div>
      </div>
    </div>
    <div class="listDiv">
      <div class="remind">
        <div class="name">
          <div class="title">邮箱提醒</div>
          <div @click="onSwitch =!onSwitch"><mt-switch :type="onSwitch" /></div>
        </div>
        <div class="desc">及时提醒您的债仓状态，以及爆仓订单的抢拍提醒。</div>
      </div>
      <div class="warnDiv">
        <div class="info">
          <span class="title mb10">我的债仓提醒</span>
          <span class="desc">您的债仓抵押比率≦145%时，向您发送提醒邮件。</span>
        </div>
        <div class="checkboxDiv" :class="{'checked': showAddStake}">
            <svg-icon :icon="'checkbox'" :size="28" :svgClass="'color-green'" v-if="showAddStake"/>
        </div>
      </div>
      <div class="warnDiv">
        <div class="info">
          <span class="title mb10">我的债仓提醒</span>
          <span class="desc">您的债仓抵押比率≦145%时，向您发送提醒邮件。</span>
        </div>
        <div class="checkboxDiv" :class="{'checked': showAddStake}" @click="showAddStake = !showAddStake">
            <svg-icon :icon="'checkbox'" :size="28" :svgClass="'color-green'" v-if="showAddStake"/>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import mtSwitch from '@/components/Switch.vue'
export default {
  components:{
    mtSwitch
  },
  data() {
    return {
      onSwitch: true,
      showAddStake:true
    }
  },
  methods:{
    handleToSetEmail(){
      this.$router.push({name:'setEmail'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .emailDiv{
     padding: 0 36px;
     box-sizing: border-box;
     background-color: #fff;
     margin-bottom: 12px;
    .item{
      @include flexbothSides;
      height: 100px;
      .name{
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #333333;
      }
      .arrow{
        display: flex;
        align-items: center;
        font-size: 25px;
        color: $color-999;
        span{
          margin-left: 16px;
          color: $color-this;
        }
      }


    }
  }
  .listDiv{
    padding: 0 36px 40px;
    background-color: #fff;
    .remind{
      padding: 47px 0 28px;
      display: flex;
      flex-direction: column;

      border-bottom: 2px solid #E1E1E1;
      .name{
        @include flexbothSides;
        margin-bottom: 10px;
      }
    }
    .title{
      font-size: 28px;
      color: #333333;
      &.mb10{
        margin-bottom: 10px;
      }
    }
    .desc{
      font-size: 24px;
      color: #999999;
    }
    .warnDiv{
      display: flex;
      align-items: center;
      padding-top: 28px;
      .info{
        display: flex;
        flex:1;
        flex-direction: column;
      }
      .checkboxDiv{
        display: flex;
        align-items: center;
        margin-right: 11px;
        height: 28px;
        width: 28px;
        border: 1px solid $color-input;
        border-radius: 3.89px;
        box-sizing: border-box;

        &.checked{
          border: 0px solid $color-input;
        }
      }
    }

  }
</style>