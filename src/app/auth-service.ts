import { HttpClient } from "@angular/common/http";
import { Patient } from "./patient";
import { Injectable } from "@angular/core";
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private baseUrl = environment.apiBaseUrl;

  registerApi = `${this.baseUrl}/patient/add`;
  loginApi = `${this.baseUrl}/patient/login`;
  doctorRegisterApi = `${this.baseUrl}/doctor/add`;

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
