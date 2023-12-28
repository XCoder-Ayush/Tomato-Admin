import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/order.model";
import { ApiService } from "src/app/services/api/api.service";
import { SocketService } from "src/app/services/socket/socket.service";
@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  constructor(private apiService : ApiService,private socketService: SocketService){}
  
  orderList:Order[] = [];

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
      
      // this.socketService.getOrderStatusUpdates().subscribe((data) => {
      //   // This will only and only listen to the event when order is placed
      //   const orderId=data.orderId;
      //   const newStatus=data.newStatus;
      //   console.log(`Order ${orderId} status is`, newStatus);
        
      //   // Fetch Entire Order
      //   this.apiService.getOrder(orderId).subscribe(order=>{
      //   // Append to DOM
      //   console.log('Before Appending Order');        
      //     this.orderList.push(order)
      //     console.log(this.orderList);
          
      //   })

      // });  
    
  }

  currentOrder?: Order;
  isSelected(order: Order,element : any){
    this.changeOrderStatus(order);
    return element.value==order.status;
  }
  statuses: any = [
    {
      placeholder: "Placed",
      eventName: "placed",
    },
    {
      placeholder: "Confirmed",
      eventName: "confirmed",
    },
    {
      placeholder: "Cancelled",
      eventName: "cancelled",
    },
    {
      placeholder: "Prepared",
      eventName: "prepared",
    },
    {
      placeholder: "Out for delivery",
      eventName: "outfordelivery",
    },
    {
      placeholder: "Delivered",
      eventName: "delivered",
    },
  ];
  
  orderInModal: Order = {
    orderId: "bbb",
    paymentType: "",
    userId: "",
    userName: "asss",
    amount: 0,
    status: "",
    address: "",
    phone: "",
    items: [
      {
        id: "",
        name: "",
        price: 0,
        quantity: 0,
        subtotal: 0,
      },
    ],
  };

  openModal(order: Order) {
    this.orderInModal = order;
    const modal = document.querySelector("#gg") as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove("translate-x-full");
    console.log(modal.classList);
  }
  
  closeModal() {
    const modal = document.querySelector("#gg") as HTMLElement;
    console.log(modal.classList);
    modal.classList.add("translate-x-full");
    console.log(modal.classList);
  }

  changeOrderStatus(order: Order) {
    // Transactional, Ensure Later
    const selectElement = document.querySelector(
      `#order-statuses-${order.orderId}`
    ) as HTMLSelectElement;
    const eventName = selectElement.options[selectElement.selectedIndex].value;
    const placeholder = selectElement.options[selectElement.selectedIndex].text;
    if (eventName == "cancelled") {
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("border-green-300");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("bg-green-200");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("text-green-800");
      console.log("jjjj");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("border-red-300");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("bg-red-200");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("text-red-800");
    } 
    else {
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("border-green-300");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("bg-green-200");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add("text-green-800");
      console.log("hello");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("border-red-300");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("bg-red-200");
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove("text-red-800");
    }

    //Fire socket event from here
    // Both should occur as a Transaction
    this.fireSocketEvent(order,eventName)
    this.changeOrderStatusInDB(order,eventName)
  }

  fireSocketEvent(order:Order, eventName:string){
    this.socketService.joinOrderRoom(order.orderId);
    this.socketService.updateOrderStatus(order.orderId,eventName)
  }

  changeOrderStatusInDB(order:Order, eventName:string){
    this.apiService.updateOrderStatus(order,eventName).subscribe(resp=>{
      console.log(resp);
    },err=>{
      console.log(err);
    })
  }
}
