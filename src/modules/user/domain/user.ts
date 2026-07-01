export interface ILogin {
    email: string;
    password: string;
    type?: string | null;
}

export interface IChangePass {
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