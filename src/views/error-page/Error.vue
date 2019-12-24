<template>
  <div class="errorCode">
    <div v-clipboard:copy="JSON.stringify(errCodeData)" class="color-this"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">点击复制</div>
    <div v-for="(val, key) in errCodeData" :key="key">
      <span>{{ key }}</span>: '<span>{{ val }}</span>',
    </div>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      errCodeData: '',
    }
  },
  mounted() {
    this.handleGetErrorCode();
  },
  methods: {
    handleGetErrorCode() {
      this.$http.get('/common/getErrorCode').then((res) => {
        const newJson = {};
        const data = res.data;
        const ksys = Object.keys(data);
        ksys.forEach((i) => {
          newJson[`error${data[i].code}`] = data[i].desc;
        })
        this.errCodeData = newJson;
      })
    },
    onCopy() {
      this.$message.success(this.$t('myWallet.copySuccess'));
    },
    onError() {
      this.$message.error(this.$t('myWallet.copyError'));
    },
  }
}
</script>

<style lang="scss" scoped>
.color-this{
  color: rgba(74, 144, 226, 1);
}
.errorCode{
  font-size: 25px;
}
</style>
