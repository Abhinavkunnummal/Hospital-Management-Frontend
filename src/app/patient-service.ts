import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class PatientService {

   private baseUrl = environment.apiBaseUrl
  
  apiUrl=`${this.baseUrl}/appointment/add`
  getApiUrl=`${this.baseUrl}/appointment`
  editApiUrl=`${this.baseUrl}/appointment`
 

  constructor(private http:HttpClient){

  }

  bookAppointment(data:any){
    console.log('Data is : ',data);
    
    return this.http.post(this.apiUrl,data)

  }

  getAllAppointments(){
    return this.http.get(this.getApiUrl)
  }

  getMyAppointment(patientId:string){
    return  this.http.get(`${this.getApiUrl}/patient/${patientId}`)
  }

  // editAppointment(id:number){
  //   return this.http.put(`${editApiUrl}`)
  // }
  deleteAppointment(id:number){
    return this.http.delete(`${this.editApiUrl}/${id}`)
  }
}
