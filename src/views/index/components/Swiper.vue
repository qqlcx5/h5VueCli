<template>
  <div class="swiper-container swiper-container_index" :class="{'h5Height': channel === 'h5'}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-if="!bannerList.length">
        <div class="banner">
          <div class="center">
            <div class="iconfont icon-huaban23 logoIcon"></div>
            <div class="bannerTitle">none</div>
          </div>
        </div>
      </div>
      <!-- bannerList 展示 -->
      <template v-if="bannerList && bannerList.length">
        <div class="swiper-slide" @click="handleToHref(item.eventUrl)" v-for="(item, $index) in bannerList" :key="$index">
          <div class="bannerActivityImg">
            <img :src="item.imageUrl" width="100%" />
          </div>
        </div>
      </template>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination swiper-pagination_index"></div>
  </div>
</template>
<script>
import Swiper from 'Swiper'

export default {
  data() {
    return {
      bannerList:[],
      channel: 'dapp'
    }
  },
  methods: {
    // 启动swiper
    handleSwiperStart() {
      this.swiper = new Swiper(".swiper-container_index", {
        loop: true,
        autoplay: 3000,
        pagination: ".swiper-pagination_index",
        onClick: swiper => {
          const realIndex = swiper.realIndex;
          const eventUrl = this.bannerList[realIndex].eventUrl;
          this.handleToHref(eventUrl);
        }
      });
    },
    // banner跳转
    handleToHref(url) {
      if (!url) {
        return;
      }
      // 处理 m.newdex. 域名下链接
      if (
        url &&
        (url.indexOf("https://m.newdex.") !== -1 ||
          url.indexOf("https://m.tron.newdex.") !== -1)
      ) {
        let urlArr1 = url.split("https://m.newdex.");
        if (url.indexOf("https://m.tron.newdex.") !== -1) {
          urlArr1 = url.split("https://m.tron.newdex.");
        }
        const urlArr = urlArr1[1].split("/");
        urlArr.shift(); // 删除域名结尾
        const urlStr = urlArr.join("/"); // 拼接成新路由
        if (urlArr.length > 0 && urlStr) {
          this.$router.push(`/${urlStr}`);
          return;
        }
        if (urlStr) {
          this.$router.push(`/${urlStr}`);
          return;
        }
      }
      // 处理矿池跳转
      if (url && url.indexOf("https://dapp.newpool.") !== -1) {
        this.handleToNewPos(url);
        return;
      }
      location.href = url;
    }
  },
  mounted() {
    this.handleSwiperStart();
  }
};
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 380px;
  overflow: hidden;
  position: relative;

  &.h5Height {
    height: 380px;
  }
  /deep/ .swiper-pagination-bullets {
    height: 60px;
    font-size: 50px;
    bottom: 10px;
  }

  /deep/ .swiper-pagination-bullet-active {
    background: #fff;
  }

  /deep/ .swiper-pagination-bullet {
    width: 0.06rem;
    height: 0.06rem;
    border-radius: 1rem;
  }

  .bannerActivityImg {
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;

    &.en {
      background-size: 100% 100%;
    }

    a {
      display: block;
      height: 100%;
      position: absolute;
      z-index: 100;
      width: 100%;
      top: 0rem;
    }
  }

  .bannerActivityImg2 {
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    position: relative;

    &.en {
      background-size: 100% 100%;
    }

    a {
      display: block;
      height: 100%;
      position: absolute;
      z-index: 100;
      width: 100%;
    }
  }
}
</style>