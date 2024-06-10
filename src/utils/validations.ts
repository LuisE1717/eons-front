export function validMail (mail:string|undefined|null): boolean {
    if(mail){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(mail)
    }
    return false;
}

export function validPass (password:string): boolean {
    return (password.length>=8)
}
