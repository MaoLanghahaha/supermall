<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="['tab-control-item', { 'tab-control-item-active': index === curActiveItemIndex }]">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () { // 对象或数组时使用函数
        return []
      }
    }
  },
  data () {
    return {
      isActive: true,
      curActiveItemIndex: 0
    }
  },
  components: {
  },
  methods: {
    itemClick (index) {
      this.curActiveItemIndex = index;
      this.$emit("tabClick", index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.tab-control-item > span {
  padding: 5px;
  width: 50px;
}
.tab-control-item-active > span {
  color: var(--color-tint);
  border-bottom: 2px solid var(--color-tint);
}
</style>
