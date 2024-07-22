<template>
  <div class="container">
    <div class="search-bar">
      <div class="city">
        <span class="name">深圳</span>
        <arrow-down class="arrow"/>
      </div>
      <div class="search-input">
        <input class="input" placeholder="请输入商户名、地点"/>
      </div>
      <div class="header-icon">
        <User class="icon" @click="toMe"/>
      </div>
    </div>
    <div class="type-list">
      <div v-for="t in types" :key="t.id" class="type-box" @click="toShopList(t.id, t.name)">
        <div class="type-view"><img :src="'src/assets' + t.icon" alt=""></div>
        <div class="type-text">{{ t.name }}</div>
      </div>
    </div>
    <div class="blog-list" @scroll="onScroll">
      <div v-for="b in blogs" :key="b.id" class="blog-box">
        <div class="blog-img" @click="toBlogDetail(b)"><img :src="b.img" alt=""></div>
        <div class="blog-title">{{ b.title }}</div>
        <div class="blog-foot">
          <div class="blog-user-icon"><img :src="b.icon || '/imgs/icons/default-icon.png'" alt=""></div>
          <div class="blog-user-name">{{ b.name }}</div>
          <div class="blog-liked" @click="addLike(b)">
            <svg class="icon"
              height="14"
              p-id="2187"
              t="1646634642977"
              version="1.1"
              viewBox="0 0 1024 1024"
              width="14"
              xmlns="http://www.w3.org/2000/svg">
              <path :fill="b.isLike ? '#ff6633' : '#82848a'"
                d="M160 944c0 8.8-7.2 16-16 16h-32c-26.5 0-48-21.5-48-48V528c0-26.5 21.5-48 48-48h32c8.8 0 16 7.2 16 16v448zM96 416c-53 0-96 43-96 96v416c0 53 43 96 96 96h96c17.7 0 32-14.3 32-32V448c0-17.7-14.3-32-32-32H96zM505.6 64c16.2 0 26.4 8.7 31 13.9 4.6 5.2 12.1 16.3 10.3 32.4l-23.5 203.4c-4.9 42.2 8.6 84.6 36.8 116.4 28.3 31.7 68.9 49.9 111.4 49.9h271.2c6.6 0 10.8 3.3 13.2 6.1s5 7.5 4 14l-48 303.4c-6.9 43.6-29.1 83.4-62.7 112C815.8 944.2 773 960 728.9 960h-317c-33.1 0-59.9-26.8-59.9-59.9v-455c0-6.1 1.7-12 5-17.1 69.5-109 106.4-234.2 107-364h41.6z m0-64h-44.9C427.2 0 400 27.2 400 60.7c0 127.1-39.1 251.2-112 355.3v484.1c0 68.4 55.5 123.9 123.9 123.9h317c122.7 0 227.2-89.3 246.3-210.5l47.9-303.4c7.8-49.4-30.4-94.1-80.4-94.1H671.6c-50.9 0-90.5-44.4-84.6-95l23.5-203.4C617.7 55 568.7 0 505.6 0z"
                p-id="2188"></path>
            </svg>
            {{ b.liked }}
          </div>
        </div>
      </div>
    </div>
    <foot/>
  </div>
</template>

<script lang="ts" setup>
import {ArrowDown, User} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import request from "@/utils/request";

onMounted(() => {
  queryTypes();
  queryHotBlogsScroll();
});

const router = useRouter();

// 跳转到我的页面
function toMe() {
  console.log('toMe');
  router.push('/me');
}

const types = ref([]);

// 获取商户类型列表
function queryTypes() {
  request.get('shop-type/list')
  .then(response => {
    types.value = response.data.data;
    ElMessage.success("欢迎回来!")
  })
  .catch(error => {
    console.log(error);
    ElMessage.error(error ?? '请求失败');
  });
}

// 获取热门博客列表
function queryHotBlogsScroll() {

}

function onScroll() {
  console.log('onScroll');
}

// 跳转到同类商户列表
function toShopList(id, name) {
  router.push({
    path: '/shopList',
    query: {
      id,
      name
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .search-bar {
    top: 0;
    display: flex;
    position: fixed;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    background-color: #ff9900;
    border-bottom: 1px solid #f3f3f3;

    .city {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;

      .name {
        color: #fff;
        font-size: 1rem;
        margin-right: 0.2rem;
      }

      .arrow {
        height: 1rem;
        width: 1rem;
        margin-left: 0.2rem;
        color: #fff;
      }
    }

    .search-input {
      flex: 4;

      .input {
        width: 100%;
        height: 2rem;
        border: 1px solid #bc7101;
        border-radius: 1rem;
      }
    }

    .header-icon {
      display: flex;
      justify-content: center;
      flex: 1;

      .icon {
        height: 1.5rem;
        width: 1.5rem;
        color: #fff;
      }
    }
  }

  .type-list {
    margin-top: 3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    .type-box {
      display: flex;
      width: 20%;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .type-view {
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 3rem;
          width: 3rem;
        }
      }

      .type-text {
        font-size: 0.8rem;
      }
    }
  }
}
</style>