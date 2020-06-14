<template>
  <div class="pages">
    <header>
      <div class="userDiv">
        <div class="user">
           <svg-icon :icon="'acount'" :size="30" />
        </div>
        <span>DALI2345678</span>
      </div>
      <span class="valuationName">总估值</span>
      <span class="valuationNum">7777777 USN <span class="valuationCNY">/ ≈¥2222.233</span> </span>
    </header>
    <div class="contentDiv">
      <div class="chainDiv">
        <div class="chainItem">
          <div class="chainName">
            <div class="name"><img src="../../assets/img/chain/EOS.png" alt="">EOS</div>
            <span class="operate">抵押</span>
          </div>
          <div class="chainNum">
            <div class="item">
              <span>可用 <span class="chain">（EOS）</span></span>
              <span class="num">2323456.1234</span>
            </div>
            <div class="item">
              <span>估值<span class="chain">（USN）</span></span>
              <span class="num">2323456.1234</span>
            </div>
          </div>
        </div>
        <div class="chainItem">
          <div class="chainName">
            <div class="name"><img src="../../assets/img/chain/EOS.png" alt="">EOS</div>
            <span class="operate">抵押</span>
          </div>
          <div class="chainNum">
            <div class="item">
              <span>可用 <span class="chain">（EOS）</span></span>
              <span class="num">2323456.1234</span>
            </div>
            <div class="item">
              <span>估值<span class="chain">（USN）</span></span>
              <span class="num">2323456.1234</span>
            </div>
          </div>
        </div>

      </div>
      <div class="listDiv">
        <div class="item" @click="handleToEmail">
          <div class="name"> <svg-icon icon="tishi" :size="46" :svgClass="'itemIcon'" /> 邮箱提醒</div>
          <div class="arrow">otc******@qq.com <svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
        <div class="item">
          <div class="name"> <svg-icon :icon="'icon-language'" :size="48" :svgClass="'itemIcon'" /> 切换语言</div>
          <div class="arrow">简体中文 <svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
        <div class="item">
          <div class="name"> <svg-icon :icon="'icon-acount'" :size="48" :svgClass="'itemIcon'" /> 关于我们</div>
          <div class="arrow"><svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
        <div class="item">
          <div class="name"> <svg-icon :icon="'icon-tijiaogongdan'" :size="44" :svgClass="'itemIcon'" /> 提交工单</div>
          <div class="arrow"><svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
        <div class="item">
          <div class="name"> <svg-icon icon="icon-diya" :size="50" :svgClass="'itemIcon'" /> 抵押账户</div>
          <div class="arrow"><svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
        <div class="item">
          <div class="name"> <svg-icon :icon="'icon-xinshoujiaocheng'" :size="48" :svgClass="'itemIcon'" /> 帮助中心</div>
          <div class="arrow"><svg-icon icon="icon-arrow-right" :size="24" :svgClass="'arrowIcon'" /> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
    }
  },
  methods:{
    handleToEmail(){
      this.$router.push({name:'emailRemind'})
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~style/mixin.scss';
@import '~style/color.scss';
.pages{
  header{
    display: flex;
    flex-direction: column;
    font-size: 36px;
    color: #FFFFFF;
    padding: 24px 0 40px 35px;
    box-sizing: border-box;
    background: $color-green;
    .userDiv{
      display: flex;
      align-items: center;
      font-size: 32px;

      margin-bottom: 38px;
      .user{
        width: 55px;
        height: 55px;
        margin-right: 10px;
        border-radius: 50%;
        @include flexCenter;
        background: rgba(255,255,255,0.24);
        // .userIcon{
        //   color: #fff;
        //   font-size: 30px;
        // }
      }
    }
    .valuationName{
      font-size: 25px;
    }
    .valuationNum{
      margin-top: 6px;
      font-size: 45px;

      .valuationCNY{
        font-size: 25px;
      }
    }

  }
  .chainDiv{
    display: flex;
    flex-direction: column;
    padding: 0 36px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 10px solid #f3f3f3;
    .chainItem{
      display: flex;
      flex-direction: column;
      border-bottom: 2px solid #E1E1E1;
      &:last-child{
        border-bottom: none;
      }
      .chainName{
        @include flexbothSides;
        padding: 24px 0;
        .name{
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
          }
        }
        .operate{
          color: $color-this;
          margin-right: 30px;
        }
      }
      .chainNum{
        display: flex;
        background: #FAFAFA;
        border-radius: 5px;
        margin-bottom: 38px;
        .item{
          margin: 24px 0 29px 57px;
          font-size: 25px;
          color: $color-999;
          .chain{
            font-size: 21px;
          }
          .num{
            margin-top: 2px;
            font-size: 30px;
            color: $color-333;
          }
        }
      }
    }
  }
  .listDiv{
     padding: 0 36px;
     box-sizing: border-box;
     background-color: #fff;
     margin-bottom: 12px;
    .item{
      @include flexbothSides;
      height: 117px;
      border-bottom: 2px solid #E1E1E1;;
      &:last-child{
        border-bottom: none;
      }
      .name{
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #333333;
        .itemIcon{
          // font-size: 46px;
          color: $color-green;
          margin-right: 24px;
        }
      }
      .arrow{
        display: flex;
        align-items: center;
        font-size: 25px;
        color: $color-999;
        .arrowIcon{
           margin: 0 12px 0 30px;
           color: $color-999;
          //  font-size: 24px;
        }
      }


    }
  }
}

</style>
