import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService : ApiService) { }

  async getProducts(){
    const products=await lastValueFrom(this.apiService.getProducts());
    return products;
  }

  addProduct(product: Product,image : File|undefined){
    this.apiService.addProduct(product,image).subscribe(resp=>{
      console.log(resp);
    })
  }

  updateProduct(product : Product,image : File|undefined){
    this.apiService.updateProduct(product,image).subscribe(resp=>{
      console.log(resp);
    })
  }
}
