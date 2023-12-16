import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  currentProduct?:Product;
  // REST API Call
  productList : Product[]=[
    {
      name: 'Burgiir',
      description: 'Bread, Spicy',
      createdAt: new Date(),
      category: 'Veg',
      status: 'Not Published'
    },
    {
      name: 'Burgiir',
      description: 'Bread, Spicy',
      createdAt: new Date(),
      category: 'Veg',
      status: 'Published'
    },
    {
      name: 'Burgiir',
      description: 'Bread, Spicy',
      createdAt: new Date(),
      category: 'Veg',
      status: 'Published'
    },
    {
      name: 'Burgiir',
      description: 'Bread, Spicy',
      createdAt: new Date(),
      category: 'Veg',
      status: 'Not Published'
    },
    {
      name: 'Burgiir',
      description: 'Bread, Spicy',
      createdAt: new Date(),
      category: 'Veg',
      status: 'Published'
    },
  ]
  openModal(product : Product){
    const modal=document.querySelector('#modal') as HTMLElement;
    // console.log(modal.classList);
    modal.classList.remove('hidden')
    // console.log(modal.classList);
    this.currentProduct=product;
    // this.categoryNameEmmiter?.emit(categoryName)
  }
}
