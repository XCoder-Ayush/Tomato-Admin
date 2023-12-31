import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/models/category.model";
import { Order } from "src/app/models/order.model";
import { Product } from "src/app/models/product.model";

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

  getProducts():Observable<Product[]> {
    const URL = `http://localhost:8080/food/get`;
    return this.http.get<Product[]>(URL);
  }
  
  getCategories():Observable<Category[]> {
    const URL = `http://localhost:8080/category`;
    return this.http.get<Category[]>(URL);
  }

  addCategory(category : Category):Observable<Category> {
    const URL = `http://localhost:8080/category`;
    return this.http.post<Category>(URL,category)
  }

  getCategoryCountById(id: string):Observable<number>{
    const URL = `http://localhost:8080/category/${id}`;
    return this.http.get<number>(URL)
  }

  addProduct(product : Product):Observable<Product>{
    const URL = `http://localhost:8080/food/add`;
    return this.http.post<Product>(URL,product)
  }
  
  updateProduct(product : Product):Observable<Product>{
    const URL = `http://localhost:8080/food/update`;
    return this.http.put<Product>(URL,product)
  }
}
