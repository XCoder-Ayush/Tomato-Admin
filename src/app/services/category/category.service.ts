import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService : ApiService) { }

  async getCategories(){
    const categories=await lastValueFrom(this.apiService.getCategories());
    return categories;
  }

  addCategory(categoryName: string){
    const category: Category={
      name: categoryName,
      id: '',
      published:1,
    }
    console.log(category);
    
    this.apiService.addCategory(category).subscribe((resp)=>{
      console.log(resp);
    },(err)=>{
      console.log(err);
    })
  }

  async getCategoryCountById(id:string){
    const resp=await lastValueFrom(this.apiService.getCategoryCountById(id));
    return resp;
  }
}
