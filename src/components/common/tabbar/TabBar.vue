<template>
  <div id="tab-bar">
   <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px 1px 5px 2px #ddd;
}
</style>
