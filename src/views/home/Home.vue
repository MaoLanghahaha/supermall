<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <el-carousel height="215px">
      <el-carousel-item v-for="item in result" :key="item.title">
        <img :src="item.image" alt="" style="width:100%;">
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata } from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data () {
    return {
      result: []
    }
  },
  created () {
    getHomeMultidata().then(res => {
      this.result = res.data.banner.list; //
      console.log(res);
    }).catch(err => { console.log(err); })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
}
</style>
