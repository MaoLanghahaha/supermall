<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.logo" />
      <span class="shopInfoName">{{ shopInfo.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ shopInfo.sells | sellCountFilter }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shopInfo.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shopInfo.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ scorebetter: item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-better': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  components: {
  },
  filters: {
    sellCountFilter: function (value) {
      if (!value) return '';
      if (value > 10000) {
        return (value / 10000).toFixed(1) + 'w';
      } else if (value > 1000) {
        return (value / 1000).toFixed(1) / 1000 + 'k';
      }
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 10px;
}
.shop-top > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.shop-top > .shopInfoName {
  font-weight: bold;
  margin: 0 10px;
}
.shop-middle {
  margin: 5px 0;
  display: flex;
}
.shop-middle > .shop-middle-item {
  flex: 1;
}
.shop-middle > .shop-middle-left {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-right: 1px solid #ddd;
}
.shop-middle > .shop-middle-right {
  display: flex;
  justify-content: flex-end;
}
.shop-middle > .shop-middle-right td {
  padding: 3px 10px;
}
.shop-middle .info-sells,
.shop-middle .info-goods {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bolder;
}
.shop-middle .info-sells > .sells-count,
.shop-middle .info-goods > .goods-count {
  font-size: 16px;
}
.shop-middle .info-sells > .sells-text,
.shop-middle .info-goods > .goods-text {
  font-size: 12px;
}
.score > span,
.better > span {
  color: #fff;
  background: red;
  padding: 2px;
  font-size: 12px;
  border-radius: 4px;
}
.score,
.better {
  color: red;
}
.scorebetter,
.better-better {
  color: green;
}
.scorebetter > span,
.better-better > span {
  color: #fff;
  background: green;
}
.shop-bottom > .enter-shop {
  background: #f3f3f3;
  width: 50%;
  margin: 10px auto;
  text-align: center;
  padding: 5px;
  border-radius: 10px;
}
</style>
