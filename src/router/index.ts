import {createRouter, createWebHistory} from 'vue-router';
import Index from "../pages/index.vue";
import Login from "../pages/login.vue";
import Me from "@/pages/me.vue";
import message from "@/pages/message.vue";
import map from "@/pages/map.vue";
import publish from "@/pages/publish.vue";
import ShopList from "@/pages/shopList.vue";
import shop from "@/pages/shop.vue";

const routes = [
	{
		path: '/',
		component: Index
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/me',
		component: Me
	},
	{
		path: '/message',
		component: message
	},
	{
		path: '/map',
		component: map
	},
	{
		path: '/publish',
		component: publish
	},
	{
		path: '/shopList',
		component: ShopList
	},
	{
		path: '/shop',
		component: shop
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes
});

export default router;
