import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  currentProduct?:Product;
  // REST API Call
  productListOrg : Product[]=[]
  productList: Product[]=[]
  categoryList: Category[]=[]

  categories = new FormControl('');
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private productService : ProductService,
    private categoryService : CategoryService){
  }

  async ngOnInit(): Promise<void> {
      this.productList=await this.productService.getProducts();
      this.productListOrg=this.productList;

      this.categoryList=await this.categoryService.getCategories();
  }
  // openModal(product : Product){
  //   const modal=document.querySelector('#modal') as HTMLElement;
  //   console.log(modal.classList);
  //   modal.classList.remove('hidden')
  //   console.log(modal.classList);
  //   this.currentProduct=product;
  //   // this.categoryNameEmmiter?.emit(categoryName)
  // }
  closeModal(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-0')
    console.log(modal.classList);
  }
  openModal(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-0')
    console.log(modal.classList);
  }

  uploadImage(){
    const imageUploadDiv = document.querySelector('#image-upload') as HTMLElement;
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    imageUploadDiv.appendChild(fileInput);
    fileInput.click();
    fileInput.addEventListener('change', function () {
      const files = fileInput.files as any;
      if(files && files.length > 0){
          var selectedFile = files[0];
        if (selectedFile) {
          alert('Selected file: ' + selectedFile.name);
        }
        imageUploadDiv.removeChild(fileInput);
      }
      else{
        return;
      }
    });
  }

  showPublishedProducts(){
    const publishBox=document.querySelector('#publish-box') as HTMLInputElement;
    if(publishBox.checked){
      this.productList=this.productListOrg.filter(product=>{
        return product.published==1;
      })
    }else{
      this.productList=this.productListOrg;
    }
  }
  key: string = '';
  filterProductItems(searchKey: any) {
    console.log(searchKey);
    
    this.productList = this.productListOrg.filter((item) => {
      return item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(searchKey.toLowerCase());
    });
  }


}
