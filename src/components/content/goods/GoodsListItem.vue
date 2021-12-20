<template>
  <div class="goods-item">
    <img :src="goodItem.show.img" :alt="goodItem.title" />
    <div>
      <p>{{ goodItem.title }}</p>
      <span class="price">{{ goodItem.price }}</span
      >&nbsp;
      <span class="collect">{{ goodItem.cfav }}</span>
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
  }
}
</script>

<style scoped>
.goods-item {
  width: 45%;
  border: 1px solid #ddd;
  margin: 5px 0;
}
</style>
