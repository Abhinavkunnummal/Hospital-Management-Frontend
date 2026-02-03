import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  
  apiUrl='http://localhost:3000/appointment/add'
  getApiUrl='http://localhost:3000/appointment'
  editApiUrl='http://localhost:3000/appointment'
 

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
