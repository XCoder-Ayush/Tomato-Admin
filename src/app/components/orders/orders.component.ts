import { Component, OnInit } from '@angular/core';
import { OrderStatus } from 'src/app/enums/orderStatus.enum';
import { Order } from 'src/app/models/order.model';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private socketService: SocketService
  ) {}

  orderList: Order[] = [];
  orderListOrg: Order[] = [];

  ngOnInit(): void {
    this.apiService.getAllOrders().subscribe((orders) => {
      console.log(orders);
      this.orderList = orders;
      this.orderListOrg = orders;
    });

    this.socketService.getPlacedOrder().subscribe((order) => {
      console.log(order);
      // Append to DOM
      console.log('Before Appending Order');
      this.orderList.push(order);
      this.orderListOrg = this.orderList;
      console.log(this.orderList);
    });

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

  key: string = '';

  filterProductItems(searchKey: any) {
    console.log(searchKey);

    this.orderList = this.orderListOrg.filter((item) => {
      return item.orderId
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
  }

  currentOrder?: Order;

  isSelected(order: Order, element: any) {
    // this.changeOrderStatus(order);
    this.renderOrderStatus(order);
    return element.value == order.status;
  }

  statuses: any = [
    {
      placeholder: 'Placed',
      eventName: OrderStatus.PLACED,
    },
    {
      placeholder: 'Confirmed',
      eventName: OrderStatus.CONFIRMED,
    },
    {
      placeholder: 'Cancelled',
      eventName: OrderStatus.CANCELLED,
    },
    {
      placeholder: 'Assigned',
      eventName: OrderStatus.ASSIGNED,
    },
    {
      placeholder: 'Out for delivery',
      eventName: OrderStatus.OUT_FOR_DELIVERY,
    },
    {
      placeholder: 'Delivered',
      eventName: OrderStatus.DELIVERED,
    },
  ];

  orderInModal: Order = {
    orderId: 'bbb',
    paymentType: '',
    userId: '',
    userName: 'asss',
    amount: 0,
    status: '',
    address: '',
    phone: '',
    items: [
      {
        id: '',
        name: '',
        price: 0,
        quantity: 0,
        subtotal: 0,
      },
    ],
  };

  openModal(order: Order) {
    this.orderInModal = order;
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-full');
    console.log(modal.classList);
  }

  closeModal() {
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-full');
    console.log(modal.classList);
  }
  renderOrderStatus(order: Order) {
    const selectElement = document.querySelector(
      `#order-statuses-${order.orderId}`
    ) as HTMLSelectElement;
    const eventName = selectElement.options[selectElement.selectedIndex].value;
    const placeholder = selectElement.options[selectElement.selectedIndex].text;

    if (eventName == OrderStatus.CANCELLED) {
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('border-green-300');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('bg-green-200');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('text-green-800');
      console.log('jjjj');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('border-red-300');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('bg-red-200');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('text-red-800');
    } else {
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('border-green-300');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('bg-green-200');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.add('text-green-800');
      console.log('hello');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('border-red-300');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('bg-red-200');
      (
        document.querySelector(
          `#order-statuses-${order.orderId}`
        ) as HTMLElement
      ).classList.remove('text-red-800');
    }
  }

  changeOrderStatus(order: Order) {
    // Transactional, Ensure Later
    const selectElement = document.querySelector(
      `#order-statuses-${order.orderId}`
    ) as HTMLSelectElement;
    const eventName = selectElement.options[selectElement.selectedIndex].value;

    this.renderOrderStatus(order);
    /**
     * @description
     * Fire socket event from here
     * Both should occur as a Transaction
     */
    this.changeOrderStatusInDB(order, eventName);
    this.fireSocketEvent(order, eventName);
  }

  fireSocketEvent(order: Order, eventName: string) {
    /**
     * @brief
     * Admin Side Client Application Joins Server Side Room Order Id
     */
    this.socketService.joinOrderRoom(order.orderId);

    if (
      eventName == OrderStatus.ASSIGNED ||
      eventName == OrderStatus.OUT_FOR_DELIVERY ||
      eventName == OrderStatus.DELIVERED
    ) {
      //Hard Coded
      const deliveryAgentId = '657b9ac7-b969-4a14-8faf-957dbb06846e';

      this.socketService.updateOrderStatus(
        order.orderId,
        eventName,
        deliveryAgentId
      );
    } else {
      this.socketService.updateOrderStatus(order.orderId, eventName, '');
    }
  }

  changeOrderStatusInDB(order: Order, eventName: string) {
    this.apiService.updateOrderStatus(order, eventName).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
