import { Routes } from '@angular/router';
import { LandingViewComponent } from './views/landing-view/landing-view.component';
import { AddCustomerViewComponent } from './views/add-customer-view/add-customer-view.component';
import { ScheduleAppointmentViewComponent } from './views/schedule-appointment-view/schedule-appointment-view.component';
import { ErrorViewComponent } from './views/error-view/error-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandingViewComponent },
    { path: 'customerInfo', component: AddCustomerViewComponent },
    { path: 'appointments', component: ScheduleAppointmentViewComponent },
    { path: 'error', component: ErrorViewComponent },
    { path: '**', pathMatch: 'full',  component: ErrorViewComponent },
];
