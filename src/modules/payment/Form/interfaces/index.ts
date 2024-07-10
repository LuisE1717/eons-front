export interface Form {
  save: boolean;
  number: string;
  expirationDate: string;
  name: string;
  cvv: string;
}

export interface PaymentCheck {
  reference:string,
  bankOrderCode:string
}
