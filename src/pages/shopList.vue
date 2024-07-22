<template>
  <div class="container">
    <headBar :title="typeName"/>
    <div class="list">
      <div v-if="shops===null" class="load">
        <Loading class="loading"/>
        <span>loading</span>
      </div>
      <div v-for="s in shops" v-else :key="s.id" class="box" @click="toDetail(s.id)">
        <div class="img"><img :src="s.images.split(',')[0]" alt=""></div>
        <div class="info">
          <div class="title">
            <span>{{ s.name }}</span>
          </div>
          <div class="line">
            <div class="rate">{{ s.score / 10 }}分</div>
            <div class="sold">月售&Tab;{{ s.sold }}</div>
            <div class="cost">人均&Tab;￥{{ s.avgPrice }}/人</div>
          </div>
          <div class="line">
            <div class="comments">{{ s.comments }}&Tab;条评论</div>
          </div>
          <div class="line">
            <div class="area">{{ s.area }}</div>
            <!--todo 距离计算-->
            <div class="distance">距离</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import request from "@/utils/request";
import {useRoute, useRouter} from "vue-router";
import {Loading} from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const typeName = ref('');
const params = ref({
  typeId: 0,
  current: 1,
  sortBy: "",
  x: 120.149993, // 经度
  y: 30.334229 // 纬度
});
const shops = ref([]);

onMounted(() => {
  params.value.typeId = route.query.id;
  typeName.value = route.query.name.toString();
  queryShopList();
})

// 获取商户列表
function queryShopList() {
  request.get('/shop/of/type', {params: params.value})
  .then(response => {
    shops.value = response.data.data;
  })
}

// 跳转到商户详情
function toDetail(id: number) {
  router.push({
    path: '/shop',
    query: {id}
  });
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;

  .list {
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    margin-top: 3rem;

    .load {
      margin-top: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ff9900;
      font-size: 1.2rem;

      .loading {
        height: 4rem;
        width: 4rem;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }

    .box {
      display: flex;
      background-color: #fff;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 0 5px #ccc;
      height: 9rem;

      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 9rem;
        width: 9rem;
        min-width: 9rem;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 0.5rem 0 0 0.5rem;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        width: calc(100% - 9rem);

        .title {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          font-weight: bold;
          width: 95%;

          span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
        }

        .line {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-weight: lighter;
          font-size: 0.8rem;

          > *:not(:last-child) {
            margin-right: 1rem;
          }

          .rate {
            color: #f63;
            font-weight: bolder;
          }

          .area,
          .cost,
          .address,
          .comments {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>