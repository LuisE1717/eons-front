export interface ILogin {
    email: string;
    password: string;
    type?: string;
}

export interface ISessionLogin {
    email: string;
    password: string;
}

export interface IChangePass {
    token: string;
    newPassword:string;
}

export interface ICurrentUser {
    refreshToken?:string,
    accessToken?:string,
    email: string,
    type?: string,
    valid: boolean,
    essence: number,
}