import { atom, map } from 'nanostores'

export const locale = atom('es')

export type UserProfile = {
    email: string;
    valid: boolean;
    essence: number;
}

export const userProfile = atom(<UserProfile | null>({}));