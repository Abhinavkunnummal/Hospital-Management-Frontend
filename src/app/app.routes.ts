import { Routes } from '@angular/router';
import { Login } from './Authentication/login/login';
import { Register } from './Authentication/register/register';
import { PatientDashboard } from './patient-dashboard/patient-dashboard';
import { DoctorDashboard } from './doctor-dashboard/doctor-dashboard';
import { RegisterDoctor } from './Authentication/register-doctor/register-doctor';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'register',
        component:Register
    },
    {
    path: 'register-doctor',
    component:RegisterDoctor
  },
    {
        path:'patient',
        component:PatientDashboard
    },
    {
        path:'doctor',
        component:DoctorDashboard
    }

];
