import { OrderItem } from 'src/app/models/orderitem.model'

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