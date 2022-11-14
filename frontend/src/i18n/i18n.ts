import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

const i18n = createI18n({
  locale: "pt",
  fallbackLocale: "pt",
  allowComposition: true,
  messages: { en, pt },
});

export default i18n;
