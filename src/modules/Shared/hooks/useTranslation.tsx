import { useContext } from "react";
import { getI18N } from "../../../i18n";
import { LanguageContext } from "../context/LanguageContext";

export default function useTranslation() {
  const { locale } = useContext(LanguageContext);

  const translation = getI18N({ currentLocale: locale });

  return { translation };
}
