export function validMail (mail:string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail)
}

export function validPass (password:string): boolean {
    return (password.length>=8)
}
