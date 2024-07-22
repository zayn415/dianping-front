import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import foot from "@/pages/components/foot.vue";
import headBar from "@/pages/components/headBar.vue";
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-plugin-persistedstate";

const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist);
createApp(App)
.component('headBar', headBar)
.component('foot', foot)
.use(router)
.use(pinia)
.use(ElementPlus)
.mount('#app')


