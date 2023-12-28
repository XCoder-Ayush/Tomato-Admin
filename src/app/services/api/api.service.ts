import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    const URL = `http://localhost:8081/api/orders`;
    return this.http.get<Order[]>(URL);
  }

  getOrder(orderId: string): Observable<Order> {
    const URL = `http://localhost:8081/api/orders/${orderId}`;
    return this.http.get<Order>(URL);
  }

  updateOrderStatus(order: Order, eventName: string): Observable<Order> {
    const URL = `http://localhost:8081/api/order/status`;
    const body={
      orderId:order.orderId,
      status: eventName
    }
    return this.http.post<Order>(URL,body)
  }
}
