<template>
  <div class="tab-bar-item" @click="itemClick" :style="itemActiveStyle">
    <i :class="itemIcon"></i>
    <span :style="itemActiveStyle">{{ itemText }}</span>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    itemIcon: String,
    itemText: String,
    itemLink: String,
    itemActiveColor: {
      type: String,
      default: "var(--color-high-text)"
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.itemLink) !== -1; // this.$route:当前活跃路由
    },
    itemActiveStyle () {
      return this.isActive ? { color: this.itemActiveColor } : {};
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.itemLink);
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 49px;
  margin-bottom: 5px;
}
.tab-bar-item > i {
  font-size: 20px;
  font-weight: 600;
}

</style>

