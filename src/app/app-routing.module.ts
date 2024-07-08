import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


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
        path: "detail",
        component: ProductDetailComponent
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
