import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService : ApiService) { }

  async getProducts(){
    const products=await lastValueFrom(this.apiService.getProducts());
    return products;
  }
}
