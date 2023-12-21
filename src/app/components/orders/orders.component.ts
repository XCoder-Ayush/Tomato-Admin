import { Component } from '@angular/core';
import { Order } from 'src/app/models/order.model';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  currentOrder?:Order;
  statuses : any=[
  {
    placeholder:'Confirmed',
    eventName:'confirmed',
  },
  {
    placeholder:'Cancelled',
    eventName:'cancelled',
  },
  {
    placeholder:'Prepared',
    eventName:'prepared',
  },
  {
    placeholder:'Out for delivery',
    eventName:'outfordelivery',
  }
  ,
  {
    placeholder:'Delivered',
    eventName:'delivered',
  }
]
  orderList : Order[]=[
    {
      orderId:'XXXXXXXX',
    paymentType: 'Cash',
    userId: 'iiiiii',
    userName: 'Ayush',
    amount: 1000,
    status: 'Booked',
    address: 'Hahkkskks kkkaks',
    phone: '999019922',
    items: [{
      id:'1',
      name:'Pizza',
      price:300,
      quantity:2,
      subtotal:600
    }] 
    },
    {
      orderId:'XXXXXXX2',
    paymentType: 'Cash',
    userId: 'iiiiii',
    userName: 'Ayush',
    amount: 1000,
    status: 'Booked',
    address: 'Hahkkskks kkkaks',
    phone: '999019922',
    items: [{
      id:'1',
      name:'Pizza',
      price:300,
      quantity:2,
      subtotal:600
    }] 
    },
    {
      orderId:'XXXXXXX3',
    paymentType: 'Cash',
    userId: 'iiiiii',
    userName: 'Ayush',
    amount: 1000,
    status: 'Booked',
    address: 'Hahkkskks kkkaks',
    phone: '999019922',
    items: [{
      id:'1',
      name:'Pizza',
      price:300,
      quantity:2,
      subtotal:600
    }] 
    },
    {
      orderId:'XXXXXXX4',
    paymentType: 'Cash',
    userId: 'iiiiii',
    userName: 'Ayush',
    amount: 1000,
    status: 'Booked',
    address: 'Hahkkskks kkkaks',
    phone: '999019922',
    items: [{
      id:'1',
      name:'Pizza',
      price:300,
      quantity:2,
      subtotal:600
    }] 
    },
    {
      orderId:'XXXXXXX5',
    paymentType: 'Cash',
    userId: 'iiiiii',
    userName: 'Ayush',
    amount: 1000,
    status: 'Booked',
    address: 'Hahkkskks kkkaks',
    phone: '999019922',
    items: [{
      id:'1',
      name:'Pizza',
      price:300,
      quantity:2,
      subtotal:600
    }] 
    },
    // {
    //   orderId:'XXXXXXXX',
    // paymentType: 'Cash',
    // userId: 'iiiiii',
    //userName: 'Ayush',
    // amount: 1000,
    // status: 'Booked',
    // address: 'Hahkkskks kkkaks',
    // phone: '999019922',
    // items: 'hey,babe' 
    // },
  ]
  f(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-0')
    console.log(modal.classList);
  }
  g(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-0')
    console.log(modal.classList);
  }

  changeOrderStatus(order:Order){
    console.log('jjjjjjjj')
    const selectElement= document.querySelector(`#order-statuses-${order.orderId}`) as HTMLSelectElement;
    const eventName = selectElement.options[selectElement.selectedIndex].value;
    const placeholder = selectElement.options[selectElement.selectedIndex].text;
    if(eventName=='cancelled')
    {
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('border-green-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('bg-green-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('text-green-800');
      console.log('jjjj');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('border-red-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('bg-red-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('text-red-800');
    }
    else{
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('border-green-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('bg-green-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.add('text-green-800');
      console.log('hello');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('border-red-300');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('bg-red-200');
      (document.querySelector(`#order-statuses-${order.orderId}`) as HTMLElement).classList.remove('text-red-800');
    }
    
    //fire socket event from here

  }

}
