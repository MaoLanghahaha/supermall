<template>
  <div class="back-top">
    <img src="~assets/img/backtotop.svg" alt="回到顶部" />
  </div>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
.back-top {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background-color: #fff;
  position: fixed;
  bottom: 70px;
  right: 13px;
  box-shadow: 0 0 5px 1px #00000047;
}
.back-top > img {
  width: 43px;
}
</style>
