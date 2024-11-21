import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEN from "./Locales/EN/common.json";
import commonRU from "./Locales/RU/common.json";
import commonAZ from "./Locales/AZ/common.json";

interface Resources {
  common: any
}

const savedLanguage: string = localStorage.getItem("lang") || "EN";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        common: commonEN as Resources['common'],
      },
      RU: {
        common: commonRU as Resources['common'],
      },
      AZ: {
        common: commonAZ as Resources['common'],
      },
    },
    lng: savedLanguage,
    fallbackLng: "EN",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
  })
  .catch((err) => {
  });

export default i18n;