<template>
  <a-carousel autoplay>
    <div v-for="item in banners" :key="item.title">
      <img :src="item.image" :alt="item.title" />
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 200px;
  line-height: 200px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
