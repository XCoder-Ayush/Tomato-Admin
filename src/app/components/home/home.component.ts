import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentOrder?: Order;
  constructor(private socketService: SocketService,private apiService : ApiService){
  }
  orderList: Order[] = []

  ngOnInit(): void {
    this.apiService.getAllOrders().subscribe(orders=>{
      console.log(orders);
      this.orderList=orders
    })
   
     this.socketService.getPlacedOrder().subscribe((order)=>{
         console.log(order);
         // Append to DOM
         console.log('Before Appending Order');        
         this.orderList.push(order)
         console.log(this.orderList);
        
       })
  }
  changeOrderStatus(order: Order) {
    console.log('jjjjjjjj')
    const selectElement = document.querySelector(`#order-statuses-${order.orderId}`) as HTMLSelectElement;
    
    if (order.status == 'cancelled') {
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('border-green-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('bg-green-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('text-green-800');
      console.log('jjjj');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('border-red-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('bg-red-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('text-red-800');
    }
    else {
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('border-green-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('bg-green-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('text-green-800');
      console.log('hello');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('border-red-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('bg-red-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('text-red-800');
    }
  }

  getDynamicStyles(order:Order){
    if(order.status =='cancelled')
    {
      return {
        'border-color': '#FC8181',
        'background-color': '#FED7D7',
        'color': '#C53030'
      }
    }
    else
    {
      return {
        'border-color': '#6EE7B7',
        'background-color': '#C6F6D5',
        'color': '#047857'
      }
    }
  }

  getTotalSales(){
    let totalSales=0;
    this.orderList.forEach(order=>{
      totalSales+=order.amount;
    })
    return totalSales;
  }
}