<template>
  <a-carousel autoplay>
    <div v-for="item in banners" :key="item.title">
      <img :src="item.image" :alt="item.title" @load.once="swiperImageLoad" />
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoadSwiperImage: false
    }
  },
  methods: {
    swiperImageLoad () {
      !this.isLoadSwiperImage? (this.$emit("swiperImageLoad"),this.isLoadSwiperImage = true): '';
    }
  }
}
</script>

<style scoped>
/* For demo */
.ant-carousel .slick-slide img {
  width: 100%;
}
</style>
