<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :good-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodList',
  props: {
    goods: {
      type: Array,
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
    GoodsListItem
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
