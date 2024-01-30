import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardModule, MatCardTitle} from "@angular/material/card";
import axios from "axios";
import {CheckoutOpenOptions, initializePaddle} from "@paddle/paddle-js";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatChipRow} from "@angular/material/chips";
import {MatButton} from "@angular/material/button";
declare var total: any;
@Component({
  selector: 'checkout',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    NgForOf,
    NgIf,
    MatGridListModule,
    FormsModule,
    MatChipRow,
    MatButton
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  paddle : any;
  prices: any;

  product: any;
  name:any;
  show:boolean = false;
  // @ts-ignore
  checkout0:any;

  public constructor(private route:ActivatedRoute,private r0:Router) {
    this.product =  route.snapshot.paramMap.get("pId");
    this.name= route.snapshot.paramMap.get("pName");

  }

  ngOnInit(): void {


    axios.get("http://localhost:9091/api/paddle/settings").then(r =>
      localStorage.setItem("client_token", r.data.clientToken));

    console.log(localStorage.getItem("client_token"));
    let token0: string | null = localStorage.getItem("client_token");
    if (token0 == null) {
      return;
    }

    initializePaddle({
      environment: 'sandbox', token: token0, eventCallback: (event) => {
        if (event.name == "checkout.completed") {
          console.log("Checkout done");
        }
        if (event.name == "checkout.loaded") {
          this.checkout0=event.data?.items.map(r=>r.recurring_totals)[0];
          console.log(JSON.stringify(this.checkout0));
        }
      },
      checkout: {
        settings: {
          displayMode: "inline",
          theme: "light",
          locale: "en",
          allowLogout: false,
          frameTarget: "checkout-container",
          frameInitialHeight: 200,
          frameStyle: "width: 100%; min-width: 200px; background-color: transparent; border: none;",
          successUrl: 'http://localhost:4200/subscriptions'
        }
      }
    }).then(r => {
      console.log("initialized");
      this.paddle = r
    })
    axios.get("http://localhost:9091/api/paddle/products/"+this.product+"/prices").then(r=>{this.prices=r.data});
  }

  load(price:any) :void {
    this.show= true;

    let items =[
      {
        priceId:  price.priceId
      }
    ]

    let inputOptions :CheckoutOpenOptions = {
      items: items,
      customer : {
        id : ''
      },
      settings:{
        allowLogout : false
      }
    }
    if(localStorage.getItem("pdCustomerId")==null){
      // @ts-ignore
      delete inputOptions.customer;
    }else{
      // @ts-ignore
      inputOptions.customer.id = localStorage.getItem("pdCustomerId");
    }

    this.paddle.Checkout.open(inputOptions);



  }
  validateCode(){

  }

  back(){
    this.r0.navigate(["/products"]);
  }




}
