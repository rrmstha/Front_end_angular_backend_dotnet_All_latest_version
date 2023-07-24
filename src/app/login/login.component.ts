import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  public loginObj = new UserModel();
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router: Router, private api: ApiService){
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })    
  }
  login(){
    /* this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success!!");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found!!");
      }
    },err=>{
      alert("Somthing Went Wrong!!")
    }) */
    this.loginObj.Username = this.loginForm.value.username;
    this.loginObj.Password = this.loginForm.value.password;
    this.api.login(this.loginObj)
    .subscribe(res=>{
      alert(res.message);
      this.router.navigate(['dashboard'])
    })
  }

}
