<template>
  <div class="footer">
    <div class="title" @click="toPage(1)">首页</div>
    <div class="title" @click="toPage(2)">地图</div>
    <div class="title" @click="toPage(3)">发布</div>
    <div class="title" @click="toPage(4)">消息</div>
    <div class="title" @click="toPage(5)">我的</div>
  </div>
</template>

<script lang="ts" setup>

import {useRouter} from "vue-router";

const route = useRouter();

// 跳转到指定页面
function toPage(index: number) {
  if (index === 1) route.push('/');
  if (index === 2) route.push('/map');
  if (index === 3) route.push('/publish');
  if (index === 4) route.push('/message');
  if (index === 5) route.push('/me');
}

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 3rem;
  background-color: #ff9900;
  bottom: 0;

  .title {
    color: #fff;
    font-size: 1rem;
  }
}
</style>