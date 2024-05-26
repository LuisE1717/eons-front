import Cookies from 'js-cookie'

export function setCookie(name:string, value:string, days:number) {
    if (days && days>0) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        Cookies.set(name,value,{expires:expires})
    }
}