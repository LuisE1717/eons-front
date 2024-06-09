export interface ILogin {
    email: string;
    password: string;
}

export interface IChangePass {
    token: string;
    newPassword:string;
}