import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  standalone: true,
    imports: [

        MatFormField, MatInputModule,
        FormsModule, ReactiveFormsModule, MatCardContent, MatCard
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public constructor(private route:Router) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  form: FormGroup = new FormGroup({email:new  FormControl('',[Validators.required, Validators.email])});
  ngOnInit(): void {

  }

  login() {

    axios.get("http://localhost:9091/api/user?email="+this.form.get("email")?.value).then(r=>
    {
      localStorage.removeItem("email");
      localStorage.removeItem("uuid");
      localStorage.setItem("email",r.data.email);
      localStorage.setItem("uuid",r.data.uuid);
      this.route.navigate(['/products', {  }]);
  });

}
}
