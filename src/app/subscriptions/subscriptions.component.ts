import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatActionList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatGridList} from "@angular/material/grid-list";
import {MatHeaderRow, MatRow, MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'subscriptions',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatActionList,
    MatDivider,
    NgIf,
    MatGridList,
    MatHeaderRow,
    MatRow,
    MatTableModule,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent implements OnInit{

  subscriptions:any;
  columnsToDisplay : any = ['subscriptionId','status','actions'];
  dataSource : any;
  constructor(private route:Router) {


  }
  ngOnInit() {
    this.getSubscription();
  }

  cancel(subscription:any){
    console.log("cancel the subscription" + JSON.stringify(subscription));
    let request;
    if(subscription.status=="trialing")
      {
        request = {
          action: "CANCEL",
          effectiveFrom : "immediately"
        }
      }else{
        request = {
          action: "CANCEL"}
      }

    axios.put("http://localhost:9091/api/paddle/subscriptions/"+subscription.subscriptionId,request).then(r=>
    {this.getSubscription()})
  }


  activate(subscription:any){
   let  request={
      action:"ACTIVATE"
    };

    axios.put("http://localhost:9091/api/paddle/subscriptions/"+subscription.subscriptionId,request).then(r=>
    {
      this.getSubscription();
    });
  }

  getSubscription():void{
    let user = localStorage.getItem("pdCustomerId");
    axios.get("http://localhost:9091/api/paddle/subscriptions?pdCustomerId="+user).then(r=>{
      this.subscriptions=r.data;this.dataSource = this.subscriptions;
    });
  }
}
