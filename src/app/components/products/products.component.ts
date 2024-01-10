import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import * as Noty from 'noty';
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


  imageInModal?: File
  openModal(product? : Product){
    const modal = document.querySelector('#modal') as HTMLElement;
    // console.log(modal.classList);
    modal.classList.add('translate-x-0')
    // console.log(modal.classList);

    let imgAdd=document.querySelector('#image-add') as HTMLElement;
    let imgEdit=document.querySelector('#image-container') as HTMLImageElement;

    if(product==undefined){
      // Add Modal:
      console.log(1);
      
      this.productInModal=this.productInModalDefault
      this.selectedCategories=this.selectedCategoriesDefault
      
      imgEdit.style.display='none';
      imgAdd.style.display='block';

    }else{
      //Edit Modal
      this.productInModal = product;
      this.selectedCategories = this.productInModal.categories.map(category => category.name);

      imgAdd.style.display='none';
      imgEdit.style.display='block';
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
    modal.classList.remove('translate-x-0')
    this.productInModal=this.productInModalDefault
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
      console.log(3);
      this.imageInModal=selectedFile;
        // alert('Selected file: ' + selectedFile.name);
      (document.getElementById('image-add') as HTMLElement).style.display='none';

        // Show image in div
        // Save to Cloudinary and get image url
      const parentDiv = document.getElementById('image-upload') as HTMLImageElement;
      const imgElement=document.getElementById('image-container') as HTMLImageElement;

      // imageContainer.remove();

      // const imgElement = document.createElement('img');
      // imgElement.id='image-container'
      imgElement.src = URL.createObjectURL(selectedFile);
      imgElement.alt = 'Something Went Wrong'; 
      imgElement.style.width='100%'
      imgElement.style.height='100%'
      imgElement.style.display='block'


      // Append the img element to the parent div
      // parentDiv.appendChild(imgElement);

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
    let updatedCategoryList:Category[]=[];
    this.categoryList.forEach((category)=>{
      this.selectedCategories.forEach((categoryName)=>{
        if(category.name==categoryName){
          updatedCategoryList.push(category);
        }
      })
    })

    this.productInModal.categories=updatedCategoryList;

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

    if((document.getElementById('modal-publish-check') as HTMLInputElement).checked){
      this.productInModal.published=1;
    }else{
      this.productInModal.published=0;
    }
    
    this.productService.addProduct(this.productInModal,this.imageInModal);
    new Noty({
      layout: 'topRight',
      type: 'success',
      text: 'Product Saved In Inventory',
      theme: 'metroui',
      timeout: 3000,
    }).show();
    this.closeModal();

  }

  updateProduct(){
    // this.productInModal.categories=this.selectedCategories;

    if((document.getElementById('modal-publish-check') as HTMLInputElement).checked){
      this.productInModal.published=1;
    }else{
      this.productInModal.published=0;
    }
    // console.log(this.productInModal);
    this.productService.updateProduct(this.productInModal,this.imageInModal);
    new Noty({
      layout: 'topLeft',
      type: 'success',
      text: 'Product Updated In Inventory',
      theme: 'metroui',
      timeout: 3000,
    }).show();
    this.closeModal();

  }
}
