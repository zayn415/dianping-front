import {defineStore} from "pinia";
import {ref} from 'vue';

export const UserInfoStore = defineStore('UserInfo', () => {
		// 用户信息
		const userInfo = ref({})
		
		// 修改用户信息
		const setUserInfo = (newUserInfo) => {
			userInfo.value = newUserInfo
		}
		
		// 移除用户信息
		const removeUserInfo = () => {
			userInfo.value = {}
		}
		
		// 返回导出的内容
		return {
			userInfo, setUserInfo, removeUserInfo
		}
	},
	{
		persist: true
	})