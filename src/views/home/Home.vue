<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll
      class="scroll-content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="contentLoadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不可直接监听点击,需加上修饰符.native 监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/common/backtop/BackTop.vue'
import { getHomeMultidata, getHomeGoods } from 'network/home'

import HomeSwiper from './childComponent/HomeSwiper.vue'
import HomeRecommend from './childComponent/HomeRecommend.vue'
import HomeFeature from './childComponent/HomeFeature.vue'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      curGoodsType: 'pop',
      isShowBackTop: false
    }
  },
  created () { // 一般在create只写主要逻辑（代码组织方式）
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted () {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    })
  },
  computed: {
    showGoods () { // 长的复杂的数据应该搞成计算属性
      return this.goods[this.curGoodsType].list;
    }
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.curGoodsType = 'pop'
          break;
        case 1:
          this.curGoodsType = 'new'
          break;
        case 2:
          this.curGoodsType = 'sell'
          break;
        default:
          break;
      }
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 1000); // (x, y, time/ms)
    },
    contentScroll (position) {
      -(position.y) > 1000 ? this.isShowBackTop = true : this.isShowBackTop = false;
    },
    contentLoadMore () {
      this.getHomeGoods(this.curGoodsType);
      console.log("上拉加载更多");
    },
    debounce (fn, delay) {
      let timer = null;
      return function (...args) { // 可变参数 (param1,param2,param3.....) == (...args)
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }

    },
    /**
     * 网络请求相关
     */
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
        this.$refs.scroll.finishPullUp();
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
.scroll-content {
  height: calc(100vh - 95px);
  overflow: hidden;
}
</style>
