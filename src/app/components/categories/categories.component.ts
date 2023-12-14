import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  @Output() categoryNameEmmiter? : any;
  currentCategoryName:string='';
  // REST API Call
  categoryList : Category[]=[
    {
      name: 'Pizza',
      count: 4,
      createdAt: new Date()
    },
    {
      name: 'Pizza',
      count: 4,
      createdAt: new Date()
    },
    {
      name: 'Pizza',
      count: 4,
      createdAt: new Date()
    },
    {
      name: 'Pizza',
      count: 4,
      createdAt: new Date()
    },
    {
      name: 'Pizza',
      count: 4,
      createdAt: new Date()
    },

  ]

  // Single Responsibility
  openModal(categoryName : string){
    const modal=document.querySelector('#modal') as HTMLElement;
    // console.log(modal.classList);
    modal.classList.remove('hidden')
    // console.log(modal.classList);
    this.currentCategoryName=categoryName;
    // this.categoryNameEmmiter?.emit(categoryName)
  }
}
