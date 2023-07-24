import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public loginAPIUrl : string = "https://localhost:44393/api/Login/";
  public bookingAPIUrl : string = "https://localhost:44393/api/Booking/";
  constructor(private http : HttpClient) { }

    postEmployee(data : any){
      return this.http.post<any>(`${this.bookingAPIUrl}add_Booking`,data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
    getBooking(){
      return this.http.get(`${this.bookingAPIUrl}get_all_booking`)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
    updateEmployee(data : any){
      return this.http.put<any>(`${this.bookingAPIUrl}update_booking`,data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
    deleteEmployee(id : number){
      return this.http.delete(`${this.bookingAPIUrl}delete_booking/`+id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }
    signUp(empObj : any){
      //return this.http.post<any>(this.loginAPIUrl+"signup",empObj)
      return this.http.post<any>(`${this.loginAPIUrl}signup`,empObj)
    }
    login(empObj:any){
      return this.http.post<any>(`${this.loginAPIUrl}login`,empObj)
    }
}
