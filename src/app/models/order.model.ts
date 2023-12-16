export interface Order {
    orderId: string;
    paymentType: string;
    userId: string;
    amount: number;
    status: string;
    address: string;
    phone: string;
    items: string; // Assuming orderItems is an array of strings
  }