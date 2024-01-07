import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
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
  productListOrg : Product[]=[]
  productList: Product[]=[]
  categoryList: Category[]=[]
  key: string = '';

  categoriesDefault : FormControl = new FormControl();
  categories : FormControl = new FormControl();

  productInModalDefault:Product = {
    "id":"",
    "price": 0,
    "name": "",
    "categories": [],
    "imageUrl": "",
    "cookTime": 0,
    "description": "",
    "stars": 0,
    "onSale": 0,
    "published": 0
  }
  productInModal:Product= {
    "id":"",
    "price": 0,
    "name": "",
    "categories": [],
    "imageUrl": "",
    "cookTime": 0,
    "description": "",
    "stars": 0,
    "onSale": 0,
    "published": 0
  }
  constructor(
    private productService : ProductService,
    private categoryService : CategoryService){}

  async ngOnInit(): Promise<void> {
      this.productList=await this.productService.getProducts();
      this.productListOrg=this.productList;

      this.categoryList=await this.categoryService.getCategories();
  }

  isSelected(category: Category): boolean {
    return this.productInModal.categories.some(selectedCategory => selectedCategory.id === category.id);
  }
  selectedCategories: string[]=[];

  openModal(product? : Product){
    const modal = document.querySelector('#add-modal') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-0')
    console.log(modal.classList);
    if(product==undefined){
      // Add Modal:
      this.productInModal=this.productInModalDefault
      // this.categories=this.categoriesDefault;
    }else{
      //Edit Modal
      this.productInModal = product;
      this.selectedCategories = this.productInModal.categories.map(category => category.name);
      // this.categories
      // console.log(this.productInModal);
      
      // let selectedCategories: string[]=[];
      // this.productInModal.categories.forEach(category=>{
      //   selectedCategories.push(category.name);
      // })
      // this.categories=new FormControl(selectedCategories)      
      // this.categories=new FormControl(this.productInModal.categories)      

    }

  }

  closeModal(){
    const modal = document.querySelector('#add-modal') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-0')
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
