<template>
  <span class="spanOut">
    <span class="bgSpan" :class="{'open': type}"></span>
    <span class="scop" :class="{'openScop': type}"></span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      // type: false,
    }
  },
  props: [
    'type'
  ],
  methods: {
  }
}
</script>

<style scoped lang="scss">
// @import "../assets/css/public.scss";

.spanOut{
  display: inline-block;
  background: $color-green;
  width: 70px;
  border-radius: 20px;
  height: 35px;
  position: relative;
  transition: 300ms all;
  display: flex;
  align-items: center;

  .bgSpan{
    position: absolute;
    border-radius: 20px;
    background: $color-999;
    left: 0%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    transition: 300ms all;

    &.open{
      left: 50%;
      top: 50%;
      right: 50%;
      bottom: 50%;
    }
  }

  .scop{
    left: 0.01rem;
    background: #FFF;
    position: absolute;
    height: 33px;
    width: 33px;
    border-radius: 1rem;
    transition: 300ms all;

    &.openScop{
      left: calc(100% - 33px - 0.01rem);
    }
  }
}

</style>
