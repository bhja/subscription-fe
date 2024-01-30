import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, FormsModule,
        ReactiveFormsModule,MatTabsModule
        , RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'subscription-fe';
}
