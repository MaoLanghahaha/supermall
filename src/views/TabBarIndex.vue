<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from '../components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'TabBarIndex',
  data () {
    return {

    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style scoped>
</style>
