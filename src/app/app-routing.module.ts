import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/layout/cart/cart.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: LayoutComponent,
    // canActivateChild: [()=> inject(AuthService).isAuthenticated()],
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "product",
        component: ProductComponent
      },
      {
        path: "product/:id",
        component: ProductDetailComponent
      },
      {
        path: "cart",
        component: CartComponent
      }

    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
