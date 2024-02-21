import { Routes } from '@angular/router';
import { LandingViewComponent } from './views/landing-view/landing-view.component';
import { AddCustomerViewComponent } from './views/add-customer-view/add-customer-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandingViewComponent },
    { path: 'customerInfo', component: AddCustomerViewComponent },
];
