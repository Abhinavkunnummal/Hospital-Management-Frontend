import { HttpClient } from "@angular/common/http";
import { Patient } from "./patient";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  registerApi = 'http://localhost:3000/patient/add';
  loginApi = 'http://localhost:3000/patient/login';
  doctorRegisterApi = 'http://localhost:3000/doctor/add';

  constructor(private http: HttpClient) {}

  getRegisterFormData(data: Patient) {
    return this.http.post<Patient>(this.registerApi, data);
  }

  loginUser(data: { email: string; password: string }) {
    return this.http.post(this.loginApi, data);
  }

  registerDoctor(data:any){
    return this.http.post(this.doctorRegisterApi,data)
  }
}
