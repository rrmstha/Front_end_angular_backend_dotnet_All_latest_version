import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/models/user.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  public signupObj = new UserModel();
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router, private api: ApiService){}

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      fullname: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      mobile: ['',Validators.required],
      usertype: ['',Validators.required]
    })
  }
  signUp(){
    /* this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfully");
      this.signupForm.reset();
      this.router.navigate(["login"]);
    },err=>{
      alert("Somthing Went Wrong")
    }) */
    this.signupObj.fullName = this.signupForm.value.fullname;
    this.signupObj.Username = this.signupForm.value.username;
    this.signupObj.Password = this.signupForm.value.password;
    this.signupObj.Mobile = this.signupForm.value.mobile;
    this.signupObj.UserType = this.signupForm.value.usertype
    this.api.signUp(this.signupObj)
    .subscribe(res=>{
      alert(res.message);
      this.signupForm.reset();
      this.router.navigate(["login"])
    })
  }
}
