<template>
  <div class="head">
    <div class="back">
      <ArrowLeft class="back-arrow" @click="goBack"/>
    </div>
    <div class="title">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ArrowLeft} from "@element-plus/icons-vue";

import {useRouter} from "vue-router";

const route = useRouter();

defineProps({
  title: String
})

// 返回上一页
function goBack() {
  route.back();
}
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  align-items: center;
  height: 3rem;
  background-color: #fff;
  border-bottom: 2px solid #ff9900;
  width: 100vw;
  z-index: 99;

  .back {
    z-index: 2;
    left: 1rem;
    position: absolute;

    .back-arrow {
      height: 1.5rem;
      width: 1.5rem;
      color: #000;
    }
  }

  .title {
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: relative;
  }
}
</style>