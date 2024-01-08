import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PromosComponent } from './components/promos/promos.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path:'',component:HomeComponent },
  { path:'auth',component:AuthComponent },
  { path:'categories',component: CategoriesComponent},
  { path:'products',component: ProductsComponent},
  { path:'orders',component: OrdersComponent},
  { path:'promos', component:PromosComponent},
  { path:'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
