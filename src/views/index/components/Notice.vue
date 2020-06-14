<template>
  <div class="noticeDiv">
      <div class="notice">
        <!-- <img class="noticeImg" src="@/assets/img/activity/jubilee/notice.png" alt=""> -->
         <svg-icon icon="icon-gonggao" :size="30" />
        <div class="noticeText" id="notice">
            <div class="notices" v-for="(item, index) in noticeList" :key="index">
              <div class="noti-item">
                此为显示“链飞公告”左为示例啦啦啦啦啦啦啦啦
              </div>
            </div>
          <div class="notices" v-for="(item, index) in noticeList" :key="index + '100'">
            <div class="noti-item">
              此为显示“链飞公告”左为示例啦啦啦啦啦啦啦啦
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      noticeList: [1, 2, 3, 4]
    }
  },
  methods:{
        // 获取最近100条中奖纪录
    handleGetLastDrawList() {
      this.$http.post('/christmas/getLastDrawList').then((res) => {
        if (res.code === 1028) {
          // Toast({
          //   message: this.$t('anniversary.plstoEos'),
          //   position: 'center',
          //   duration: 2000,
          // });
          return
        }
        if (res.code === 0) {
          this.noticeList = res.lastDrawLogList
          this.isStart = res.isStart
        }
      })
    },
    // 公告滚动事件
    handleScroll() {
      const mainTop = document.getElementById('notice');
      if (!mainTop) {
        return;
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.timerout) {
        clearTimeout(this.timerout);
      }
      this.timerout = setTimeout(() => {
        this.timer = setInterval(() => {
          mainTop.scrollTop += 1;
          // 错误处理
          if (!mainTop.getElementsByClassName('notices')[0]) {
            return;
          }
          const height = mainTop.getElementsByClassName('notices')[0].scrollHeight;
          if (mainTop.scrollTop > height) {
            mainTop.appendChild(mainTop.getElementsByClassName('notices')[0]);
            mainTop.scrollTop -= height;
            this.handleScroll();
          }
        }, 25);
      }, 2000);
    },
    // 更多公告
    handleNoticeToMore() {
      const lang = this.$store.state.app.language;
      // 波场项目跳转地址
      if (this.$appName === 'tronNewdex') {
        if (lang !== 'en') {
          window.location.href = `https://newdex.zendesk.com/hc/${lang.toLowerCase()}/categories/360002004831`;
          return;
        }
        window.location.href = 'https://newdex.zendesk.com/hc/en-us/categories/360002004831';
        return;
      }
      // EOS项目跳转地址
      if (lang !== 'en') {
        window.location.href = `https://newdex.zendesk.com/hc/${lang.toLowerCase()}/categories/360000802432`;
        return;
      }
      window.location.href = 'https://newdex.zendesk.com/hc/en-us/categories/360000802432';
    },
  },
  mounted(){
    this.handleScroll()
  }
}
</script>
<style lang="scss" scoped>
  .noticeDiv{
    height: 90px;
    display: flex;
    align-items: center;
    padding: 0 30px;

    .notice{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
      .noticeText{
        margin-left: 26px;
        font-size: 24px;
        max-width: 100%;
        height: 60px;
        overflow: hidden;
        .noti-item{
          height: 60px;
          display: flex;
          align-items: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
