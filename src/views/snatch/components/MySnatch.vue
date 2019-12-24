<template>
  <div class="mySnatch">
     <div class="debtData">
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num">123456.1234 EOS</div>
        </div>
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num">123456.1234 EOS</div>
        </div>
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num">123456.1234 EOS</div>
        </div>
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num">123456.1234 EOS</div>
        </div>
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num">12345222226.1234 EOS</div>
        </div>
        <div>
          <div class="subTitle">
            <span>抢拍数量</span>
          </div>
          <div class="num color-this">sninfdniainfdniainfdniaidfjaa34</div>
        </div>
    </div>

  </div>
</template>

<script>
import { auctionRecord } from "@/service"
export default {
  name: "mySnatch",
  data() {
    return {
      mySnatchData: []
    };
  },
  mounted() {
    this.handleInitData();
  },
  methods: {
    async handleInitData() {
      const {status, result} = await auctionRecord.getAuctionRecordPage();
      if (status) {
        this.mySnatchData = result.page;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .debtData {
    display: flex;
    flex-wrap: wrap;
    padding: 31px 25px 14px;
    background-color: #fff;
    // border-bottom: 2px solid #C7C7C7;
    & > div {
      width: 50%;
      margin-bottom: 46px;

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
      font-size: 28px;
      color: #333333;
      @include ellipsis;
    }
  }
</style>
