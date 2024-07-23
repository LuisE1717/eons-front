import En from './en.json'
import Es from './es.json'
import Ar from './ar.json'
import It from './it.json'
import Hi from './hi.json'
import Ja from './ja.json'
import Fr from './fr.json'
import Zh from './zh.json'
import Ru from './ru.json'
import Pt from './pt.json'

export const Languages = {
    En: 'en',
    Es: 'es',
    Ar: 'ar',
    It: 'it',
    Hi: 'hi',
    Ja: 'ja',
    Fr: 'fr',
    Zh: 'zh',
    Ru: 'ru',
    Pt: 'pt',
}

export const LanguagesArray = [
     'en',
     'es',
     'ar',
     'it',
     'hi',
     'ja',
     'fr',
     'zh',
     'ru',
     'pt',
]

export const getI18N = ({ currentLocale }: { currentLocale: string }) => {
    switch (currentLocale){
        case Languages.En:
            return En;
        case Languages.Es:
            return Es;
        case Languages.Ar:
            return Ar;
        case Languages.It:
            return It;
        case Languages.Hi:
            return Hi;
        case Languages.Ja:
            return Ja;
        case Languages.Fr:
            return Fr;
        case Languages.Zh:
            return Zh;
        case Languages.Ru:
            return Ru;
        case Languages.Pt:
            return Pt;
        default:
            return Es;
    }
}