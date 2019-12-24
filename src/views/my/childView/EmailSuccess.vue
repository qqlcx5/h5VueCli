<template>
  <div class="pages">
    <header>
      <span class="iconfont icon-huaban25 back"></span>
      <span >设置</span>
    </header>

    <div class="contentDiv" >

      <div class="content" >
        <img src="@/assets/img/success/success.png" alt="">
        <p>设置成功</p>
      </div>
      <div class="backBtn" @click="handleToEmail">返回</div>
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
.pages{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  header{
    @include flexCenter;
    padding: 20px 24px;
    font-size: 36px;
    background: #FFF;
    position: relative;
    border-bottom: 12px solid $color-f3f3f3;
    .back{
      position: absolute;
      top: 50%;
      left: 24px;
      transform: translate(0, -50%);
      font-size: 30px;
    }
  }
  .contentDiv{
    flex:1;
    padding: 0 46px;
    box-sizing: border-box;
    background-color: #fff;
    .content{
      @include flexCenter;
      flex-direction: column;
      img{
        margin: 100px 0 28px;
        width: 110px;
        height: 110px;
        border-radius: 50%;
      }
      p{
        font-size: 28px;
        margin-bottom: 43px;
        color: $color-333;

      }
    }
    .backBtn{
      @include btn( 100%, 84px,#fff, $color-green, 32px);
      border: 2px solid #32AF8D;
      box-sizing: border-box;
    }
  }
}

</style>
