<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  line-height: 44px;
  text-align: center;
  box-shadow: 0px -1px 5px 2px #ddd;
}
.nav-bar > .left,
.nav-bar > .right {
  width: 60px;
}
.nav-bar > .center {
  flex: 1;
}
</style>
