<template>
  <div v-if="Object.keys(goodInfo).length !== 0" class="base-info">
    <div class="info-title">{{ goodInfo.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goodInfo.newPrice }}</span>
      <span class="o-price">&nbsp;&nbsp;<del>{{ goodInfo.oldPrice }}</del>&nbsp;&nbsp;</span>
      <span v-if="goodInfo.discount" class="discount">{{
        goodInfo.discount
      }}</span>
    </div>
    <div class="info-other">
      <span>{{ goodInfo.columns[0] }}</span>
      <span>{{ goodInfo.columns[1] }}</span>
      <span>{{ goodInfo.services[goodInfo.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span v-for="item in goodInfo.services" :key="item.name">
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goodInfo: {
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
  }
}
</script>

<style scoped>
.base-info {
  padding: 10px;
}
.base-info > div {
  margin: 5px 0;
}
.info-title {
  font-weight: bold;
  font-size: 15px;
}
.info-price > .n-price {
  color: var(--color-high-text);
  font-size: 18px;
  font-weight: 500;
}
.info-price > .o-price {
  font-size: 12px;
}
.discount {
  background: var(--color-tint);
  padding: 0 10px;
  border-radius: 10px;
  color: #fff;
}
.info-other {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
.info-service {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  color: #333;
  font-weight: 500;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  margin-top: 15px;
  padding: 10px 0;
}
.info-service  img {
  width: 15px;
  margin: 5px;
}
</style>
