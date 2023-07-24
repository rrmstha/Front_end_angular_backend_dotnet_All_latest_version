import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder : FormBuilder, private api : ApiService){

  }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      fromAddress : [''],
      toAddress : [''],
      typeofGoods : [''],
      weight : [''],
      assignDriver : [''],
      deliverDate : [''],
      mobile : [''],
      email : ['']
    })
    this.getAllBooking();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.FromAddress = this.formValue.value.fromAddress;
    this.employeeModelObj.ToAddress = this.formValue.value.toAddress;
    this.employeeModelObj.TypeofGoods = this.formValue.value.typeofGoods;
    this.employeeModelObj.Weight = this.formValue.value.weight;
    this.employeeModelObj.AssignDriver = this.formValue.value.assignDriver;
    this.employeeModelObj.DeliverDate = this.formValue.value.deliverDate;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Email = this.formValue.value.email;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("New Booking Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllBooking();

    },
    err=>{
      alert("Somthing Went Wrong")
    })
  }
  getAllBooking(){
    this.api.getBooking()
    .subscribe(res=>{
      this.employeeData = res.bookingDetails;
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Booking Deleted");
      this.getAllBooking();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['fromAddress'].setValue(row.fromAddress);
    this.formValue.controls['toAddress'].setValue(row.toAddress);
    this.formValue.controls['typeofGoods'].setValue(row.typeofGoods);
    this.formValue.controls['weight'].setValue(row.weight);
    this.formValue.controls['assignDriver'].setValue(row.assignDriver);
    this.formValue.controls['deliverDate'].setValue(row.deliverDate);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.FromAddress = this.formValue.value.fromAddress;
    this.employeeModelObj.ToAddress = this.formValue.value.toAddress;
    this.employeeModelObj.TypeofGoods = this.formValue.value.typeofGoods;
    this.employeeModelObj.Weight = this.formValue.value.weight;
    this.employeeModelObj.AssignDriver = this.formValue.value.assignDriver;
    this.employeeModelObj.DeliverDate = this.formValue.value.deliverDate;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Email = this.formValue.value.email;


    this.api.updateEmployee(this.employeeModelObj)
    .subscribe(res=>{
      alert("Booking Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllBooking();
    })
  }

}
