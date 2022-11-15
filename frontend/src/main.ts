import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import "./assets/base.css";
import { CIcon } from "@coreui/icons-vue";
import { registerCoreUIIcons } from "./config/coreUIIcons";
import titleMixin from "./mixins/titleMixin";
import i18n from "./i18n/i18n";
import DKToast from "vue-dk-toast";
const app = createApp(App);
app.mixin(titleMixin);
app.use(router);
app.use(DKToast, {
  duration: 2000,
  pauseOnHover: true,
  positionY: "bottom",
  positionX: "right",
  disableClick: false,
  class: "custom-class",
  max: 10,
});
app.use(store, key);
app.use(i18n);
app.component("CIcon", CIcon);
registerCoreUIIcons(app);
app.mount("#app");
