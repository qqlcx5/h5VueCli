<template>
  <div class="countDown">
    {{ count }}
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  data() {
    return {
      count: '',
      countDown: null
    }
  },
  props: {
    timer: Number,
    snapshot: Number
  },
  watch: {
    'timer': {
      handler() {
        this.count = this.timer;
        this.initData()
      },
      immediate: true
    },
    'snapshot': {
      handler(newVal) {
        if (newVal > 9) {
          this.shotjudge();
        } else {
          console.log(1);
        }
      },
      immediate: false
    }
  },
  mounted() {},
  methods: {
    initData() {
      clearInterval(this.countDown);
      this.countDown = null;
      this.countDown = setInterval(() => {
        if (this.count > 0) {
          this.count --
        } else {
          clearInterval(this.countDown);
          this.$emit('listenCountDown', true)
          this.countDown = null;
        }
      }, 1000);
    },
    shotjudge() {
      if (this.snapshot <= 9) {
        clearInterval(this.countDown);
        this.countDown = null;
      } else {
        this.count = 60;
        this.initData();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.countDown {
  display: inline-block;
}
</style>