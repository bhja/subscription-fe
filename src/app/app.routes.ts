import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {ProductsComponent} from "./products/products.component";
import {CheckoutComponent} from "./checkout/checkout.component";

export const routes: Routes = [{path: '', redirectTo: '/login', pathMatch: 'full'},{
  path:'login',component:LoginComponent},{
 path: 'products',component:ProductsComponent},{path:'checkout',component:CheckoutComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutes{

}

