export interface Essence {
  id: string;
  descripcion: string;
  precio: number;
  descuento: number;
}

export interface Price {
  descuento: number;
  costo: number;
  esencia: string;
}

export interface TransferHistorial {
  id: number;
  amount: number;
  date: Date;
  senderEmail: number;
  receiverEmail: string;
}

export interface Transfer {
  id: string;
  user: string;
  count: number;
  date: Date;
}

export enum SECTION {
  TRANSFER,
  DONATION,
  PAY,
  TRANSFER_HISTORIAL,
}
