import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

const i18n = createI18n({
  locale: "pt", // set locale
  fallbackLocale: "pt", // set fallback locale
  allowComposition: true, // you need to specify that!
  messages: { en, pt }, // set locale messages
});

export default i18n;
