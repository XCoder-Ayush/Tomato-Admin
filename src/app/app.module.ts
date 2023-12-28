import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryModalComponent } from './components/categories/category-modal/category-modal.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { PromosComponent } from './components/promos/promos.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductModalComponent } from './components/products/product-modal/product-modal.component';
import { SocketService } from './services/socket/socket.service';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryModalComponent,
    ProductsComponent,
    UsersComponent,
    PromosComponent,
    OrdersComponent,
    SalesComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SocketService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
