import { useContext } from "react";
import { getI18N } from "../../../i18n";
import { LanguageContext } from "../context/LanguageContext";
import { useStore } from '@nanostores/react';
import { locale } from '../../../LanguageStore';

export default function useTranslation() {
  const $locale = useStore(locale)
  const translation = getI18N({ currentLocale: $locale});

  return { translation };
}
