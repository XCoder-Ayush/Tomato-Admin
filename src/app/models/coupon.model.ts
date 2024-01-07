export interface Coupon {
    id:string,
    code: string,
    discount: number,
    paymentType:string,
    minAmount:number,
    maxAmount:number,
    published: number,
}
  