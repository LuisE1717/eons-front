import Cookies from 'js-cookie'

//esto solo funciona del lado del navegador, del lado del servidor esto no funciona

export function setCookie(name:string, value:string, days:number) {
    if (days && days>0) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        Cookies.set(name,value,{expires:expires,path:'/'})
    }
}

export function deleteCookie(name) {
    setCookie(name, "", -1);
}

export function getExpire() {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    return expires
}