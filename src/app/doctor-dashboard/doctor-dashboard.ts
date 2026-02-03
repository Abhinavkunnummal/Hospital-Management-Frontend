import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {
   doctorName: string = '';
  doctorId: string = '';
   appointments: any[] = [];

   todayAppointments = 0;
  pendingAppointments = 0;

    constructor(private router:Router,private doctorService:DoctorService){
      this.doctorName=localStorage.getItem('doctorName')||''
      this.doctorId=localStorage.getItem('doctorId')||''
      this.getMyAppointments()
      
    if (!this.doctorId) {
      this.router.navigate(['/login']);
      return;
    }
    }

    getMyAppointments(){
      this.doctorService.getAppointmentsByDoctor(this.doctorId).subscribe({
      next: (res: any) => {
        this.appointments = res.appoints;
        this.calculateStats();
      },
      error: (err) => {
        console.error(err);
      }
    });
    }

    calculateStats(){
      const today=new Date().toDateString();
      this.todayAppointments=this.appointments.filter(
        a=>new Date(a.appointmentDate).toDateString()===today
      ).length;

      this.pendingAppointments = this.appointments.filter(
  a => !a.status || a.status === 'Pending'
).length;

    }

     logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }



 updateStatus(id: string, status: string) {
  this.doctorService.updateAppointmentStatus(id, status).subscribe({
    next: () => {
      this.getMyAppointments(); // refresh list
    }
  });
}



}
