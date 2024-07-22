<template>
  <div class="shop">
    <head-bar title="小众点评商户详情"/>
    <div class="content">
      <div class="info">
        <div class="name">{{ shop.name }}</div>
        <div class="score">{{ shop.score / 10 }}分</div>
        <div class="openHours">营业时间{{ shop.openHours }}</div>
        <div class="sales">
          <div class="sold">月售{{ shop.sold }}</div>
          <div class="cost">人均￥{{ shop.avgPrice }}/人</div>
        </div>
        <div class="address">
          <MapLocation class="locationIcon"/>
          <div>{{ shop.address }}</div>
        </div>
      </div>
      <div class="vouchers">
        <div class="title">代金券</div>
        <div class="voucher-list">
          <Voucher v-for="voucher in vouchers"
            :key="voucher.id"
            :voucher="voucher"/>
        </div>
      </div>
      <div class="shop-img">
        <div class="desc">商户风采</div>
        <el-image v-for="img in imgs"
          :key="img"
          :src="img"
          alt=""
          class="imgs"
          loading="lazy"/>
      </div>
      <div class="shop-comment">
        <div class="title">用户评价({{ shop.comments }})</div>
        <div class="comment-list"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import HeadBar from "@/pages/components/headBar.vue";
import request from "@/utils/request";
import {MapLocation} from "@element-plus/icons-vue";
import Voucher from "@/pages/components/voucher.vue";

const route = useRoute();
const router = useRouter();
const shopId = ref();
const imgs = ref([]);
const shop = ref({})
const vouchers = ref([]);
onMounted(() => {
  shopId.value = route.query.id;
  queryShopDetail();
  queryVoucher();
})

// 获取商户详情
function queryShopDetail() {
  request.get('/shop/' + shopId.value)
  .then(response => {
    shop.value = response.data.data;
    imgs.value = shop.value.images.split(',');
  })
  .catch(error => {
    console.log(error);
  });
}

// 获取优惠券信息
function queryVoucher() {
  request.get('/voucher/list/' + shopId.value)
  .then(response => {
    console.log(response);
    vouchers.value = response.data.data;
  })
  .catch(error => {
    console.log(error);
  });
}
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
  flex-direction: column;
  //height: 100vh;
  width: 100vw;
  background-color: #f3f3f3;

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    flex: 1;

    .info {
      margin-bottom: 0.5rem;
      color: #333;
      padding: 1rem;
      background-color: #fff;

      .name {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .score {
        font-size: 1.2rem;
        color: #f60;
      }

      .sales {
        display: flex;
        align-items: center;
      }

      .address {
        display: flex;
        flex-direction: row;
        margin-top: 0.6rem;

        .locationIcon {
          margin-right: 0.4rem;
          width: 1.3rem;
          height: 1.3rem;
          color: #f60;
        }
      }
    }

    .vouchers {
      display: flex;
      padding: 1rem;
      margin-bottom: 0.5rem;
      flex-direction: column;
      background-color: #fff;

      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .voucher-list {
        display: flex;
        flex-direction: column;
        margin-top: 0.5rem;

        .voucher {
          margin-bottom: 0.5rem;
        }
      }
    }

    .shop-img {
      background-color: #fff;
      margin-bottom: 0.5rem;
      padding: 1rem;

      .desc {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .imgs {
        margin-top: 0.3rem;
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }

    .shop-comment {
      background-color: #fff;
      padding: 1rem;

      .title {
        font-size: 1.2rem;
        font-weight: bold;
      }

      .comment-list {

      }
    }
  }
}
</style>