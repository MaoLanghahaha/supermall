<template>
  <a-carousel autoplay>
    <div v-for="item in topImages" :key="item" class="topImageItem">
      <img :src="item" :alt="item" />
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
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
.topImageItem {
  height: 250px;
  overflow: hidden;
  background: rgba(102, 51, 153, 0.781);
}
.ant-carousel .slick-slide img {
  width: 100%;
}
</style>
