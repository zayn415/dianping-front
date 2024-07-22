<template>
  <div class="voucher">
    <div class="left">
      <div class="title">{{ voucher.title }}</div>
      <div class="subTitle">{{ voucher.subTitle }}</div>
      <div class="rules">
        <div v-for="rule in rules" :key="rule.index" class="rule">{{ rule }}</div>
      </div>
      <div class="price">
        <span class="pay">¥{{ (voucher.payValue / 100).toFixed(2) }}</span>
        <span class="act">¥{{ (voucher.actualValue / 100).toFixed(2) }}</span>
      </div>
      <div v-if="voucher.type === 1" class="remain">
        <div class="time">{{ beginTime }} ~ {{ endTime }}</div>
      </div>
    </div>
    <div class="right">
      <div v-if="voucher.type === 0" class="normal">
        <button @click="buyNormal">购买</button>
      </div>
      <div v-else class="seckill-box">
        <button @click="buySeckill">立即抢购</button>
        <div>剩余 <span>{{ voucher.stock }}</span> 张</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import request from "@/utils/request";

const props = defineProps({
  voucher: {}
})

const rules = ref([]);
const beginTime = ref('');
const endTime = ref('');

onMounted(() => {
  rules.value = props.voucher.rules.split('\\n');
  beginTime.value = formatTime(props.voucher.beginTime);
  endTime.value = formatTime(props.voucher.endTime);
})

// 格式化时间
// 月-日 时:分:秒
function formatTime(time) {
  const t = new Date(time);
  const hour = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
  const minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
  const second = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
  return `${t.getMonth() + 1}-${t.getDate()} ${hour}:${minute}:${second}`;
}

// 判断秒杀是否开始
function isNotBegin() {
  return new Date().getTime() < new Date(props.voucher.beginTime).getTime();
}

// 判读是否结束
function isEnd() {
  return new Date().getTime() > new Date(props.voucher.endTime).getTime();
}

// 购买普通券
function buyNormal() {
  ElMessage.success('购买成功');
}

// 抢购秒杀券
function buySeckill() {
  if (isNotBegin()) {
    ElMessage.error('秒杀未开始');
    return;
  }
  if (isEnd()) {
    ElMessage.error('秒杀已结束');
    return;
  }
  // todo 购买逻辑
  request.post('/voucher-order/seckill/' + props.voucher.id)
  .then(response => {
    if (response.data.success !== true) {
      ElMessage.error(response.data.errorMsg ?? '购买失败');
      return;
    }
    ElMessage.success('购买成功');
  })
}
</script>

<style lang="scss" scoped>
.voucher {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 1rem;

  .left {
    display: flex;
    flex: 3;
    flex-direction: column;

    .title {
      font-size: 1.2rem;
      margin-bottom: 0.4rem;
    }

    .subTitle {
      font-size: 0.8rem;
      color: #999;
      margin-bottom: 0.4rem;
    }

    .rules {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .rule {
        margin: 0.1rem;
        background-color: rgba(255, 0, 0, 0.2);
        font-size: 0.8rem;
        color: #999;
        border-radius: 5px;
        padding: 0.1rem;
      }
    }

    .price {
      display: flex;

      .pay {
        font-size: 1.2rem;
        color: #f60;
      }

      .act {
        font-size: 1rem;
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  .right {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    .normal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      button {
        width: 5rem;
        height: 2rem;
        border: none;
        padding: 0.4rem 1rem;
        background-color: #f60;
        color: #fff;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
      }
    }

    .seckill-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      button {
        width: 5rem;
        height: 2rem;
        border: none;
        padding: 0.4rem 1rem;
        background-color: #f60;
        color: #fff;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
      }

      div {
        font-size: 0.8rem;
        color: #999;
        margin-top: 0.2rem;

        span {
          font-size: 1rem;
          color: #f60;
        }
      }
    }
  }
}
</style>