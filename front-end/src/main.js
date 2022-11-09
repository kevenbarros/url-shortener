import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/base.css';
import store from './store'
import { CIcon } from "@coreui/icons-vue";
import { registerCoreUIIcons } from "./config/coreUIIcons";
import Toaster from '@meforma/vue-toaster';

const app = createApp(App).use(store)
app.use(router)
app.use(Toaster);
app.component("CIcon", CIcon);
registerCoreUIIcons(app);
app.mount('#app')
