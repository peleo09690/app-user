import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/layout/cart/cart.component';
import { DeliveryTimeComponent } from './components/layout/footer/delivery-time/delivery-time.component';
import { FooterSalesRegulationsComponent } from './components/layout/footer/footer-sales-regulations/footer-sales-regulations.component';
import { InformationWebsiteComponent } from './components/layout/footer/information-website/information-website.component';
import { MemberBenefitsComponent } from './components/layout/footer/member-benefits/member-benefits.component';
import { PaymentMethodsComponent } from './components/layout/footer/payment-methods/payment-methods.component';
import { PrivacyPolicyComponent } from './components/layout/footer/privacy-policy/privacy-policy.component';
import { ReturnRefundComponent } from './components/layout/footer/return-refund/return-refund.component';
import { ShoppingGuideComponent } from './components/layout/footer/shopping-guide/shopping-guide.component';
import { WarrantyPolicyComponent } from './components/layout/footer/warranty-policy/warranty-policy.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { SearchTrackingNumberComponent } from './components/search-tracking-number/search-tracking-number.component';


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
      },
      {
        path: "tracking-number-order",
        component: SearchTrackingNumberComponent
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
