import { Routes } from '@angular/router';
import { LandingViewComponent } from './views/landing-view/landing-view.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LandingViewComponent },
];
