import type { TranslationKeys } from '../types/i18n';

import En from './en.json'
import Es from './es.json'

export const Languages = {
    En: 'en',
    Es: 'es'
}

export const LanguagesArray = [
     'en',
     'es'
]

export const getI18N = ({ currentLocale }: { currentLocale: string }): TranslationKeys => {
    switch (currentLocale){
        case Languages.En:
            return En as TranslationKeys;
        case Languages.Es:
            return Es as TranslationKeys;
        default:
            return Es as TranslationKeys;
    }
}