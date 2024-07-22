<template>
  <div class="container">
    <div class="head">
      <div class="info">
        <el-avatar :src="UserFilled" class="avatar"/>
        <div class="name">{{ user.nickName }}</div>
        <div class="edit">
          <Edit class="editIcon" @click="toEdit"/>
        </div>
        <div class="logout">
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
          <el-tab-pane label="笔记" name="note">
            <div>笔记</div>
          </el-tab-pane>
          <el-tab-pane label="评价" name="comment">
            <div>评价</div>
          </el-tab-pane>
          <el-tab-pane label="粉丝" name="fans">
            <div>粉丝</div>
          </el-tab-pane>
          <el-tab-pane label="关注" name="follow">
            <div>关注</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <foot/>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import request from "@/utils/request";
import {ElMessage} from "element-plus";
import {UserInfoStore} from "@/stores/UserInfo";
import {Edit, UserFilled} from "@element-plus/icons-vue";


const user = ref({});
const userInfoStore = UserInfoStore();

onMounted(() => {
  queryUser();
})

// 查询用户信息
function queryUser() {
  request.get('/user/me')
  .then(response => {
    if (response.data.success !== true) {
      ElMessage.error('获取用户信息失败');
      return;
    }
    user.value = response.data.data;
    userInfoStore.setUserInfo(response.data.data);
    ElMessage.success('欢迎回来!');
  })
}

// 编辑用户信息
function toEdit() {
  console.log('toEdit');
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;

  .head {
    display: flex;
    flex-direction: row;
    width: 100%;

    .info {
      display: flex;
      flex-direction: row;
      padding: 1rem;

      .avatar {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        margin-right: 1rem;
      }

      .name {
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 1rem;
      }

      .edit {
        display: flex;

        .editIcon {
          width: 1.5rem;
          height: 1.5rem;
          color: #ff9900;
          font-size: 1.5rem;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .table {
      display: flex;
      width: 100%;

      .tabs {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        margin: 1rem;
      }
    }
  }
}
</style>