import axios from 'axios';
import {ElMessage} from 'element-plus';
import {UseTokenStore} from '@/stores/token';
import router from "@/router/index";

const baseURL = '/api'; // 跨域代理前缀
const instance = axios.create({baseURL})


//添加响应拦截器
instance.interceptors.response.use(
	// 成功的回调函数
	result => {
		// 判断业务状态
		if (result.status === 200) {
			return result; // 直接返回整个响应结果
		}
		// 操作失败
		ElMessage.error(result.data.errorMsg ? result.data.errorMsg : '操作失败');
		return Promise.reject(result.data);
	},
	// 失败的回调函数
	err => {
		if (err.response.status === 401) {
			ElMessage.error('请先登录');
			router.push('/login');
		} else {
			ElMessage.error('操作失败');
		}
		return Promise.reject(err);//异步的状态转化成失败的状态
	}
)

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		const token = UseTokenStore().token;
		if (token) {
			config.headers['Authorization'] = token;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
)
export default instance;