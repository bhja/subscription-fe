import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatCard, MatCardModule} from "@angular/material/card";
import axios from "axios";
import {NgForOf, NgIf} from "@angular/common";
import {MatList, MatListModule} from "@angular/material/list";
import {MatRipple} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {CheckoutOpenOptions, initializePaddle} from "@paddle/paddle-js";
import {Router, RouterLink} from "@angular/router";
import {CheckoutComponent} from "../checkout/checkout.component";

@Component({
  selector: 'products',
  standalone: true,
  imports: [MatCardModule, NgForOf, MatListModule, MatRipple, NgIf, MatButton],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,AfterViewInit{

  products: any;
  product :any;
  public constructor(private route:Router) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() : void{
    let data = { uuid: localStorage.getItem("uuid")};
    let body = {
      email: localStorage.getItem("email"),
      custom_data: data
    }
    axios.post("http://localhost:9091/api/paddle/customers",body).then(r=>localStorage.setItem("pdCustomerId",r.data.pdCustomerId));
    axios.get("http://localhost:9091/api/paddle/products").then(r=>this.products = r.data
    );
  }

  loadprices(item:any) : void{
    console.log(item.productId);
    this.product = item;

    this.route.navigate(['/checkout', {product:this.product.productId}]);

  }



}
