<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tabControlFixed"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControlFixed"
    />
    <scroll
      class="scroll-content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="contentLoadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不可直接监听点击,需加上修饰符.native 监听组件根元素的原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common/backtop/BackTop'
import { getHomeMultidata, getHomeGoods } from 'network/home'

import HomeSwiper from './childComponent/HomeSwiper'
import HomeRecommend from './childComponent/HomeRecommend'
import HomeFeature from './childComponent/HomeFeature'

import { debounce } from 'common/utils.js'

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
      isShowBackTop: false,
      tabControlOffset: 0,
      isTabControlFixed: false,
      saveY: 0,
    }
  },
  created () { // 一般在create只写主要逻辑（代码组织方式）
    console.log("create");
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    this.getHomeGoods('pop');
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    })
    // this.tabControlOffset = this.$refs.tabControl.$el.offsetTop; // 暂时
    // console.log(this.$refs.tabControl.$el.offsetTop); // 由于图片懒加载可能获取不准确，解决：监听图片加载完成，提交事件。
  },
  destroyed () {
    console.log("destroyed");
  },
  activated () {
    this.$refs.scroll.refresh(); // 先刷新scrollHeight
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY();
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
      // 同步两个tabcontrol的点击
      this.$refs.tabControl1.curActiveItemIndex = index;
      this.$refs.tabControl2.curActiveItemIndex = index;
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 1000); // (x, y, time/ms)
    },
    swiperImageLoad () {
      this.tabControlOffset = this.$refs.tabControl2.$el.offsetTop;
    },
    contentScroll (position) {
      this.isShowBackTop = -(position.y) > 1000;
      this.isTabControlFixed = -(position.y) + 44 > this.tabControlOffset;
    },
    contentLoadMore () {
      this.getHomeGoods(this.curGoodsType);
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
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  /** 原生滚动时使用，使用better-scroll后可以去掉 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; */
}
.scroll-content {
  height: calc(100vh - 95px);
  overflow: hidden;
}
.tab-control {
  width: 100%;
}
.tabControlFixed {
  position: fixed;
  top: 44px;
  z-index: 1;
}
</style>
