import { Component } from '@angular/core';
import { DoctorService } from '../doctor-service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../patient-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard {
  doctors: any[] = [];
  appointmentDetails = {
    userName: '',
    doctorName: '',
    appointmentDate: '',
    reason: '',
  };

  appoints: any[] = [];

  show: boolean = false;
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
  ) {
    this.getAllDoctors();
    this.appointmentDetails.userName = localStorage.getItem('patientName') || '';
    this.getMyAppointMents();
  }
  getAllDoctors() {
    this.doctorService.getDoctors().subscribe((res: any) => {
      console.log('REs : ', res);

      this.doctors = res.doctors;
    });
  }

  BookAppointment(id: number) {
    this.show = true;
    this.doctorService.getDoctorById(id).subscribe({
      next: (res: any) => {
        this.appointmentDetails.doctorName = res.findDoctor.doctorName;
      },
    });
  }

  submitData() {
    this.patientService.bookAppointment(this.appointmentDetails).subscribe({
      next: (res) => {
        this.show = false;
        // this.getAllAppointments()
        this.getMyAppointMents();
      },
    });
  }

  logout() {
    localStorage.setItem('patientName', '');
     localStorage.setItem('patientId','');
    this.router.navigate(['/login']);
  }

  getMyAppointMents() {
    const patientId = localStorage.getItem('patientId');
    if (!patientId) {
      console.error('Patient not logged in');
      return;
    }
    this.patientService.getMyAppointment(patientId).subscribe({
      next: (res: any) => {
        this.appoints = res.appoints;
      },
    });
  }

  // - All Appoints
  // getAllAppointments(){
  //   this.patientService.getAllAppointments().subscribe((res:any)=>{
  //     this.appoints=res.appoints
  //     console.log('App :',this.appoints);
  //   })
  // }

  // editAppointment(id:number){
  //   this.patientService.editAppointment(id,)
  // }

  deleteAppointment(id: number) {
    this.patientService.deleteAppointment(id).subscribe({
      next: (res) => {
        // this.getAllAppointments();
        this.getMyAppointMents()
      },
    });
  }
}
