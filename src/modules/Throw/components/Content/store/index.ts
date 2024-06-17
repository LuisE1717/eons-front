import { atom } from "nanostores";
import { TYPES } from "../../../domain/types";

export const moneda1 = atom(0);
export const moneda2 = atom(0);

export const loading = atom(false);

export const throwType = atom(TYPES.NORMAL);

export const lastThrow = atom("00");
