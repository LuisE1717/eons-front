import { useContext } from "react";
import { getI18N } from "../../../i18n";
import { LanguageContext } from "../context/LanguageContext";
import { useStore } from "@nanostores/react";
import { locale } from "../../../LanguageStore";
import Cookies from "js-cookie";

export default function useTranslation() {
  const $locale = useStore(locale);

  const translation = getI18N(
    Cookies.get("eons_lng")
      ? { currentLocale: Cookies.get("eons_lng") || "en" }
      : { currentLocale: $locale }
  );

  return { translation };
}
