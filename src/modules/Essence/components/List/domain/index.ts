export interface Essence {
  id: string;
  name: string;
  price: number;
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
