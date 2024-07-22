<template>
  <div class="login-container">
    <div class="head">
      <div class="back">
        <ArrowLeft class="back-arrow" @click="goBack"/>
      </div>
      <div class="title">
        <span>验证码登录</span>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <input v-model="form.phone" class="phone" placeholder="请输入手机号"/>
        <div class="code">
          <input v-model="form.code" class="code" placeholder="请输入验证码"/>
          <button class="button" @click="sendCode">获取验证码</button>
        </div>
        <button class="button" @click="login">登录</button>
      </div>
      <div class="radio">
        <div>
          <input v-model="read" name="read" type="checkbox">
          <label for="read"></label>
        </div>
        <div>我已阅读并同意
          <a href="javascript:void(0)">
            《小众点评用户服务协议》</a>、
          <a href="javascript:void(0)">《隐私政策》</a>
             等，接受免除或者限制责任、诉讼管辖约定等粗体标示条款
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import request from "@/utils/request";
import {UseTokenStore} from "@/stores/token";
import {ArrowLeft} from "@element-plus/icons-vue";

const route = useRouter();
const useTokenStore = UseTokenStore();

// 返回上一页
function goBack() {
  route.back();
}

// 登录
function login() {
  if (form.value.phone.length !== 11) {
    ElMessage.error('请输入正确的手机号');
    return;
  }
  if (read.value === false) {
    ElMessage.error('请先同意用户协议');
    return;
  }
  if (form.value.code.length !== 6) {
    ElMessage.error('请输入正确的验证码');
    return;
  }
  request.post('/user/login',
    {
      phone: form.value.phone,
      code: form.value.code
    }
  )
  .then(response => {
    if (response.data.success !== true) {
      ElMessage.error('登录失败');
      location.reload();
    } else {
      // 登录成功
      ElMessage.success('登录成功');
      useTokenStore.setToken(response.data.data.token);
      // 跳转到首页
      route.push('/');
    }
  })
}

// 发送验证码
function sendCode() {
  if (form.value.phone.length !== 11) {
    ElMessage.error('请输入正确的手机号');
    return;
  }
  if (read.value === false) {
    ElMessage.error('请先同意用户协议');
    return;
  }
  request.post('user/code?phone=' + form.value.phone.toString())
  .then(response => {
    // data是后端Result对象
    if (response.data.success !== true) {
      ElMessage.error('验证码发送失败');
    }
  })
}

const form = ref({
  phone: '',
  code: ''
});

const read = ref(false);
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  z-index: 0;

  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: #fff;
    position: relative;
    border-bottom: 2px solid #ff9900;

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

  .content {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3;

    .form {
      display: flex;
      flex: 3;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 1rem;

      .phone {
        margin-bottom: 0.5rem;
        height: 2rem;
        width: 94%;
        border: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 5px;
      }

      .code {
        display: flex;
        flex-direction: row;
        width: 94%;
        height: 2rem;
        margin-bottom: 0.5rem;
        padding: 0;

        .code {
          display: flex;
          flex: 3;
          border: 1px solid rgba(128, 128, 128, 0.5);
          border-radius: 5px;
          margin-right: 0.3rem;
        }

        .button {
          display: flex;
          flex: 1;
          height: 2rem;
          justify-content: center;
          text-align: center;
          align-content: center;
          background-color: #ff9900;
          border: 1px solid #ff9900;
          border-radius: 5px;
        }
      }

      .button {
        width: 94%;
        color: #000;
        height: 2rem;
        border: none;
        background-color: #ff9900;
        border-radius: 5px;
      }
    }

    .radio {
      display: flex;
      flex: 1;
    }
  }
}
</style>