import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatAnchor} from "@angular/material/button";
import {MatRipple} from "@angular/material/core";
import {MatTab, MatTabsModule, MatTabChangeEvent, MatTabGroup, MatTabLabel, MatTabLink} from "@angular/material/tabs";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatAnchor,
    MatRipple,
    MatTabGroup,
    MatTab, RouterLink,
    MatTabLabel, RouterLinkActive, MatTabLink, NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private route:Router) {
    this.navLinks = [
      {
        label: 'Login',
        link: 'login',
        index: 0
      }, {
        label: 'Products',
        link: 'products',
        index: 1
      }, {
        label: 'Subscriptions',
        link: 'subscriptions',
        index: 2
      },
    ];

  }

  onTabChanged(event:MatTabChangeEvent){
    console.log(event.index,event);
      switch(event.index){
        case 0 :
          this.route.navigate(["/login"]);
          break;
        case 1:
          if(localStorage.getItem("uuid")!=null){
            this.route.navigate(["/products"]);
          }
          break;
        case 2:
          if(localStorage.getItem("uuid")!=null){
            this.route.navigate(["/subscriptions"]);
          }
          break;
      }

  }

  ngOnInit() {
    this.route.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.route.url));
    });
  }
}
