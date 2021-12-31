<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
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
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0 20px;
  border-bottom: 4px solid #ddd;
}
.recommend-item > a {
  color: var(--color-text);
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.recommend-item > a > img {
  width: 90%;
}
</style>
