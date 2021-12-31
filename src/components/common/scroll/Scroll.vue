<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default () {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  components: {
  },
  created () { // 组件创建完后调用，不可在created函数中拿DOM元素

  },
  mounted () { // 组件挂载完毕
    this.$nextTick(() => { // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      // probeType:实时监测选项 （默认值0）.0、1：不侦测实时位置。2：手指滚动的时候侦测，手指离开立即停止侦测（即便有惯性滚动）。3：只要内容在滚动，都侦测
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType, // 实时侦测
        pullUpLoad: this.pullUpLoad, // 上拉加载更多
        click: true // 设置被scroll包裹的元素可点击
      });
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => { // 监听滚动
          this.$emit('scroll', position);
        });
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => { // 在一次上拉加载的动作后,这个时机一般用来去后端请求数据
          this.$emit('pullingUp');
          // setTimeout(() => {
          //   this.scroll.finishPullUp(); //当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载，这样才能进行下一次pullingUp监听回调
          // }, 2000)
          // betterscroll在决定有多少区域可以滚动时，是根据scrollHeight属性决定的，而此属性是根据放在content中的子组件的高度决定的，但由于图片的异步加载，初始化计算scrollHeight时没有将图片的高度计算进来，在图片加载完成后，也没有将高度计算进来
          // 所以出现滚动不全的BUG，解决：监听每一张图片加载完成，每次执行scroll.refresh()。
        });
      }
    })

  },
  methods: {
    // 封装的思维，对scroll的scrollTo进行封装，home.vue中this.$refs.scroll.scrollTo(0, 0, 1000); 面向Scroll组件开发
    scrollTo (x, y, time = 1000) { // 设置默认值
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp(); // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载，这样才能进行下一次pullingUp监听回调
    },
    refresh () {
      this.scroll && this.scroll.refresh(); // 刷新scrollHeight
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>
</style>
