<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend :recommends="recommends" />
    <home-feature />
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" />
    <goods-list :goods="goods['pop'].list"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import { getHomeMultidata, getHomeGoods } from 'network/home'

import HomeSwiper from './childComponent/HomeSwiper.vue'
import HomeRecommend from './childComponent/HomeRecommend.vue'
import HomeFeature from './childComponent/HomeFeature.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      }
    }
  },
  created () { // 一般在create只写主要逻辑（代码组织方式）
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    getHomeMultidata () { // 多一层封装
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      }).catch(err => { console.log(err); })
    },
    getHomeGoods (type) { // 多一层封装，复用性
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); // ...将数组的每一项解析出来 push(10,20,30,40)
        this.goods[type].page = page;
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>
