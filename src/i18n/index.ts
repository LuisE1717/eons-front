import landingEn from './en.json'
import landingEs from './es.json'

const Languages = {
    landingEn: 'en',
    landingEs: 'es'
}

export const getI18N = ({ currentLocale }: { currentLocale: string }) => {
    switch (currentLocale){
        case Languages.landingEn:
            return landingEn;
        case Languages.landingEs:
            return landingEs;
        default:
            return landingEs;
    }
}