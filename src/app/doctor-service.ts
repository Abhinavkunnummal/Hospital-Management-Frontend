import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  apiUrl='http://localhost:3000/doctor'
  appointmentUrl='http://localhost:3000/appointment'
  constructor(private http:HttpClient){
    
  }
  getDoctors(){
    return this.http.get(this.apiUrl)
  }
  getDoctorById(id:number){
    return this.http.get(`${this.apiUrl}/${id}`)
  }
 getAppointmentsByDoctor(doctorId: string) {
  return this.http.get(
    `${this.appointmentUrl}/doctor/${doctorId}`
  );
}
  updateAppointmentStatus(id:string,status:string){
    return this.http.put(`http://localhost:3000/appointment/status/${id}`,{status})
  }
}
