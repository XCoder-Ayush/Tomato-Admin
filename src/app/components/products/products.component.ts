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
      sales_disc: 10,
      createdAt: '10.09.20',
      category: 'Veg',
      status: 'Not Published',
      price: 100,
      stars: 0
    },
    {
      name: 'Burgiir',
      sales_disc: 10,
      createdAt: '10.09.20',
      category: 'Veg',
      status: 'Not Published',
      price: 100,
      stars: 0
    },
    {
      name: 'Burgiir',
      sales_disc: 10,
      createdAt: '10.09.20',
      category: 'Veg',
      status: 'Published',
      price: 100,
      stars: 0
    },
    
  ]
  openModal(product : Product){
    const modal=document.querySelector('#modal') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('hidden')
    console.log(modal.classList);
    this.currentProduct=product;
    // this.categoryNameEmmiter?.emit(categoryName)
  }
  f(){
    const modal = document.querySelector('#gg') as HTMLElement;
    console.log(modal.classList);
    modal.classList.remove('translate-x-0')
    console.log(modal.classList);
  }
  g(){
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
}
