import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  @Output() categoryNameEmmiter? : any;
  currentCategoryName:string='';
  // REST API Call
  categoryList : Category[]=[
  ]
  categoryListOrg : Category[]=[
  ]

  constructor(private categoryService : CategoryService){
  }
  categoryCountMap: Map<string, number> = new Map();
  async ngOnInit(): Promise<void> {
      this.categoryList=await this.categoryService.getCategories();
      this.categoryListOrg=this.categoryList

      await Promise.all(this.categoryList.map(async (category) => {
        const count = await this.categoryService.getCategoryCountById(category.id);
        this.categoryCountMap.set(category.id, count);
      }));
  }
  key : string='';
  filterCategoryItems(searchKey: any) {
    console.log(searchKey);
    
    this.categoryList = this.categoryListOrg.filter((item) => {
      return item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
  }
  // Single Responsibility
  openModal(categoryName : string){
    const modal=document.querySelector('#modal') as HTMLElement;
    // console.log(modal.classList);
    modal.classList.remove('hidden')
    // console.log(modal.classList);
    this.currentCategoryName=categoryName;
    // this.categoryNameEmmiter?.emit(categoryName)
  }
  
  g(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-full')
    console.log(modal.classList);
  }
  f(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-full')
    console.log(modal.classList);
  }

  addCategory(){
    const inputValue= (document.querySelector('#category-input') as HTMLInputElement).value;
    if(inputValue==null || inputValue==undefined || inputValue=='')return;
    this.categoryService.addCategory(inputValue)

    this.f();
  }
}
