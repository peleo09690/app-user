import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { FooterSalesRegulationsComponent } from './components/layout/footer/footer-sales-regulations/footer-sales-regulations.component';
import { MemberBenefitsComponent } from './components/layout/footer/member-benefits/member-benefits.component';
import { ShoppingGuideComponent } from './components/layout/footer/shopping-guide/shopping-guide.component';
import { ReturnRefundComponent } from './components/layout/footer/return-refund/return-refund.component';
import { PrivacyPolicyComponent } from './components/layout/footer/privacy-policy/privacy-policy.component';
import { WarrantyPolicyComponent } from './components/layout/footer/warranty-policy/warranty-policy.component';
import { DeliveryTimeComponent } from './components/layout/footer/delivery-time/delivery-time.component';
import { PaymentMethodsComponent } from './components/layout/footer/payment-methods/payment-methods.component';
import { InformationWebsiteComponent } from './components/layout/footer/information-website/information-website.component';


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
        path: "sales-regulations",
        component: FooterSalesRegulationsComponent
      },
      {
        path: "member-benefits",
        component: MemberBenefitsComponent
      },
      {
        path: "shopping-guide",
        component: ShoppingGuideComponent
      },
      {
        path: "return-refund",
        component: ReturnRefundComponent
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent
      },
      {
        path: "warranty-policy",
        component: WarrantyPolicyComponent
      },
      {
        path: "delivery-time",
        component: DeliveryTimeComponent
      },
      {
        path: "payment-method",
        component: PaymentMethodsComponent
      },
      {
        path: "infor-website",
        component: InformationWebsiteComponent
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
