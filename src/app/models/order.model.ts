import { OrderItem } from "./orderItem.model";

export interface Order {

    orderId: string;
    paymentType: string;
    userId: string;
    userName: string;
    amount: number;
    status: string;
    address: string;
    phone: string;
    items: OrderItem[]
  }