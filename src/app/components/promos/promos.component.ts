import { Component } from '@angular/core';
import { Coupon } from 'src/app/models/coupon.model';
@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent {
  currentCoupon?: Coupon;
  couponList: Coupon[] = [{
    id: 'XXXXXXX',
    code: 'sabkoMilega',
    discount: 20,
    paymentType: 'Cash',
    minAmount: 199,
    maxAmount: 399,
    published: 1
  },
  {
    id: 'XXXXXXX',
    code: 'sabkoMilega',
    discount: 20,
    paymentType: 'Cash',
    minAmount: 199,
    maxAmount: 399,
    published: 1
  },
  {
    id: 'XXXXXXX',
    code: 'sabkoMilega',
    discount: 20,
    paymentType: 'Cash',
    minAmount: 199,
    maxAmount: 399,
    published: 1
  },
  {
    id: 'XXXXXXX',
    code: 'sabkoMilega',
    discount: 20,
    paymentType: 'Cash',
    minAmount: 199,
    maxAmount: 399,
    published: 1
  },
  ];

  couponInModal:Coupon={
     id:'',
     code:'',
     discount:0,
     paymentType:'',
     minAmount:0,
     maxAmount:0,
  
  published: 1  };

  
  openCreateModal(){
    this.couponInModal={
      id:'',
      code:'',
      discount:0,
      paymentType:'',
      minAmount:0,
      maxAmount:0,
  
  published: 1  };
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-full')
    console.log(modal.classList);

    (document.querySelector('#create-btn')as HTMLElement).innerText="Create";
  }
  openEditModal(order: Coupon) {
    this.couponInModal = order;
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-full')
    console.log(modal.classList);

    (document.querySelector('#create-btn')as HTMLElement).innerText="Save";

  }
  closeModal() {
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-full')
    console.log(modal.classList);
  }

}