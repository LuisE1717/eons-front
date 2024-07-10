export interface Essence {
  id: string;
  descripcion: string;
  precio: number;
}

export interface Transfer {
  id: string;
  user: string;
  count: number;
  date: Date;
}

export enum SECTION {
  TRANSFER,
  BUY,
}
