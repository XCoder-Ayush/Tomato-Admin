import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('imageUploadDiv') imageUploadDivRef?: ElementRef;
  selectedCategories: string[]=[];
  selectedCategoriesDefault: string[]=[];

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



  openModal(product? : Product){
    const modal = document.querySelector('#modal') as HTMLElement;
    console.log(modal.classList);
    modal.classList.add('translate-x-0')
    console.log(modal.classList);

    let imgAdd=document.querySelector('#image-add') as HTMLElement;
    let imgEdit=document.querySelector('#image-edit') as HTMLImageElement;

    if(product==undefined){
      // Add Modal:
      this.productInModal=this.productInModalDefault
      this.selectedCategories=this.selectedCategoriesDefault
      
      imgEdit.style.display='none';
      imgAdd.style.display='block';

    }else{
      //Edit Modal
      this.productInModal = product;
      this.selectedCategories = this.productInModal.categories.map(category => category.name);

      imgEdit.style.display='block';
      imgAdd.style.display='none';
      imgEdit.src = this.productInModal.imageUrl;
      // if(this.imageUploadDivRef){
      //   const imageUploadDiv = this.imageUploadDivRef.nativeElement;
      //   // imageUploadDiv.classList.remove('bg-neutral-100')

      //   while (imageUploadDiv.firstChild) {
      //     imageUploadDiv.removeChild(imageUploadDiv.firstChild);
      //   }
      //   const imgElement = document.querySelector('#actual-image') as HTMLImageElement
      //   imgElement.src = this.productInModal.imageUrl;
    
      //   // imageUploadDiv.appendChild(imgElement);
      // }

    }

  }

  closeModal(){
    const modal = document.querySelector('#modal') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-0')
    console.log(modal.classList);
  }
  @ViewChild('fileInput') fileInputRef?: ElementRef;
  private allowClick = true;
  uploadImage() {
    if (this.allowClick && this.fileInputRef) {
      const fileInput = this.fileInputRef.nativeElement;
      fileInput.click();
    }
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile) {
        alert('Selected file: ' + selectedFile.name);
        // Save to Cloudinary and get image url

        // After getting img url show it in div
      }
    }
    this.allowClick = true; // Allow the click again after handling the file input
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

  onSave(){
    if(this.productInModal.name=='' || this.productInModal.categories.length==0 || this.productInModal.price==0){
      alert('Not Satisfied')
      return;
    }
    if(this.productInModal.id==''){
      this.addProduct();
    }else{
      this.updateProduct();
    }
  }

  addProduct(){
    // Update With Latest Values In Input Fields
    // this.productInModal.name=document.getElementById('')
    if((document.getElementById('modal-publish-check') as HTMLInputElement).checked){
      this.productInModal.published=1;
    }else{
      this.productInModal.published=0;
    }

    this.productService.addProduct(this.productInModal);
  }

  updateProduct(){
    if((document.getElementById('modal-publish-check') as HTMLInputElement).checked){
      this.productInModal.published=1;
    }else{
      this.productInModal.published=0;
    }
    this.productService.updateProduct(this.productInModal);
  }
}
