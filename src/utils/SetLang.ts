import { setCookie } from "./cookies/Cookies"
import { cleanURL } from "./navigation"
import { useStore } from '@nanostores/react';
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

export function setFrance(france){
    if(france){
      //i18next.changeLanguage('fr')
      setCookie("eons_lng","fr",10)
      document.location.href = document.location.href
      locale.set('fr')
    }
}

export function setItalian(italian){
    if(italian){
      setCookie("eons_lng","it",10)
      document.location.href = document.location.href
      locale.set('it')
    }
}

export function setRusia(rusia){
    if(rusia){
      setCookie("eons_lng","ru",10)
      document.location.href = document.location.href
      locale.set('ru')
    }
}

export function setJapan(japan){
    if(japan){
      setCookie("eons_lng","ja",10)
      document.location.href = document.location.href
      locale.set('ja')
    }
}

export function setHindi(hindi){
    if(hindi){
      setCookie("eons_lng","hi",10)
      document.location.href = document.location.href
      locale.set('hi')
    }
}

export function setPortugues(portugues){
    if(portugues){
      setCookie("eons_lng","pt",10)
      document.location.href = document.location.href
      locale.set('pt')
    }
}

export function setChiness(chiness){
    if(chiness){
      setCookie("eons_lng","zh",10)
      document.location.href = document.location.href
      locale.set('zh')
    }
}

export function setArabian(arabian){
    if(arabian){
      setCookie("eons_lng","ar",10)
      document.location.href = document.location.href
      locale.set('ar')
    }
}