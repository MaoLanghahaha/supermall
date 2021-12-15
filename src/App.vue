<template>
  <div id="app">
    <router-view/>
    <tab-bar>
      <tab-bar-item itemIcon="iconfont icon-shouye" itemText="首页" itemLink="/home" itemActiveColor="red"></tab-bar-item>
      <tab-bar-item itemIcon="iconfont icon-fenleiorguangchangorqita" itemText="分类" itemLink="/category" itemActiveColor="blue"></tab-bar-item>
      <tab-bar-item itemIcon="iconfont icon-gouwuche" itemText="购物车" itemLink="/shopcart" itemActiveColor="green"></tab-bar-item>
      <tab-bar-item itemIcon="iconfont icon-yonghu" itemText="我的" itemLink="/profile"></tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'App',
  components: {
    TabBar,
    TabBarItem
  },
  data () {
    return {

    }
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
