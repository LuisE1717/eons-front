import { setCookie } from "./cookies/Cookies"
import { locale } from '../UserStore';

export function setEnglish(english){
    if(english){
      //i18next.changeLanguage('en')
      setCookie("eons_lng","en",10)
      // const pathForUse = cleanURL(document.location.href)
      // console.log(pathForUse)
      document.location.href = document.location.href
      locale.set('en')
    }
}

export  function setSpanish(spanish){
    if(spanish){
      //i18next.changeLanguage('es')
      setCookie("eons_lng","es",10)
      document.location.href = document.location.href
      locale.set('es')
    }
}