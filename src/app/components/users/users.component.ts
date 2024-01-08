import { Component } from '@angular/core';
import { Constants } from 'src/app/models/shared.enum';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  currentUser?:User;

  userList: User[]=[{
    userId:'XXXX',
    firstName:'Ayush',
    lastName:'Sharma',
    email:'xcoder@gmail.com',
    password:'Superhero***',
    about:'About me',
    role:'User',
    addresses:[{
      id :'XXXX',
    addressLine1 : 'GD block, sector-3',
    addressLine2 : '24 parganas',
    pincode : 700102,
    landmark : 'GD-367',
    city :'Kolkata',
    country : 'India',
    }],
    status:Constants.BLOCKED
  },
  {
    userId:'XXXX',
    firstName:'Ayush',
    lastName:'Sharma',
    email:'xcoder@gmail.com',
    password:'Superhero***',
    about:'About me',
    role:'User',
    addresses:[{
      id :'XXXX',
    addressLine1 : 'GD block, sector-3',
    addressLine2 : '24 parganas',
    pincode : 700102,
    landmark : 'GD-367',
    city :'Kolkata',
    country : 'India',
    }],
    status:Constants.UNBLOCKED
  },
];

userInModal:User={
  userId:'',
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    about:'',
    role:'',
    addresses:[{
      id :'',
    addressLine1 : '',
    addressLine2 : '',
    pincode : 0,
    landmark : '',
    city :'',
    country : '',
    }],
    status:Constants.UNBLOCKED,
};
openModal(user:User){
  this.userInModal=user;
  const modal = document.querySelector('#gg') as HTMLElement;
  console.log(modal.classList);
  modal.classList.remove('translate-x-full')
  console.log(modal.classList);
}
closeModal(){
  const modal = document.querySelector('#gg') as HTMLElement;
  console.log(modal.classList);
  modal.classList.add('translate-x-full')
  console.log(modal.classList);
}

changeBlockStatus1(){
  const blockInput = (document.querySelector('#block')as HTMLInputElement);
  if(blockInput.checked){
    this.userInModal.status=Constants.BLOCKED
  }
  else{
    this.userInModal.status=Constants.UNBLOCKED
  }

}

changeBlockStatus2(){
  const blockInput = (document.querySelector('#unblock')as HTMLInputElement);
  if(blockInput.checked){
    this.userInModal.status=Constants.BLOCKED
  }
  else{
    this.userInModal.status=Constants.UNBLOCKED
  }
}

}

