<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodItem.show.img" :alt="goodItem.title" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodItem.title }}</p>
      <span class="price">￥{{ goodItem.price }}</span
      >&nbsp;
      <span class="collect"
        ><i class="iconfont icon-shoucang"></i>{{ goodItem.cfav }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodItem: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  components: {
  },
  methods: {
    imageLoad () {
      // 事件总线
      this.$bus.$emit("itemImageLoad");
    },
    itemClick () {
      this.$router.push("/detail/"+this.goodItem.iid); // 动态路由params：http://localhost:8080/detail/1
      // this.$router.push({ // query：http://localhost:8080/detail?id=1
      //   path:'/detail',
      //   query:{
      //     id:1
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.goods-item {
  width: 45%;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goods-item > img {
  border-radius: 4px;
}
.goods-info {
  margin-top: 5px;
}
.goods-info > p {
  margin-bottom: unset;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-info .price {
  color: var(--color-high-text);
}
</style>
